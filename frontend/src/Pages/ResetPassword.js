import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/authServices';
import FormWrapper from '../Componets/FormWrapper';  // Adjust path if needed
import "./ResetPassword.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    newPassword: '',
    otp: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

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
      await resetPassword(formData);
      setMessage('✅ Password reset successful! You can now login.');
      setMessageType('success');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Password reset failed.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Reset Password" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        readOnly={!!location.state?.email} // prevent editing if from forgot password flow
      />
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={formData.otp}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </FormWrapper>
  );
};

export default ResetPassword;
