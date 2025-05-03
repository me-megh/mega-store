// pages/api/auth/reset-password.js
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

// Init CORS
const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'OPTIONS'],
    credentials: true,
  })
);
export default async function handler(req, res) {
    await cors(req, res); 
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ msg: 'Password has been reset' });
}
