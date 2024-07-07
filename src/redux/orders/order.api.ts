import apiSlice from "../api/apiSlice";

import { OrderRequest, OrderResponse } from "./typings";

const orders = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    incompleteOrders: builder.query<OrderResponse, OrderRequest>({
      query: (params: OrderRequest) => ({
        url: `/transactions/incomplete-order?pageNo=${params.page}&pageSize=${params.size}`,
      }),
    }),
  }),
});

export const { useIncompleteOrdersQuery } = orders;
