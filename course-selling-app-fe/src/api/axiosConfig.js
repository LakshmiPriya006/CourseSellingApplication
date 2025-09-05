import axios from 'axios';

const apiClient = axios.create({
  // IMPORTANT: Replace with your actual backend URL
  baseURL: 'http://localhost:3000', 
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;