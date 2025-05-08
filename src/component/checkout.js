import { useState, useContext, useEffect, useMemo } from 'react';
import { CartContext } from '../../context/cartContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Login from '../component/login';

const Checkout = () => {
  const { cartItems, clearCart, user, login ,fetchCart} = useContext(CartContext);
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi' or 'razorpay'
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
    upiId: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false); // For submit button loading state
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment success
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (paymentMethod === 'card') {
      setFormData((prev) => ({ ...prev, upiId: '' }));
    } else if (paymentMethod === 'upi') {
      setFormData((prev) => ({ ...prev, cardNumber: '', cardExpiry: '', cardCVV: '' }));
    }
  }, [paymentMethod]);

  // Show login popup when the user is not logged in
  useEffect(() => {
    if (user && cartItems.length === 0) {
      fetchCart(); 
    }
    if (!user) {
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
    const subtotal =  cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const shippingCharges = 99; 
    return subtotal + shippingCharges;
  }, [cartItems]);

  // Place the order and save payment details
  const placeOrder = async (razorpayResponse = null) => {
    try {
      const shippingCharges = 99; // Shipping charge
    const totalAmountWithShipping = totalAmount + shippingCharges;; 
      const paymentInfo = {
        method: paymentMethod,
      };
  
      // Include card details if payment method is 'card'
      if (paymentMethod === 'card') {
        paymentInfo.cardNumber = formData.cardNumber;
        paymentInfo.cardExpiry = formData.cardExpiry;
        paymentInfo.cardCVV = formData.cardCVV;
      }
  
      // Include UPI ID if payment method is 'upi'
      if (paymentMethod === 'upi') {
        paymentInfo.upiId = formData.upiId;
      }
  
      // Include Razorpay ID if Razorpay method was used
      if (razorpayResponse?.razorpay_payment_id) {
        paymentInfo.razorpayPaymentId = razorpayResponse.razorpay_payment_id;
      }
      const res = await axios.post('http://localhost:3000/api/orders', {
        userID: user?.id || user?._id,
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
        total: totalAmountWithShipping,
        shipping: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentInfo
      }, { withCredentials: true });
      console.log("Order placed successfully:", res.data);
      setPaymentDetails(res.data.paymentDetails);
      localStorage.removeItem('cart');
      clearCart?.();
      setPaymentSuccess(true);
      router.push('/order-confirmation');
    } catch (err) {
      console.error('Order error:', err);
      alert('Something went wrong.');
    }
  };

  // Handle form submit
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
      if (paymentMethod === 'razorpay') {
        const razorpayOptions = {
          key: 'YOUR_RAZORPAY_KEY_ID',
          amount: totalAmountWithShipping * 100, // Amount in smallest unit
          currency: 'INR',
          name: 'Our One Store',
          description: 'Order Payment',
          handler: function (response) {
            placeOrder(response);
          },
          prefill: {
            name: formData.name,
            email: user?.email,
            contact: formData.phone,
          },
          theme: { color: '#000' },
        };
        const rzp = new window.Razorpay(razorpayOptions);
        rzp.open();
        return;
      }

      placeOrder(); // Call for other payment methods (card/upi)
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

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              /> Card
            </label>
            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              /> UPI
            </label>
            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={() => setPaymentMethod('razorpay')}
              />
              Pay with Razorpay (Google Pay, PhonePe, etc.)
            </label>
            <label>
              <input
              type="radio"
              value="cod"
              hecked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery (COD)  
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
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
        )}

        {paymentMethod === 'upi' && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">UPI ID</h2>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="UPI ID"
              required
            />
          </div>
        )}

        <div className="flex justify-between">
        <div>
           <p className="text-lg font-semibold">Subtotal: ₹{cartItems.reduce(
            (total, item) => total + item.price * (item.quantity || 1), 0
           )}</p>
          <p className="text-lg font-semibold">Shipping: ₹99</p>
        </div>
        <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
