// context/CartContext.js
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Save to localStorage on cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      // Increase quantity if product already in cart
      const updatedCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // Add new product with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };
  const decreaseQuantity = (productId) => {
    const product = cartItems.find((item) => item._id === productId);
    if (!product) return;
  
    if (product.quantity === 1) {
      // Remove the item if quantity is 1 and user clicks '-'
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } else {
      // Otherwise just decrease quantity
      const updatedCart = cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
    }
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,decreaseQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};
