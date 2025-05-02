// pages/api/orders/index.js

import dbConnect from "../../../lib/db";
import Order from "../../../models/order";
import jwt from "jsonwebtoken";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'GET', 'OPTIONS'],
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
      // 1. Read token from cookies
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // 2. Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const { userID, products, total, shipping, paymentInfo } = req.body;
       // Validate that all required fields are provided
       if (!shipping || !shipping.name || !shipping.address || !shipping.city || !shipping.state || !shipping.postalCode || !shipping.phone) {
        return res.status(400).json({ message: "Missing required shipping fields" });
      }
      // 4. Create new Order
      const order = new Order({
        user: decoded.id, // 👈 decoded user id from token
        products,
        total,
        shipping,
        paymentInfo
      });

      await order.save();

      return res.status(201).json({ message: "Order created successfully", order });
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
      
  
      const orders = await Order.find({ user: decoded.id }).populate('products.productId');
  
      return res.status(200).json({ user: decoded, orders });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
          }
          console.error(error);
  return res.status(500).json({ message: "Something went wrong", error });
    }
  }
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
