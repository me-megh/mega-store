import { useState, useContext, useEffect, useMemo } from 'react';
import { CartContext } from '../../context/cartContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Login from '../component/login';

const Checkout = () => {
  const { cartItems, clearCart, user, login } = useContext(CartContext);
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false); // For submit button loading state
  // Show login popup when the user is not logged in
  useEffect(() => {
    if (user && cartItems.length === 0) {
      // try to refetch the cart just in case
      fetchCart(); // if you pass this down from context
    }
    if (!user) { // Check if the user is not logged in
      setShowLoginPopup(true);
      localStorage.removeItem('cart'); // Optional: Clear cart on login prompt
    } else {
      setShowLoginPopup(false);
    }
  }, [user]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Total amount calculation using useMemo
  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { 
      alert('Please log in to place an order.');
      setShowLoginPopup(true);
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSubmitting(true); // Set loading state while submitting order
    try {
      const res = await axios.post(
        'http://localhost:3000/api/orders',
        {
          userID: user?.id || user?._id,
          products: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),
          total: totalAmount,
          shipping: {  // Shipping info
            name: formData.name,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            phone: formData.phone,
          },
        
          paymentInfo: {
            cardNumber: formData.cardNumber,
            cardExpiry: formData.cardExpiry,
            cardCVV: formData.cardCVV,
          },
        },
        {
          withCredentials: true, 
        }
      );

      localStorage.removeItem('cart');
      if (clearCart) {
        clearCart();
      }
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please login and try again.');
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  // Handle login success from the popup
  const handleLoginSuccess = () => {
    setShowLoginPopup(false); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="text-gray-500 float-right text-xl font-bold"
            >
              &times;
            </button>
            <Login setShowPopup={setShowLoginPopup} handleLoginSuccess={handleLoginSuccess}/>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Phone Number"
              required
            />
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md w-full"
            placeholder="Street Address"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="State"
              required
            />
          </div>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md w-full"
            placeholder="Postal Code"
            required
          />
        </div>

        {/* Payment Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md w-full"
            placeholder="Card Number"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Expiry Date (MM/YY)"
              required
            />
            <input
              type="text"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="CVV"
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between mb-4">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition duration-200"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
