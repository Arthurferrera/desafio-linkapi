import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.PIPEDRIVE_URL}/deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_API_KEY}`
});

export default api;
