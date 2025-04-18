import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // URL do backend
});

// Interceptar requests para adicionar token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;