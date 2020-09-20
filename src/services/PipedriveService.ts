import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PIPEDRIVE_URL
});

export default api;