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
        method: "patch",
        body: {
          isAvailable: rest.isAvailable,
          price: rest.price,
          description: rest.description,
        },
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then((res) => {
          toast.success(`${res}`, {
            position: "top-right",
          });
        }).catch((err) => {
          console.log(err);
          toast.error(`${err.error.error}`, {
            position: "top-right",
          });
        });
      },
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation } = products;
