import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Total: ₹{totalPrice}</h2>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-green-600" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
