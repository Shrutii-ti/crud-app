import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, forgotPassword } from '../Services/authServices';
import FormWrapper from '../Componets/FormWrapper';
import { useAuth } from '../Context/authContext'; // ✅ import useAuth

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function from context

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
      const res = await loginUser(formData);        // ✅ get response
      login(res.data.token);                         // ✅ save token via context
      setMessage('✅ Login successful!');
      setMessageType('success');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setMessage('');
    setMessageType('');
    setForgotLoading(true);

    try {
      await forgotPassword(formData.email);
      setMessage('✅ OTP sent to your email!');
      setMessageType('success');

      setTimeout(() => {
        navigate('/reset-password', { state: { email: formData.email } });
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Failed to send OTP.');
      setMessageType('error');
    } finally {
      setForgotLoading(false);
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

      <button
        type="button"
        onClick={handleForgotPassword}
        disabled={forgotLoading || !formData.email}
        style={{ marginTop: '1rem', backgroundColor: '#6c757d' }}
      >
        {forgotLoading ? 'Sending OTP...' : 'Forgot Password?'}
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
