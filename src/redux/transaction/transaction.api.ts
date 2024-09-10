// import apiSlice from '../api/api.slice';
import { baseApi } from "../api/baseApi"
import { TransactionRequest, TransactionResponse } from "./typings"

const transaction = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransaction: builder.query<TransactionResponse, TransactionRequest>({
      query: (params: TransactionRequest) => ({
        url: `/transactions?page=${params.page}&size=${params.size}&status=${params.status}`,
      }),
    }),
  }),
})

export const { useGetTransactionQuery } = transaction
