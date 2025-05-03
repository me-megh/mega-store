// pages/api/auth/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import * as cookie from 'cookie';

// Init CORS
const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'OPTIONS'],
    credentials: true,
  })
);

export default async function handler(req, res) {
  await cors(req, res); // Run cors
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { email, password,rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '30m' });
    console.log(token, "Generated Token");
    
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined,
        sameSite: 'lax',
        path: '/',
      }));
      
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}  
