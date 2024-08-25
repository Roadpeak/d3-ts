import axios from 'axios';
import { getCookie } from '../utils/cookiUtils';

const axiosInstance = axios.create({
  baseURL: 'https://api.discoun3ree.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/accounts/sign-in';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
