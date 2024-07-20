// import apiSlice from '../api/api.slice';
import { baseApi } from '../api/baseApi';
import { Shop, ShopRequest, ShopsRequest, ShopsResponse } from './typings';

const shops = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<ShopsResponse, ShopsRequest>({
      query: () => ({
        url: `/shops`,
      }),
    }),
    getSingleShop: builder.query<Shop, ShopRequest>({
      query: (params: ShopRequest) => ({
        url: `/shops/${params.id}`,
      }),
    }),
  }),
});

export const { useGetSingleShopQuery, useGetShopsQuery } = shops;
