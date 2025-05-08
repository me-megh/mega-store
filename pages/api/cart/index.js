// pages/api/cart/index.js
import dbConnect from "../../../lib/db";
import Cart from "../../../models/cart";
import jwt from "jsonwebtoken";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

// Initialize CORS middleware to allow requests from port 3001
const cors = initMiddleware(
  Cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
export default async function handler(req, res) {
  await cors(req, res);
  await dbConnect();
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // CORS preflight
  }

  const token = req.cookies.token;
  if (!token) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(401).json({ msg: "Unauthorized" });
  }
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch(error) {
    console.error("JWT decode failed:", error);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.status(401).json({ msg: "Invalid token" });
  }

  if (req.method === "GET") {
    try {
      console.log(userId,"--------user")
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      console.log(cart,"--------cartuser")
      const formattedCart = {
        items: (cart?.items || [])
          .filter((item) => item.productId)
          .map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            img: item.productId.img || "",
            quantity: item.quantity,
            selectedSize: item.selectedSize,
          })),
      };
      return res.status(200).json({ cart: formattedCart });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error fetching cart" });
    }
  }

  if (req.method === "POST") {
    const { productId, quantity, selectedSize } = req.body;
    console.log("Adding product to cart:", { productId, quantity, selectedSize });

    if (!productId || !quantity || !selectedSize) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = await Cart.create({
          userId,
          items: [{ productId, quantity, selectedSize }],
        });
      } else {
        const idx = cart.items.findIndex(
          (i) => i.productId.toString() === productId && i.selectedSize === selectedSize
        );
        if (idx > -1) {
          cart.items[idx].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, selectedSize });
        }
       
          cart.items = cart.items.filter((item) => item.productId);
          await cart.save();
        
      }
      const populated = await cart.populate("items.productId");
      const formattedCart = {
        items: populated.items
          .filter((item) => item.productId)
          .map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            img: item.productId.img,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
          })),
      };
      return res.status(200).json({ msg: "Cart updated", cart: formattedCart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error updating cart" });
    }
  }
  if (req.method === "DELETE") {
    const { productId, selectedSize } = req.body;
    if (!productId || !selectedSize) {
      console.log("Missing fields in DELETE request", req.body);
      return res.status(400).json({ msg: "Missing productId" });
    }
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ msg: "Cart not found" });

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId || item.selectedSize !== selectedSize
      );
      await cart.save();

      const populated = await cart.populate("items.productId");
      const formattedCart = {
        items: populated.items
          .filter((item) => item.productId)
          .map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            img: item.productId.img,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
          })),
      };

      return res.status(200).json({ msg: "Item removed", cart: formattedCart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error deleting cart item" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE", "OPTIONS"]);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
