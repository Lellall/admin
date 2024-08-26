/* eslint-disable no-console */
//@ts-ignore
//@ts-nocheck
import { BACKEND_URL } from "@/utils/config";
import axios from "axios";

const CustomAxios = axios.create({
  baseURL: `${BACKEND_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// let exp = '';

const endpointsRequiringToken = [
  "/orders",
  "/transactions",
  "/shops",
  /^\/products\/[a-fA-F0-9-]+$/,
];
CustomAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && endpointsRequiringToken.some((pattern) => config.url?.match(pattern))) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      config.headers["Authorization"] = "Bearer " + "";
      // delete config.headers['Authorization'];
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
      if (
        err.response.status === 401 ||
        (err.response.status === 403 && !originalConfig._retry)
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();

          const { access_token } = rs.data;
          localStorage.setItem("access_token", access_token);
          // PARSE IT BACKKKK
          CustomAxios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
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
  let refresh = localStorage.getItem("refresh_token");
  if (!refresh) refresh = "null";
  return CustomAxios.post("auth/refresh-token", {
    refreshToken: localStorage.getItem("refresh_token") || "null",
    role: "ADMIN",
  }).catch(() => {
    window.location.href = "/login";
  });
}

export default CustomAxios;
