import axios from 'axios';
const API_URL = 'https://graficaserver-production.up.railway.app';
export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      username,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};