import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, resendOtp } from '../Services/authServices';
import FormWrapper from '../Componets/FormWrapper';
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

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
      await registerUser(formData);
      setMessage('✅ Registered successfully! Please verify OTP.');
      setMessageType('success');
      setShowVerify(true);
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Registration failed.';
      setMessage(msg);
      setMessageType('error');
      setShowVerify(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!formData.email) return;

    setMessage('');
    setMessageType('');
    setResending(true);

    try {
      await resendOtp(formData.email);
      setMessage('📨 OTP resent successfully!');
      setMessageType('success');
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Failed to resend OTP.';
      setMessage(msg);
      setMessageType('error');
    } finally {
      setResending(false);
    }
  };

  return (
    <FormWrapper title="Register" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
        {loading ? 'Registering...' : 'Register'}
      </button>

      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {showVerify && (
        <>
          <button
            type="button"
            onClick={() => navigate('/verify')}
            className="verify-btn"
          >
            Verify OTP
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="verify-btn"
            disabled={resending}
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </>
      )}
    </FormWrapper>
  );
};

export default Register;
