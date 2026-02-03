import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add a request interceptor to attach the token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});