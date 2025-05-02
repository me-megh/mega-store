// pages/api/profile.js
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
const cors = initMiddleware(
  Cors({
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);
export default async function handler(req, res) {
  await cors(req, res); // Run cors
  await dbConnect();
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
  
}
