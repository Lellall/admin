// src/services/baseApi.ts
// @ts-nocheck
import { createApi } from "@reduxjs/toolkit/query/react";
import CustomAxios from "./customAxios";

const baseQuery = async ({ url, method, body }) => {
  try {
    const result = await CustomAxios({ url, method, data: body });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    if (axiosError.response) {
      err = {
        status: axiosError.response.status,
        data: axiosError.response.data,
      };
    }
    return {
      error: err,
    };
  }
};

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export const { useGetQuery, usePostMutation } = api;
