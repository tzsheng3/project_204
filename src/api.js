import axios from 'axios';
import discordOAuth from './discordOAuth';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const register = async (email, password, name) => {
  try {
    const response = await api.post('/register', { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const discordLogin = async (code) => {
  try {
    const response = await api.post('/login/oauth2/code/discord', { code });
    return response.data;
  } catch (error) {
    console.error('Discord login error:', error);
    throw error;
  }
};

// Other API functions remain unchanged
