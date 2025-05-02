// models/Cart.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        selectedSize: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
