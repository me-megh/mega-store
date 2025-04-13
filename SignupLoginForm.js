import React, { useState } from 'react';
import axios from 'axios';

const SignupLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin ? '/login' : '/signup';

    try {
      const res = await axios.post(`http://localhost:5000/api/auth${url}`, form);
      setMessage(`Success: ${res.data.user.name}`);
      // Optionally store token: localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p>{message}</p>
      <button onClick={toggleForm}>
        {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default SignupLoginForm;
