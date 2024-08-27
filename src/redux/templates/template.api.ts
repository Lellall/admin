/* eslint-disable no-console */
import { toast } from "react-toastify";

import { Template } from "./typings";
import { baseApi } from "../api/baseApi";

const template = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation<any, Template>({
      query: (data) => ({
        url: `/template`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then((res) => {
          toast.success(`${res?.data?.message}`, {
            position: "top-right",
          });
        }).catch((err) => {
          console.log("ERR", err.error.data);
          toast.error(`${err.error?.data?.message}`, {
            position: "top-right",
          });
        });
      },
      // invalidatesTags: ['ORDERS'],
    }),
  }),
});

export const { useCreateTemplateMutation } = template;
