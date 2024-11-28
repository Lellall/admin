/* eslint-disable no-console */
import { toast } from "react-toastify"
// import apiSlice from '../api/api.slice';

import {
  CompleteOrderRequest,
  ConsumerHistoryRequest,
  ConsumerHistoryResponse,
  InvoiceRequest,
  InvoicesResponse,
  IncompleteOrderRequest,
  OrderResponse,
  OrderRequest,
  Order,
  InvoicesStatsResponse,
} from "./typings"
import { baseApi } from "../api/baseApi"
import { Errorhandler } from "@/utils/errorHandler"

const orders = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    incompleteOrders: builder.query<OrderResponse, IncompleteOrderRequest>({
      query: () => ({
        url: `/transactions/incomplete-order`,
      }),
      providesTags: ["ORDERS"],
    }),
    completeOrder: builder.mutation<any, CompleteOrderRequest>({
      query: (params) => ({
        url: `/orders/complete/${params.id}`,
        method: "PUT",
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Order Completed Succesfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          console.log("ERR", err.error.data)
          Errorhandler(err)
        })
      },
      invalidatesTags: ["ORDERS"],
    }),
    getConsumerHistory: builder.query<ConsumerHistoryResponse, ConsumerHistoryRequest>({
      query: (params: ConsumerHistoryRequest) => ({
        url: `/orders/consumer/history`,
        params: {
          page: params.page,
          size: params.size,
          status: params.status,
        },
      }),
      providesTags: ["ORDERS"],
    }),
    getInvoices: builder.query<InvoicesResponse, InvoiceRequest>({
      query: (params) => ({
        url: `/orders/${params.restaurantId}/invoices`,
        params,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
    getInvoicesStats: builder.query<InvoicesStatsResponse, { restaurantId: string }>({
      query: ({ restaurantId }) => ({
        url: `/invoices/${restaurantId}/order-statistic`,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
    getOrders: builder.query<OrderResponse, OrderRequest>({
      query: (params) => ({
        url: `/orders`,
        params,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
    getOrder: builder.query<Order, { id: string }>({
      query: (id) => ({
        url: `/orders/consumer/${id.id}`,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
  }),
})

export const {
  useIncompleteOrdersQuery,
  useGetOrdersQuery,
  useCompleteOrderMutation,
  useGetInvoicesQuery,
  useGetConsumerHistoryQuery,
  useGetOrderQuery,
  useGetInvoicesStatsQuery,
} = orders
