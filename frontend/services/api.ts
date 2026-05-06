import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      // ÜNS BER: "Bearer " sözünden soň hökman bir sany boşluk bolmaly!
      config.headers.Authorization = `Bearer ${token}`; 
    }
  }
  return config;
});

export default api;
