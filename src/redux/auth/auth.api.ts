// @ts-nocheck
import { setAuthState, logout } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { access_token: string; refresh_token: string }) => {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        //@ts-expect-error
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled: qf }) {
        qf.then((data) => {
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.access_token,
              // user: data.user,
              refreshToken: data.refresh_token,
            })
          );
        }).catch((err: QueryFulfilledError) => {
          toast.error(err.error.data?.message, {
            position: "top-right",
          });
        });
      },
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      // dispatch(
      //   setAuthState({
      //     isAuthenticated: true,
      //     accessToken: data.access_token,
      //     // user: data.user,
      //     refreshToken: data.refresh_token,
      //   })
      //     );
      //   } catch (err) {
      //     console.error('ErrorMSG:', err);
      //     toast.error(`Error Msg `, {
      //       position: 'top-right',
      //     });
      //     return err;
      //   }
      // },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),

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
          return err;
        }
      },
    }),
    requestPasswordReset: builder.mutation<EmailResponse, EmailRequest>({
      query: (params: EmailRequest) => ({
        url: `/auth/password-reset/request`,
        method: "POST",
        params: { email: params.email, role: "ADMIN" },
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then((res) =>
          toast.success(`${res.data.content}`, {
            position: "top-right",
          })
        ).catch((err) => {
          toast.error(`${err?.status?.message}`, {
            position: "top-right",
          });
        });
      },
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
