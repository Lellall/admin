import { baseApi } from '../api/baseApi';
import { Shop, ShopRequest, ShopsRequest, ShopsResponse } from './typings';

const shops = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<ShopsResponse, ShopsRequest>({
      query: (params) => ({
        url: `/shops`,
        params,
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
