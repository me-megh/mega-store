import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cartContext';
const Cart = () => {
  // Calculate total price
  const router = useRouter();
  const { cartItems, removeFromCart } = useContext(CartContext);
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
    : 0;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
             {cartItems.map((item, index) => {
                console.log(item,"-cart data-")
            return(<>
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Remove
              </button>
            </div>
            </>)
})}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Total: ₹{totalPrice}</h2>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-green-600" onClick={() => router.push('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
