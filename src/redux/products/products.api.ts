/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { Product, ProductResponse, UpdateProductRequest, ProductRequest } from './typings';
// import apiSlice from '../api/api.slice';
import { baseApi } from '../api/baseApi';

const products = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductRequest>({
      query: (params) => ({
        url: `/products`,
        params,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: {
          isAvailable: rest.isAvailable,
          price: rest.price,
          description: rest.description,
        },
      }),
      invalidatesTags: ['PRODUCTS'],
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Product Updated Successfully `, {
            position: 'top-right',
          });
        }).catch((err) => {
          toast.error(`${err.error.data.message}`, {
            position: 'top-right',
          });
        });
      },
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation } = products;
