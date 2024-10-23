import { toast } from "react-toastify"

import { Template } from "./typings"
import { baseApi } from "../api/baseApi"
import { Errorhandler } from "@/utils/errorHandler"

const template = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<TemplatesResponse, TemplatesQuery>({
      query: (payloads) => ({
        url: `/template/${payloads.shopId}`,
        params: payloads,
      }),
      providesTags: ["TEMPLATE"],
    }),
    getTemplate: builder.query<TemplateResponse, TemplateQuery>({
      query: ({ shopId, templateId }) => ({
        url: `/template/${shopId}/${templateId}`,
      }),
      providesTags: ["TEMPLATE"],
    }),
    createTemplate: builder.mutation<TemplateResponse, TemplateRequest>({
      query: (QueryTemplate) => ({
        url: `/template/${QueryTemplate.shopId}`,
        method: "POST",
        body: QueryTemplate,
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Template created successfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          Errorhandler(err)
        })
      },
      invalidatesTags: ["TEMPLATE"],
    }),
    deleteTemplate: builder.mutation<any, TemplateDeleteRequest>({
      query: (params) => ({
        url: `/template/${params.shopId}/${params.templateId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Template delete successfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          toast.error(`${err.error?.data?.message}`, {
            position: "top-right",
          })
        })
      },
      invalidatesTags: ["TEMPLATE"],
    }),
    updateTemplate: builder.mutation<TemplateResponse, TemplatePatchRequest>({
      query: (QueryTemplate) => ({
        url: `/template/${QueryTemplate.shopId}/${QueryTemplate.templateId}`,
        method: "PATCH",
        body: QueryTemplate.data,
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Template updated successfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          toast.error(`${err.error?.data?.message}`, {
            position: "top-right",
          })
        })
      },
      invalidatesTags: ["TEMPLATE"],
    }),
  }),
})

export const {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} = template

interface TemplatesQuery {
  page?: number
  size?: number
  name?: string
  shopId: string
  // createdAt:
}
interface TemplateQuery {
  templateId: string
  shopId: string
  // createdAt:
}

interface TemplateRequest {
  // data: Template
  templateItemsDto: TemplateItems[]
  shopId: string
  name: string
}
interface TemplateDeleteRequest {
  templateId: string
  shopId: string
}
interface TemplatePatchRequest {
  data: Template
  shopId: string
  templateId: string
}
interface TemplateItems {
  productId: string
  productName: string
  quantity: 0
  available: boolean
  price: 0
}

interface TemplateResponse {
  id: string
  name: string
  templateItems: TemplateItems[]
  shop: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface TemplatesResponse {
  resultTotal: number
  pageTotal: number
  data: TemplateResponse[]
}
