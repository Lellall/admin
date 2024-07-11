import axios from "axios";
import { store } from "../store";
import { refresh } from "../features/auth/auth.slice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;
      if (refreshToken) {
        const response = await store.dispatch(refresh(refreshToken));
        if (response.payload) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.payload.token;
          return axiosInstance(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
