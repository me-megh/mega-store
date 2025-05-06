import dbConnect from '../../../lib/db';
import Product from '../../../models/product';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

// Enable CORS for POST requests
const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['POST'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { productIds } = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ success: false, message: 'No product IDs provided' });
  }

  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching wishlist products:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch wishlist products' });
  }
}
