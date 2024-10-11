import { baseApi } from "../api/baseApi"
import { Category } from "./typings"

const markets = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: `/categories/type?type=PRODUCT`,
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = markets

interface CategoriesResponse {
  data: Category[]
  pageTotal: number
  resultTotal: number
}
