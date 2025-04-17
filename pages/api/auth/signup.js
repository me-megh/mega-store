// pages/api/auth/signup.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import * as cookie from 'cookie';
const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
  })
);
export default async function handler(req, res) {
  await cors(req, res); // Run cors
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3600,
    path: '/',
  }));
  res.status(201).json({
    token,
    user: { id: newUser._id, name: newUser.name, email: newUser.email }
  });
}
