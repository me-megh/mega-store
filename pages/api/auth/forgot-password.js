// pages/api/auth/forgot-password.js
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import crypto from 'crypto';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
const nodemailer = require('nodemailer');

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
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Email not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `http://localhost:3001/reset-password?token=${token}`;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,        // 👈 Yaha normal password NHI, balki APP PASSWORD lagega
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log('Transporter error:', error);
    } else {
      console.log('Server is ready to take messages:', success);
    }
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: 'Password Reset',
    text: `You requested a password reset.\n\nClick this link: ${resetLink}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Reset link sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error sending email' });
  }
// const testAccount = await nodemailer.createTestAccount();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: testAccount.user,
//     pass: testAccount.pass,
//   },
// });
// try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info)); // Add this line
//     res.json({ msg: 'Reset link sent (test email)', preview: nodemailer.getTestMessageUrl(info) });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error sending email' });
//   }
  
}
