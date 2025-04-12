import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { hashPassword } from '../../lib/hash';
import { signToken } from '../../lib/jwt';
import validator from 'validator';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and contain upper, lower, number, and symbol',
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = signToken({ id: user._id });

  res.status(201).json({
    message: 'User created successfully',
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}
