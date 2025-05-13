import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.3:5000/api',
});

// 🔒 Interceptor para adicionar token em toda requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
