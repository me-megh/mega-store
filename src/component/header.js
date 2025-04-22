import React, { useState ,useContext} from "react";
import { FaShoppingCart } from "react-icons/fa"; // Importing FontAwesome shopping cart icon
import Profile from  './profile';
import Link from 'next/link';
import { CartContext } from "../../context/cartContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auhref px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
        <a href="/">Company Logo</a> {/* Use Link for navigation */}
        </div>

        {/* Menu items - visible on larger screens */}
        <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/products?category=men" className="hover:text-gray-300">Men's T-shirts</Link>
          <Link href="/products?category=women" className="hover:text-gray-300">Women's T-shirts</Link>

        {/* Cart and Profile Icons - visible on all screens */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <FaShoppingCart className="w-6 h-6" />
            {/* Badge href show the number of items in the cart */}
            {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
          </Link>

          {/* Profile Icon */}
          <Profile user={user} setUser={setUser} setShowLoginPopup={setShowLoginPopup} />

        </div>

        {/* Hamburger menu - visible on smaller screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800">
          <Link href="/" className="block px-4 py-2 text-white hover:bg-gray-700">
            Home
          </Link>
          <Link href="/products?category=men" className="block px-4 py-2 text-white hover:bg-gray-700">
            Men's T-shirts
          </Link>
          <Link href="/products?category=women" className="block px-4 py-2 text-white hover:bg-gray-700">
            Women's T-shirts
          </Link>
          <Link href="/login" className="block px-4 py-2 text-white hover:bg-gray-700">
            Login
          </Link>
          <Link href="/logout" className="block px-4 py-2 text-white hover:bg-gray-700">
            Logout
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
