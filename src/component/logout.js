import axios from 'axios';
import { useRouter } from 'next/router';
import React,{useState} from 'react'

const Logout = ({ setUser ,setIsUserLoggedIn,clearCart}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/logout', {}, {
        withCredentials: true
      });
      localStorage.removeItem('isLoggedIn'); // clear login state
      localStorage.removeItem('popupShown');
      localStorage.removeItem('cart');
      // localStorage.removeItem("wishlist");
      setUser(null);
      setIsUserLoggedIn(false);
      clearCart();
      router.push('/'); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
    >
      Logout
    </button>
  );
};

export default Logout;
