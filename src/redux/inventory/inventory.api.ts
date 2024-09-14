
import { toast } from "react-toastify";
import { baseApi } from "../api/baseApi";
interface Product {
    count: number;
    id: string;
    imageUrl: string;
    name: string;
    newlyAdded: number;
    price: number;
    productId: string;
    used: number;
}

interface InventoryResponse {
    resultTotal: number;
    pageTotal: number;
    data: Product[];
}

const inventory = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInventoryDetails: builder.query<InventoryResponse, Record<string, any>>({
            query: (params) => ({
                url: `/restaurants/${params.shopId}/inventory`,
                params,
                method: "GET",
            }),
            providesTags: ["INVENTORY"],
        }),
        updateInventory: builder.mutation<InventoryResponse, Record<string, any>>({
            query: (data) => ({
                url: `/restaurants/${data.shopId}/inventory`,
                body: data.data,
                method: "PATCH",
            }),
            async onQueryStarted(_args, { queryFulfilled: qf }) {
                qf.then(() => {
                    toast.success(`Product updated successfully`, {
                        position: "top-right",
                    })
                }).catch((err) => {
                    toast.error(`${err.error?.data?.message}`, {
                        position: "top-right",
                    })
                })
            },
            invalidatesTags: ["INVENTORY"],
        }),
        deleteInventory: builder.mutation<InventoryResponse, Record<string, any>>({
            query: (data) => ({
                url: `/restaurants/${data.shopId}/inventory`,
                body: data.data,
                method: "DELETE",
            }),
            async onQueryStarted(_args, { queryFulfilled: qf }) {
                qf.then(() => {
                    toast.success(`Product deleted successfully`, {
                        position: "top-right",
                    })
                }).catch((err) => {
                    toast.error(`${err.error?.data?.message}`, {
                        position: "top-right",
                    })
                })
            },
            invalidatesTags: ["INVENTORY"],
        }),

    }),
});

export const { useGetInventoryDetailsQuery, useUpdateInventoryMutation, useDeleteInventoryMutation } = inventory;

