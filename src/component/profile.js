import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios'; 
import Logout from './logout';
import Login from './login';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cartContext';

const Profile = () => {
  const { user, setUser ,clearCart} = useContext(CartContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
  const [showMenu, setShowMenu] = useState(false); 
  const [isFetching, setIsFetching] = useState(false);  
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // For login success
const handleLoginSuccess = () => {
  setIsUserLoggedIn(true);  // Update state when user logs in
  setShowLoginPopup(false); // Hide the login popup
};

// For logout success
const handleLogout = () => {
  setIsUserLoggedIn(false);  // Update state when user logs out
};
  // Fetch user profile only when necessary
  useEffect(() => {
    
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/auth/profile', {
            withCredentials: true,
          });
          setUser(res.data.user);
        } catch (err) {
          setUser(null); // Reset user if not logged in
          console.log("Not logged in");
        } finally {
          setIsFetching(false);
        }
      };
      if (!user) {
        fetchUser();
      }
      
    
  }, []);

  const handleMyOrders = () => {
    router.push('/myorders');
    setShowMenu(false);
  };

  return (
    <>
      {/* Profile Icon */}
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
          <img src='/img/profile_icon.png' alt="Profile" className="rounded-full w-10 h-10" />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 bg-white text-gray-700 py-2 mt-2 rounded-lg shadow-lg w-48 z-50">
            {user ? (
              <>
                <div className="text-center my-2 text-md font-semibold text-green-700">
                  Welcome, {user.name}!
                </div>
                <button onClick={handleMyOrders} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  My Orders
                </button>
                <Logout setUser={setUser} setIsUserLoggedIn={setIsUserLoggedIn} clearCart={clearCart} />
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setShowLoginPopup(true); setShowMenu(false); }} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <button onClick={() => setShowLoginPopup(false)} className="text-gray-500 float-right text-xl font-bold">
              &times;
            </button>
            <Login setShowPopup={setShowLoginPopup} setUser={setUser}  handleLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
