/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { baseApi } from '../api/baseApi';
import {
  Shop,
  ShopRequest,
  ShopsProductsRequest,
  ShopsRequest,
  ShopsResponse,
  VendorsProductResponse,
} from './typings';
import { Product } from '../products/typings';

const shops = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<ShopsResponse, ShopsRequest>({
      query: (params) => ({
        url: `/shops`,
        params,
      }),
      providesTags: ['SHOPS'],
    }),
    getShop: builder.query<Shop, ShopRequest>({
      query: ({ id }: ShopRequest) => ({
        url: `/shops/${id}`,
      }),
      providesTags: ['SHOPS'],
    }),
    getShopProducts: builder.query<VendorsProductResponse, ShopsProductsRequest>({
      query: (params: ShopsProductsRequest) => ({
        url: `/shops/${params.id}/products`,
      }),
      providesTags: ['SHOPS'],
    }),
    updateShop: builder.mutation<Shop, any>({
      query: ({ id, ...data }: any) => ({
        url: `/shops/${id}`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['SHOPS'],
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
    updateShopProduct: builder.mutation<Product, Product>({
      query: ({ id, productId, ...data }: any) => ({
        url: `/shops/${id}/products/${productId}`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['SHOPS'],
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

export const {
  useGetShopQuery,
  useGetShopsQuery,
  useUpdateShopMutation,
  useGetShopProductsQuery,
  useUpdateShopProductMutation,
} = shops;
