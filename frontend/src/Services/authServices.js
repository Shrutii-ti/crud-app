// import axios from 'axios';

// const API_URL = 'http://localhost:8890/api/auth';

// export const registerUser = async (formData) => {
//   return axios.post(`${API_URL}/register`, formData);
// };

// export const verifyOTP = async (otp) => {
//   return axios.post(`${API_URL}/verify`, { otp });
// };

// export const loginUser = async (credentials) => {
//   return axios.post(`${API_URL}/login`, credentials);
// };

// export const resendOtp = async (email) => {
//   const res = await axios.post(`${API_URL}/resend`, { email });
//   return res.data;
// };

// // Send OTP for password reset
// export const forgotPassword = async (email) => {
//   return axios.post(`${API_URL}/forgot-password`, { email });
// };

// export const resetPassword = async ({ email, newPassword, otp }) => {
//   return axios.post(`${API_URL}/reset-password`, { email, newPassword, otp });
// };

import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (data) => api.post('/auth/register', data);
export const verifyOTP = (data) => api.post('/auth/verify', data);
export const resendOtp = (email) => api.post('/auth/resend', { email });
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (data) => api.post('/auth/reset-password', data);


