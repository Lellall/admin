/* eslint-disable no-console */
import { baseApi } from "../api/baseApi"

const markets = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query<Markets[], void>({
      query: () => ({
        url: `/markets`,
      }),
      //   providesTags: [""],
    }),
  }),
})

export const { useGetMarketsQuery } = markets

interface Markets {
  id: string
  name: string
  state: string
}
