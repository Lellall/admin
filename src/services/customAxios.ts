// src/services/customAxios.ts
// @ts-nocheck
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';

// const BACKEND_URL = BACKEND_URL;
// const FRONTEND_URL = process.env.development;

const CustomAxios = axios.create({
  baseURL: `${BACKEND_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

CustomAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('access_token') || 'null');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { access } = rs.data;
          localStorage.setItem('access_token', JSON.stringify(access));
          CustomAxios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('access_token') || 'null');
          return CustomAxios(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function refreshToken() {
  let refresh = JSON.parse(localStorage.getItem('refresh_token') || 'null');
  if (!refresh) refresh = 'null';
  return CustomAxios.post('token/refresh/', {
    refresh: JSON.parse(localStorage.getItem('refresh_token') || 'null'),
  }).catch((err) => {
    window.location.href = `/login`;
    console.log(err);
  });
}

export default CustomAxios;
