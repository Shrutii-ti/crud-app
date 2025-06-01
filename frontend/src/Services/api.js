import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8890/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or use AuthContext if preferred
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
