import './App.css';
import Header from './component/header';
import './index.css';
import Footer from './component/footer';
import Home from './component/home';
import Login from './component/login'; // Import Login Component
import Signup from './component/signup'; // Import Signup Component
import ProductDetails from './component/productDetails'; // Import ProductDetails
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './component/cart';
import Checkout from './component/checkout';

const App = () => {
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup
  const [showPopup, setShowPopup] = useState(false); // Manage visibility of the popup

  const closePopup = () => setShowPopup(false); // Function to close the popup
  const [cartItems, setCartItems] = useState([]); // Manage cart items

  // Function to add item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id); // Assuming product has an 'id' property
      if (exists) {
        return prevItems; // Return existing items if it already exists
      }
      return [...prevItems, product]; // Add new item
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  };

  useEffect(() => {
    const alreadyShown = localStorage.getItem('popupShown');
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if the user is logged in
  
    if (!alreadyShown && !isLoggedIn) {
      setShowPopup(true);
      localStorage.setItem('popupShown', 'true');
    }

  
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  return (
    <div className="App">
      {/* Wrap all content in Router */}
      <Router>
        {/* Header should be visible on all pages */}
        <Header />

        {/* Main content dynamically rendered based on route */}
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<Home />} />

          {/* Route for Product Details Page */}
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />

          {/* Route for Login Page */}
          <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />

          {/* Route for Signup Page */}
          <Route path="/signup" element={<Signup setShowLogin={setShowLogin} />} />

          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        </Routes>

        {/* Footer should be visible on all pages */}
        <Footer />
      </Router>

      {/* Show popup only if 'showPopup' is true */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"> {/* Full-screen blur effect */}
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md relative"> {/* Popup content */}
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              &times; {/* Close icon, could be replaced with an SVG */}
            </button>

            {/* Login or Signup Form */}
            {showLogin ? (
              <Login setShowLogin={setShowLogin} />
            ) : (
              <Signup setShowLogin={setShowLogin} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
