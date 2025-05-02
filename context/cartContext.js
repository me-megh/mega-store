import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // ✅ new
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // ✅ new
  const [error, setError] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setIsUserLoggedIn(true);
    fetchCart();
  }else {
    // Load guest cart from localStorage
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);
  }
  }, []);
  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/cart', {
        withCredentials: true,
      });
      setCartItems(res.data.cart.items ||[]);
      setError(null); 
    } catch (err) {
      setError('Failed to fetch cart. Please try again later.',err);
      console.error(err);
    }
  };

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  
  const addToCart = async(product, user) => {
    if (user && user.token) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/cart',
        {
          productId: product._id,
          quantity: 1,
          selectedSize: product.selectedSize || 'S',
        },
        { withCredentials: true }
      );
      setCartItems(res.data.cart.items);
    } catch (err) {
      setError('Failed to send cart. Please try again later.');
      console.error(err); 
    }
  }else {
    // Guest mode - store in localStorage
    const existingProduct = cartItems.find(item => item._id === product._id && item.selectedSize === product.selectedSize);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cartItems.map(item =>
        item._id === product._id && item.selectedSize === product.selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
};

  const removeFromCart =async (productId) => {
    // setCartItems(cartItems.filter((item) => item._id !== id));
    if (isUserLoggedIn) {
    try {
      const res = await axios.delete(`http://localhost:3000/api/cart`, {
        data: { productId },
        withCredentials: true,
      });
      setCartItems(res.data.cart.items);
    } catch (err) {
      setError('Failed to delete cart. Please try again later.');
      console.error(err); 
    }}
    else {
      const updatedCart = cartItems.filter(item => item._id !== productId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const decreaseQuantity = (productId) => {
    const product = cartItems.find((item) => item._id === productId);
    if (!product) return;

    if (product.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } else {
      const updatedCart = cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
    }
  };
  const updateCart = (items) => {
    setCartItems(items);
  };

  const clearCart = () => {
    setCartItems([]); // Cart empty kar dega
    localStorage.removeItem('cart');
  };
  const login = async (userData) => {
    setUser(userData);
    setIsUserLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    // Sync local cart to context cart
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  // Send each item to backend one by one
  if (localCart.length > 0) {
    try {
      for (let item of localCart) {
      await axios.post(
        "http://localhost:3000/api/cart",
        {
          productId: item._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize || 'S',
        },
        { withCredentials: true }
      );
      }  // Local cart ko sync karne ke baad remove karo localStorage se
   localStorage.removeItem("cart");
  }catch (err) {
      console.error("Failed to sync item to backend:");
      console.error(err); 
    }
    }
    // Ab updated cart ko backend se fetch karo
   fetchCart();
  };

  const logout = () => {
    setUser(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem('user');
    clearCart();
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        user,
        setUser,
        showPopup,
        setShowPopup,           // ✅ added
        isUserLoggedIn,
        clearCart,
        setIsUserLoggedIn,       // ✅ added
        login,
        logout,
        updateCart,
        error,
        setError
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
