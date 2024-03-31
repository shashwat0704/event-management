// File: frontend/src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update with your backend URL

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export default {
  register,
  login
};
