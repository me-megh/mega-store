// pages/api/products/index.js
import dbConnect from '../../../lib/db';
import Product from '../../../models/product';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

// Allow only GET requests from localhost:3001
const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001',
    methods: ['GET'],
  })
);
export default async function handler(req, res) {
    await cors(req, res); // Run CORS
    await dbConnect();
    const { category } = req.query;
  
    try {
      const filter = category ? { category } : {};
      const products = await Product.find(filter);
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  