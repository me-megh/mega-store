import Home from '../src/component/home';
import Header from '../src/component/header';
import Footer from '../src/component/footer';
import React,{useState} from 'react';
import Login from '../src/component/login';
import Signup from '../src/component/signup';
const Index = () => {
    const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup
      const [showPopup, setShowPopup] = useState(true); // Manage visibility of the popup
      const closePopup = () => setShowPopup(false); // Function to close the popup
      const [cartItems, setCartItems] = useState([]); // Manage cart items
  return (
  <div className="App">
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
                <Login setShowLogin={setShowLogin} setShowPopup={setShowPopup} />
                ) : (
                    <Signup setShowLogin={setShowLogin} />  
                )}

          </div>
        </div>
      )}
  <Header />
  <Home />
  <Footer />
</div>
);
};

export default Index;
