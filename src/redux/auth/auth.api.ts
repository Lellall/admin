/* eslint-disable no-console */
import apiSlice from "../api/apiSlice";
// import { api } from "../../services/baseApi";
import { setAuthState, logout } from "../../features/auth/authSlice";
import { LoginRequest, LoginResponse } from "./typings";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      //   transformResponse: (
      //     response: { access_token: string; refresh_token: string },
      //     meta,
      //     arg
      //   ) => {
      //     localStorage.setItem("access_token", response.access_token);
      //     localStorage.setItem("refresh_token", response.refresh_token);
      //     return response;
      //   },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      //   transformResponse: (
      //     response: { access_token: string; refresh_token: string },
      //     meta,
      //     arg
      //   ) => {
      //     localStorage.setItem("access_token", response.access_token);
      //     localStorage.setItem("refresh_token", response.refresh_token);
      //     return response;
      //   },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: `/auth/password-reset/request`,
        method: "POST",
        params: { email, role: "CONSUMER" },
        headers: { accept: "*/*" },
        body: "",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword, confirmPassword, role }) => ({
        url: `/auth/password-reset`,
        method: "PUT",
        params: { email, token, role },
        headers: { "Content-Type": "application/json" },
        body: { newPassword, confirmPassword },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token/",
        method: "POST",
        body: {
          refresh: JSON.parse(localStorage.getItem("refresh_token") || "null"),
        },
      }),
      transformResponse: (response: { access_token: string }) => {
        localStorage.setItem("access_token", response.access_token);
        return response;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.access_token,
              refreshToken: localStorage.getItem("refresh_token"),
            })
          );
        } catch (err) {
          console.error(err);
          dispatch(logout());
        }
      },
    }),
    logout: builder.mutation({
      // @ts-ignore
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformResponse: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      },
      async onQueryStarted(arg, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
