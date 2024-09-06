/* eslint-disable no-console */
import { toast } from "react-toastify"

import { Template } from "./typings"
import { baseApi } from "../api/baseApi"

const template = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTemplate: builder.query<TemplatesResponse, TemplateQuery>({
            query: (payloads) => ({
                url: `/template/${payloads.shopId}`,
                params: payloads,
            }),
        }),
        createTemplate: builder.mutation<TemplateResponse, TemplateRequest>({
            query: (QueryTemplate) => ({
                url: `/template/${QueryTemplate.shopId}`,
                method: "POST",
                body: QueryTemplate.data,
            }),
            async onQueryStarted(_args, { queryFulfilled: qf }) {
                qf.then(() => {
                    toast.success(`Template created successfully`, {
                        position: "top-right",
                    })
                }).catch((err) => {
                    console.log("ERR", err.error.data)
                    toast.error(`${err.error?.data?.message}`, {
                        position: "top-right",
                    })
                })
            },
            // invalidatesTags: ['ORDERS'],
        }),
    }),
})

export const { useCreateTemplateMutation, useGetTemplateQuery } = template

interface TemplateQuery {
    page?: number
    size?: number
    name?: string
    shopId: string
    // createdAt:
}

interface TemplateRequest {
    data: Template
    shopId: string
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
    data: [
        {
            name: string
            id: string
            shop: string
            createdAt: string
            templateItems: TemplateItems[]
        },
    ]
}
