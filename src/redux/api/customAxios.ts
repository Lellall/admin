/* eslint-disable no-console */
// src/services/customAxios.ts
// @ts-nocheck
import axios from 'axios';
// import { setSessionExpired } from '../features/auth/auth.slice';
import { BACKEND_URL } from '../../utils/config';

// const BACKEND_URL = BACKEND_URL;
// const FRONTEND_URL = process.env.development;
const CustomAxios = axios.create({
  baseURL: `${BACKEND_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// let exp = '';

const endpointsRequiringToken = ['/orders', '/transactions', '/vendors'];

CustomAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && endpointsRequiringToken.includes(config.url || '')) {
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
      if (err.response.status === 401 || (err.response.status === 403 && !originalConfig._retry)) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();

          const { access_token } = rs.data;
          console.log(access_token);
          localStorage.setItem('access_token', access_token);
          // PARSE IT BACKKKK
          CustomAxios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
          return CustomAxios(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            // store.dispatch(setSessionExpired(true)); // Dispatch action to set session expired
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

async function refreshToken() {
  let refresh = localStorage.getItem('refresh_token');
  if (!refresh) refresh = 'null';
  return CustomAxios.post('auth/refresh-token', {
    refreshToken: localStorage.getItem('refresh_token') || 'null',
    role: 'ADMIN',
  }).catch((err) => {
    window.location.href = '/login';
    console.log(err);
  });
}

export default CustomAxios;
