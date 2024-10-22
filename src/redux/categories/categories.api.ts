import { baseApi } from "../api/baseApi"
import { Category } from "./typings"

const markets = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, CategoryRequest>({
      query: ({ type }) => ({
        url: `/categories/type?type=${type}`,
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = markets

type CategoriesResponse = Category[]

interface CategoryRequest {
  type: "SHOP" | "PRODUCT"
}
