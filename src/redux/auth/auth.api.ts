/* eslint-disable no-console */
import apiSlice from '../api/api.slice';
// import { api } from "../../services/baseApi";
import { setAuthState, logout } from '../../features/auth/auth.slice';
import { LoginRequest, LoginResponse } from './typings';
import { toast } from 'react-toastify';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
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
        url: '/auth/register',
        method: 'POST',
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
    requestPasswordReset: builder.mutation<EmailResponse, EmailRequest>({
      query: (params: EmailRequest) => ({
        url: `/auth/password-reset/request`,
        method: 'POST',
        params: { email: params.email, role: 'ADMIN' },
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then((res) =>
          toast.success(`${res.data.content}`, {
            position: 'top-right',
          })
        ).catch((err) => {
          console.error(err);
          toast.error(`${err?.status?.message}`, {
            position: 'top-right',
          });
        });
      },
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword, confirmPassword, role }) => ({
        url: `/auth/password-reset`,
        method: 'PUT',
        params: { email, token, role },
        headers: { 'Content-Type': 'application/json' },
        body: { newPassword, confirmPassword },
      }),
    }),
    logout: builder.mutation({
      // @ts-ignore
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      transformResponse: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      },
      async onQueryStarted(arg, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useRequestPasswordResetMutation,
} = authApi;

interface EmailRequest {
  email: string;
}

interface EmailResponse {
  content: string;
}
