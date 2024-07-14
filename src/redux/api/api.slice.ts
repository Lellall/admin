/* eslint-disable no-console */
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setCredentials } from '../auth/auth.slice';
import { BACKEND_URL } from '../../utils/config';

const refreshExpiredToken = async (refreshToken: string) => {
  try {
    const refreshResult: any = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken, role: 'ADMIN' }),
      method: 'POST',
    });
    return refreshResult.json();
  } catch (error) {
    return undefined;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.access_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;
    console.log('------------------------------');
    const refreshResult = await refreshExpiredToken(refreshToken);
    if (refreshResult) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setCredentials({
          access_token: refreshResult.access_token as string,
          user,
          refresh_token: refreshToken,
          token_type: 'Bearer',
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

const tagTypes = ['AUTH', 'ORDERS', 'TRANSACTION', 'PRODUCTS'] as const;

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypes,
  endpoints: () => ({}),
  keepUnusedDataFor: 5000,
});

export default apiSlice;
