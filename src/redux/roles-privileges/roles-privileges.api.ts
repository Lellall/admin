import { toast } from "react-toastify"
import { baseApi } from "../api/baseApi"
import { PrivilegesResponse, RolesRequestBody, RolesResponse, RolesUpdateBody } from "./typings"
import { Errorhandler } from "@/utils/errorHandler"

const RolesPrivileges = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query<RolesResponse[], { shopId: string }>({
      query: ({ shopId }) => ({
        url: `/roles`,
        params: { shopId },
      }),
      providesTags: ["ROLES"],
    }),
    privileges: builder.query<PrivilegesResponse[], void>({
      query: () => ({
        url: `/privileges`,
      }),
      providesTags: ["ROLES"],
    }),
    addRole: builder.mutation<RolesResponse, RolesRequestBody>({
      query: (data) => ({
        url: `/roles`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Role Added Succesfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          console.log("ERR", err.error.data)
          Errorhandler(err)
        })
      },
      invalidatesTags: ["ROLES"],
    }),
    updateRole: builder.mutation<RolesResponse, RolesUpdateBody>({
      query: ({ roleId, ...rest }) => ({
        url: `/roles/${roleId}`,
        method: "PUT",
        body: rest,
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Role Added Succesfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          console.log("ERR", err.error.data)
          Errorhandler(err)
        })
      },
      invalidatesTags: ["ROLES"],
    }),
    deleteRole: builder.mutation<void, { roleId: string }>({
      query: ({ roleId }) => ({
        url: `/roles/${roleId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then(() => {
          toast.success(`Role Delete Succesfully`, {
            position: "top-right",
          })
        }).catch((err) => {
          console.log("ERR", err.error.data)
          Errorhandler(err)
        })
      },
      invalidatesTags: ["ROLES"],
    }),
  }),
})

export const { useRolesQuery, useAddRoleMutation, useDeleteRoleMutation, usePrivilegesQuery, useUpdateRoleMutation } =
  RolesPrivileges
