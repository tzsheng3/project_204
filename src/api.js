import axios from 'axios';
import discordOAuth from './discordOAuth';

const API_URL = 'http://localhost:8080/api';

// Create an axios instance with the base URL and common headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to handle user registration
export const register = async (email, password, name) => {
  try {
    // Make a POST request to the /register endpoint with user details
    const response = await api.post('/register', { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Function to handle user login
export const login = async (email, password) => {
  try {
    // Make a POST request to the /login endpoint with email and password
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Function to handle Discord OAuth login
export const discordLogin = async (code) => {
  try {
    // Make a POST request to the /login/oauth2/code/discord endpoint with the OAuth code
    const response = await api.post('/login/oauth2/code/discord', { code });
    return response.data;
  } catch (error) {
    console.error('Discord login error:', error);
    throw error;
  }
};

