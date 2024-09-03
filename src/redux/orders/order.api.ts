/* eslint-disable no-console */
import { toast } from "react-toastify"
// import apiSlice from '../api/api.slice';

import {
    CompleteOrderRequest,
    ConsumerHistoryRequest,
    ConsumerHistoryResponse,
    OrderRequest,
    OrderResponse,
} from "./typings"
import { baseApi } from "../api/baseApi"

const orders = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        incompleteOrders: builder.query<OrderResponse, OrderRequest>({
            query: () => ({
                url: `/transactions/incomplete-order`,
                // params: { pageNo: params.page, pageSize: params.size },
            }),
            // providesTags: ['ORDERS'],
        }),
        completeOrder: builder.mutation<any, CompleteOrderRequest>({
            query: (params) => ({
                url: `/orders/complete/${params.id}`,
                method: "PUT",
            }),
            async onQueryStarted(_args, { queryFulfilled: qf }) {
                qf.then((res) => {
                    console.log("RES", res)
                    toast.success(`${res}`, {
                        position: "top-right",
                    })
                }).catch((err) => {
                    console.log("ERR", err.error.data)
                    toast.error(`${err.error.data}`, {
                        position: "top-right",
                    })
                })
            },
            // invalidatesTags: ['ORDERS'],
        }),
        getConsumerHistory: builder.query<
            ConsumerHistoryResponse,
            ConsumerHistoryRequest
        >({
            query: (params: ConsumerHistoryRequest) => ({
                url: `/orders/consumer/history`,
                params: {
                    page: params.page,
                    size: params.size,
                    status: params.status,
                },
            }),
            // providesTags: ['ORDERS'],
        }),
    }),
})

export const {
    useIncompleteOrdersQuery,
    useCompleteOrderMutation,
    useGetConsumerHistoryQuery,
} = orders
