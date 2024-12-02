import { toast } from "react-toastify"
import { baseApi } from "../api/baseApi"
import { fileDownloader } from "@/lib/file-download"

interface Product {
  count: number
  id: string
  imageUrl: string
  name: string
  newlyAdded: number
  price: number
  productId: string
  used: number
}

interface InventoryResponse {
  resultTotal: number
  pageTotal: number
  data: Product[]
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
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
          toast.success(`Product updated successfully`, {
            position: "top-right",
          })
        } catch (err) {
          toast.error(`${err.error?.data?.message || "Update failed"}`, {
            position: "top-right",
          })
        }
      },
      invalidatesTags: ["INVENTORY"],
    }),

    deleteInventory: builder.mutation<InventoryResponse, Record<string, any>>({
      query: (data) => ({
        url: `/restaurants/${data.shopId}/inventory`,
        body: data.data,
        method: "DELETE",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
          toast.success(`Product deleted successfully`, {
            position: "top-right",
          })
        } catch (err) {
          toast.error(`${err.error?.data?.message || "Deletion failed"}`, {
            position: "top-right",
          })
        }
      },
      invalidatesTags: ["INVENTORY"],
    }),

    exportInventory: builder.query<string, { shopId: string }>({
      queryFn: async ({ shopId }, _queryApi, _extraOptions) => {
        try {
          const response = await fetch(`/restaurants/${shopId}/inventory/export`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                message: "Failed to download template",
              },
            }
          }

          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", "inventories.xls")
          document.body.appendChild(link)
          link.click()
          link.remove()
          window.URL.revokeObjectURL(url) // Clean up the URL object

          return { data: "Inventory file downloaded successfully" }
        } catch (error) {
          return {
            error: {
              status: 500,
              message: "Internal Server Error",
            },
          }
        }
      },

      async onQueryStarted(_args, { queryFulfilled }) {
        queryFulfilled
          .then(() => {
            toast.success(`Exported successfully`, {
              position: "top-right",
            })
          })
          .catch((err) => {
            toast.error(`${err.error?.message || "Export failed"}`, {
              position: "top-right",
            })
          })
      },
      providesTags: ["INVENTORY"],
    }),
  }),
})

export const {
  useGetInventoryDetailsQuery,
  useLazyExportInventoryQuery,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventory

export default inventory
