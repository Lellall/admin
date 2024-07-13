/* eslint-disable no-console */
import { toast } from "react-toastify";
import apiSlice from "../api/api.slice";
import {
  Product,
  ProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "./typings";

const products = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductRequest>({
      query: (params: ProductRequest) => ({
        url: `/products`,
        params: { page: params.page, size: params.size, filter: params.filter },
      }),
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: {
          isAvailable: rest.isAvailable,
          price: rest.price,
          description: rest.description,
        },
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Product Updated Successfully `, {
            position: "top-right",
          });
        }).catch((err) => {
          toast.error(`${err.error.error} || Failed to update the products`, {
            position: "top-right",
          });
        });
      },
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation } = products;
