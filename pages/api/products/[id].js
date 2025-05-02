import dbConnect from '../../../lib/db';
import Product from '../../../models/product';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, product });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
