import React, { useState }  from 'react';
import axios from "axios";

const Signup = ({ setShowLogin }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin ? '/login' : '/signup';
    try {
      const res = await axios.post(`http://localhost:3000/api/auth${url}`, form);
      localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage(`Success: ${res.data.user.name}`);
      // Optionally store token: localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error');
    }
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="John Doe" 
            value={form.name} onChange={handleChange}
            required 
          />
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="signup-email" 
            name="email" 
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="you@example.com" 
            value={form.email} onChange={handleChange}
            required 
          />
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="signup-password" 
            name="password"  
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="••••••••" 
            value={form.password} onChange={handleChange}
            required 
          />
        </div>
        
        {/* Signup Button */}
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      {message && (
  <p className="text-center text-green-600">{message} signup successfully</p>
)}
      {/* Link to Login */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account? 
        <button 
          className="text-indigo-600 hover:underline" 
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
