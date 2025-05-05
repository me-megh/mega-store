import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  shipping: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
      method: { type: String, required: true, enum: ['card', 'upi','razorpay'] },
      upiId: {
        type: String,
        required: function() { return this.paymentInfo.method === 'upi'; }
      },
      cardNumber: {
        type: String,
        required: function() { return this.paymentInfo.method === 'card'; }
      },
      cardExpiry: {
        type: String,
        required: function() { return this.paymentInfo.method === 'card'; }
      },
      cardCVV: {
        type: String,
        required: function() { return this.paymentInfo.method === 'card'; }
      }
    ,
    razorpay_order_id: {
      type: String,
      required: function () {
        return this.paymentInfo.method === 'razorpay';
      },
    },
    razorpay_payment_id: {
      type: String,
      required: function () {
        return this.paymentInfo.method === 'razorpay';
      },
    },
  },
  status: {
    type: String,
    enum: ["Processing", "Completed", "Cancelled"],
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
