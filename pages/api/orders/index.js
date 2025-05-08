// pages/api/orders/index.js

import dbConnect from "../../../lib/db";
import Order from "../../../models/order";
import jwt from "jsonwebtoken";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET; // 👈 apna secret env file me rakho

export default async function handler(req, res) {
  await cors(req, res); // allow CORS
  await dbConnect();
  if (req.method === "POST") {
    try {
      console.log(req.body, "----requBody");
      // 1. Read token from cookies
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // 2. Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded?.id) throw new Error("Decoded token missing user ID");

      const { products, total, shipping, paymentInfo } = req.body;
      console.log("Received order data:", req.body);
      // Validate that all required fields are provided
      if (!Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ message: "Products list is empty or invalid" });
      }

      if (!paymentInfo || !paymentInfo.method) {
        return res.status(400).json({ message: "Payment method is required" });
      }

      const method = paymentInfo.method;

      if (method === "card") {
        if (
          !paymentInfo.cardNumber ||
          !paymentInfo.cardExpiry ||
          !paymentInfo.cardCVV
        ) {
          return res
            .status(400)
            .json({ message: "Card details are incomplete" });
        }
      }

      if (method === "upi") {
        if (!paymentInfo.upiId) {
          return res.status(400).json({ message: "UPI ID is required" });
        }
      }

      if (method === "razorpay") {
        if (
          !paymentInfo.razorpay_order_id ||
          !paymentInfo.razorpay_payment_id ||
          !paymentInfo.razorpay_signature
        ) {
          return res
            .status(400)
            .json({ message: "Razorpay payment details are incomplete" });
        }
      } else if (method === "cod") {
        // No additional fields required
        paymentInfo.status = "pending"; // mark as pending for COD
      } else {
        return res.status(400).json({ message: "Unsupported payment method" });
      }

      const order = new Order({
        user: decoded.id, // 👈 decoded user id from token
        products,
        total,
        shipping,
        paymentInfo,
        status: method === "cod" ? "pending" : "paid",
      });

      await order.save();

      return res
        .status(201)
        .json({ message: "Order created successfully", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
  } else if (req.method === "GET") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      const orders = await Order.find({ user: decoded.id }).populate(
        "products.productId"
      );

      return res.status(200).json({ user: decoded, orders });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      console.error(error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
