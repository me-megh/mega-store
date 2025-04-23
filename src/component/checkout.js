import { useState ,useContext} from 'react';
import { CartContext } from '../../context/cartContext';
const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  // State to manage form data
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Submitted:', formData);
    // You can add further logic for processing the payment and order here.
  };
  const totalAmount = cartItems?.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* Address Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
        </form>
      </div>

      {/* Payment Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <form className="space-y-6">
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
        </form>
      </div>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>
              ₹
              {Array.isArray(cartItems) && cartItems.length > 0
                ? cartItems.reduce(
                    (total, item) => total + item.price * (item.quantity || 1),
                    0
                  )
                : 0}
            </span>
          </div>


        </div>
      </div>

      {/* Proceed to Payment Button */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition duration-200"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
