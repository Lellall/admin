import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setCredentials } from "../auth/auth2Slice";
import { BACKEND_URL } from "../../utils/config";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState)?.auth?.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;

    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refreshtoken",
        method: "POST",
        body: { refreshToken, role: "ADMIN" },
      },
      api,
      extraOptions
    );
    // eslint-disable-next-line no-console
    console.log("result token", refreshResult);
    if (refreshResult) {
      const user = (api.getState() as RootState).auth.user;
      // const token = (api.getState() as RootState).auth.token;
      // store the access token
      api.dispatch(
        setCredentials({
          access_token: refreshResult.access_token as string,
          user,
          refresh_token: refreshToken,
          token_type: "Bearer",
          isAuthenticated: true,
        })
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ["AUTH"],
  endpoints: () => ({}),
});

export default apiSlice;
