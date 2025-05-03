import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { CartContext } from "../../context/cartContext";
import Link from 'next/link';
const Login = ({ handleLoginSuccess, setShowLoginPopup, onLoginSuccess }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { login, isUserLoggedIn, setShowPopup } = useContext(CartContext);
  const [rememberMe, setRememberMe] = useState(false);
  // Get context values
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value .trimStart()});
    console.log("Form values:", form); 
  };
  useEffect(() => {
    const savedPref = localStorage.getItem("rememberMe");
    if (savedPref) setRememberMe(savedPref === "true");
  }, []);
  
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/signup";
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth${url}`,
        { ...form, rememberMe },
        {
          withCredentials: true,
        }
      );
      login(res.data.user);
      setMessage(`Success: Logged in as ${res.data.user.name}`);
      setShowPopup(false);
      handleLoginSuccess?.();
      router.push("/");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error");
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      localStorage.removeItem("cart");
    }
  }, [isUserLoggedIn]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-black">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black placeholder-gray-500 bg-white visible"
            placeholder="you@example.com"
            required
            style={{ color: 'black', visibility: 'visible' }} 
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black placeholder-gray-500 bg-white visible"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          {/* <a  href="/forgot-password" onClick={() => setShowLoginPopup(false)} className="text-sm text-indigo-600 hover:underline">
            Forgot your password?
          </a> */}
          <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
          Forgot your password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      {message && (
        <p
          className={`text-center ${
            message.startsWith("Success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
