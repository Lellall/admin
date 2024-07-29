/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { baseApi } from '../api/baseApi';
import { Shop, ShopRequest, ShopsProductsRequest, ShopsRequest, ShopsResponse } from './typings';

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
    getShopProducts: builder.query<ShopsResponse, ShopsProductsRequest>({
      query: (params: ShopsProductsRequest) => ({
        url: `/shops/${params.id}/products`,
      }),
    }),
    updateShop: builder.mutation<Shop, any>({
      query: ({ id, data }) => ({
        url: `/shops/${id}`,
        body: data,
        method: 'PUT',
      }),
      onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Vendor Updated Successfully `, {
            position: 'top-right',
          });
        }).catch((err) => {
          toast.error(`${err.error.data.title}`, {
            position: 'top-right',
          });
        });
      },
    }),
  }),
});

export const { useGetSingleShopQuery, useGetShopsQuery, useUpdateShopMutation, useGetShopProductsQuery } = shops;
