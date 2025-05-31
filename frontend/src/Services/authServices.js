import axios from 'axios';

const API_URL = 'http://localhost:8890/api/auth';

export const registerUser = async (formData) => {
  return axios.post(`${API_URL}/register`, formData);
};

export const verifyOTP = async (otp) => {
  return axios.post(`${API_URL}/verify`, { otp });
};

// export const loginUser = async (credentials) => {
//   return axios.post(`${API_URL}/login`, credentials);
// };


