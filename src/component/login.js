import React from 'react';

const Login = ({ setShowLogin }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      
      <form className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
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
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
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
