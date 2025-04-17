// pages/api/auth/logout.js
import * as cookie from 'cookie';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001', // 👈 allow your frontend
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  }));
  res.status(200).json({ msg: 'Logged out' });
}
