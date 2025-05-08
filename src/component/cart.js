import React, { useContext,useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cartContext';
import axios from 'axios';
const Cart = () => {
  // Calculate total price
  const router = useRouter();
  const {cartItems,removeFromCart, updateCart, isUserLoggedIn ,setError,error ,user, setCartItems} = useContext(CartContext);
  //  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    if (isUserLoggedIn) {
    try {
      const res = await axios.get('http://localhost:3000/api/cart', {withCredentials: true });
      updateCart(res.data.cart.items || []);
    } catch (err) {
      if (err.response?.status === 401) {
        // User not authenticated, fallback to guest cart
        console.warn("Not logged in. Loading guest cart...");
        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
        updateCart(guestCart);
      } else {
        setError("Failed to load cart. Please try again later.");
        console.error('Error fetching cart:', err);
      }

    } finally {
      setLoading(false);
    }
  }else{
    const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart(guestCart);
    setLoading(false);
  }
  };
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      updateCart(guestCart);
    }
  }, [isUserLoggedIn]);

  const handleRemove = async (productId,selectedSize) => {
    // Remove from backend if logged in
    if (isUserLoggedIn) {
      try {
        await axios.delete(`http://localhost:3000/api/cart`,{  data: { productId, selectedSize },withCredentials: true });
        fetchCart(); // Refresh cart after removal
      } catch (err) {
        if (err.response?.status === 401) {
          alert('You must be logged in to perform this action');
          // Optionally redirect to login page
        } else {
          console.error('Error removing item:', err);
        }
      }
    } else {
      alert('Please log in to access your cart.');
      // Redirect to login page or show login popup
    }
  };

  
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
    : 0;

    if (loading) {
      return <div className="text-center py-8 text-black-500">
        <div className="text-4xl animate-bounce mb-2">😊</div>
        Please log in first to view your cart.</div>
    }
  
    if (!cartItems.length) {
      return <div className="text-center py-8 text-gray-500">Your cart is empty.</div>;
    }
  console.log(cartItems,"-------cartitem")
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
             {cartItems.map((item, index) => {
              const id = item.productId || item._id;
              console.log(id,"---------idd1")
            return(<>
            <div key={id+ item.selectedSize} className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              
              <button onClick={() => handleRemove(id, item.selectedSize)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Remove
              </button>
            </div>
            </>)
})}
        </div>

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
