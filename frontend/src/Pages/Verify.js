import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../Componets/FormWrapper';  // Adjust path as needed
import "./Verify.css";

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8890/api/auth/verify', {
        email,
        otp,
      });

      setMessage('✅ OTP verified successfully!');
      setMessageType('success');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Verification failed.';
      setMessage(msg);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Verify OTP" onSubmit={handleVerify}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </FormWrapper>
  );
};

export default Verify;
