import apiSlice from "../api/api.slice";
import { ShopRequest, ShopsRequest, ShopsResponse } from "./typings";

const shops = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<ShopsResponse, ShopsRequest>({
      query: () => ({
        url: `/shops`,
      }),
    }),
    getSingleShop: builder.query<ShopsResponse, ShopRequest>({
      query: (params: ShopRequest) => ({
        url: `/shops/${params.id}`,
      }),
    }),
  }),
});

export const { useGetSingleShopQuery, useGetShopsQuery } = shops;
