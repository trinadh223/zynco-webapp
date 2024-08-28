import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);

export default api;