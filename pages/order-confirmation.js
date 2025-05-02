import Link from 'next/link';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Order Confirmed!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been placed successfully!
        </p>
        <Link href="/">
          <span className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Continue Shopping
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
