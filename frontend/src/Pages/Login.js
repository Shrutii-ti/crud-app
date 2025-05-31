import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../Componets/FormWrapper';  // adjust path if needed

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8890/api/auth/login', formData);
      setMessage('✅ Login successful!');
      setMessageType('success');

      // Save token or user info here if needed
      // localStorage.setItem('token', res.data.token);

      // Redirect to dashboard or home page after login
      setTimeout(() => {
        navigate('/dashboard'); // change route as needed
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Login failed.';
      setMessage(msg);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Login" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </FormWrapper>
  );
};

export default Login;
