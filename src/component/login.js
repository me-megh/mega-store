import React,{useState} from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

const Login = ({ setShowLogin,setShowPopup,setUser }) => {
  const router = useRouter(); // ✅ Important!
  const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: ""
    });
    const [message, setMessage] = useState("");
    const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin ? '/login' : '/signup';
    try {
      const res = await axios.post(`http://localhost:3000/api/auth${url}`, form, {
        withCredentials: true
      });
       
      setMessage(`Success: Logged in as ${res.data.user.name}`);
      setUser(res.data.user); // after successful login
      localStorage.setItem('isLoggedIn', true);
      setShowPopup(false); // hide the popup
      router.push('/');
      // Optionally store token: localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error');
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-black">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={form.email} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="you@example.com" 
            required 
          />
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={form.password} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" 
            placeholder="••••••••" 
            required 
          />
        </div>
        
        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot your password?</a>
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
  <p className={`text-center ${message.startsWith("Success") ? "text-green-600" : "text-red-600"}`}>
    {message}
  </p>
)}
      {/* Link to Signup */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account? 
        <button 
          className="text-indigo-600 hover:underline" 
          onClick={() => setShowLogin(false)}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
