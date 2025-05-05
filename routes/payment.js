// backend/routes/payment.js
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import  Order from '../models/order';
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create payment order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', userId  } = req.body;
  try {
    const options = {
      amount: amount * 100, // in paise
      currency,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    // Order ko save karo (order creation)
    const newOrder = new Order({
        user: userId,
        total: amount,
        paymentInfo: {
          method: 'razorpay',
          razorpay_order_id: order.id,
        },
        status: 'Processing', // Status ko set karenge
      });
      await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Payment verification (optional for security)
router.post('/verify',async(req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature ,order_id} = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const digest = hmac.digest('hex');

  if (digest === razorpay_signature) {
    const updatedOrder = await Order.findByIdAndUpdate(order_id, { status: 'Completed' }, { new: true });

    if (updatedOrder) {
      res.json({ status: 'success', order: updatedOrder });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } else {
    res.status(400).json({ status: 'failed' });
  }
});

export default router;
