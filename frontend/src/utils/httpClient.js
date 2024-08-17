import axios from 'axios';

// Set the base URL from the environment variable
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apiClient;