import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import MiniLoader from "@/components/mini-loader"
import ScreenLoader from "@/components/screen.loader"
import InputComponent from "@/components/Inputs/input-component"
import { useGetShopQuery } from "@/redux/shops"
import { useCreateShopMutation, useUpdateShopMutation } from "@/redux/shops/shops.api"
import { Shop } from "@/redux/shops/typings"
import { useGetMarketsQuery } from "@/redux/markets/market.api"
import { useGetCategoriesTypeQuery } from "@/redux/categories/categories.api"
import { Category } from "@/redux/categories/typings"

interface ShopFormProps {
  mode: "create" | "update"
  close?: () => void
}

function ShopForm({ mode, close }: ShopFormProps) {
  const { id: shopId } = useParams()
  const { data: shopData, isLoading } = useGetShopQuery({ id: shopId ?? "" }, { skip: mode === "create" })
  const [updateShop, { isLoading: isUpdating, isSuccess: isUpdatingSuccess }] = useUpdateShopMutation()
  const [createShop, { isLoading: isCreating, isSuccess }] = useCreateShopMutation()
  const { data: markets } = useGetMarketsQuery()
  const { data: categories } = useGetCategoriesTypeQuery()

  const {
    // register,
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<Shop>({
    defaultValues: shopData,
    resolver: yupResolver(schema) as any,
  })

  useEffect(() => {
    if (mode === "update" && shopData) {
      reset(shopData)
    }
  }, [reset, shopData])

  const handleFormSubmit: SubmitHandler<Shop> = (data) => {
    const { market, category, metadata, ...restData } = data

    if (mode === "update") {
      const dataToSubmit = {
        ...restData,
        marketId: market?.id,
        categoryId: category.id,
        paystackAccountId: metadata.PAYSTACK_ACCOUNT_CODE,
      }
      updateShop({ id: data.id, ...dataToSubmit })
    } else {
      const createShopData = {
        ...data,
        marketId: market?.id,
      }
      createShop(createShopData)
    }
    // updateVendor({ id: data.id, ...dataToSubmit })
  }
  if (mode === "update" && isLoading) {
    return <ScreenLoader />
  }
  const categoriesData = categories?.map((item: Category) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  const marketsData = markets?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  useEffect(() => {
    if (isSuccess || isUpdatingSuccess) {
      if (close) {
        close()
      }
    }
  }, [isSuccess, isUpdatingSuccess])

  return (
    <form className="w-[100%] px-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className=" w-[100%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.name?.message} name="name" control={control} label="Name" />

          <InputComponent
            styledContainer={{ display: "none" }}
            disabled
            errorMessage={errors?.id?.message}
            name="id"
            control={control}
            label="ID"
          />
          <InputComponent
            errorMessage={errors?.description?.message}
            name="description"
            control={control}
            label="Description"
          />
          <InputComponent
            errorMessage={errors?.logoUrl?.message}
            name="logoUrl"
            control={control}
            label="Logo URL"
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.address?.message} name="address" control={control} label="Address" />
          <InputComponent
            errorMessage={errors?.status?.message}
            name="status"
            control={control}
            label="Status"
            type="select"
            options={[
              { label: "OPEN", value: "OPEN" },
              { label: "CLOSE", value: "CLOSE" },
            ]}
          />
          <InputComponent
            errorMessage={errors?.inventory?.message}
            name="inventory"
            control={control}
            label="Inventory"
            type="number"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.subAccountId?.message}
            name="subAccountId"
            control={control}
            label="Sub Account Id"
            type="text"
          />

          <InputComponent
            errorMessage={errors?.active?.message}
            name="active"
            control={control}
            label="Active"
            type="checkbox"
          />
          <InputComponent
            errorMessage={errors?.timeZone?.message}
            name="timeZone"
            control={control}
            label="Timezone"
            // disabled
          />
        </div>

        {/* <HeaderTitle>Category</HeaderTitle> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.category?.id?.message}
            name="categoryId"
            control={control}
            label="Category ID"
            type="select"
            options={categoriesData}
            // disabled
          />
          <InputComponent
            errorMessage={errors?.vatCharge?.message}
            name="vatCharge"
            control={control}
            label="VAT Charge"
            type="number"
          />
          <InputComponent
            errorMessage={errors?.market?.id?.message}
            name="market.id"
            control={control}
            label="Market ID"
            // disabled
            type="select"
            options={[{ label: "One", value: 1 }]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.coordinate?.latitude?.message}
            name="coordinate.latitude"
            control={control}
            label="Latitude"
            type="number"
          />
          <InputComponent
            errorMessage={errors?.coordinate?.longitude?.message}
            name="coordinate.longitude"
            control={control}
            label="Longitude"
            type="number"
          />
          <InputComponent
            errorMessage={errors?.paystackAccountId?.message}
            name="paystackAccountId"
            control={control}
            label="Paystack Account Id "
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.openingTime?.message}
            name="openingTime"
            control={control}
            label="Opening Time"
            type="time"
          />
          <InputComponent
            errorMessage={errors?.closingTime?.message}
            name="closingTime"
            control={control}
            label="Closing Time"
            type="time"
          />
        </div>
      </div>
      <button className="bg-[#F06D04] rounded-md shadow-lg flex justify-center p-2 w-full mb-4" type="submit">
        {isUpdating || isCreating ? <MiniLoader /> : "Submit"}
      </button>
    </form>
  )
}

export default ShopForm

const HeaderTitle = styled.h3`
  padding: 10px 0px;
  margin-top: 15px;
  @media screen and (max-width: 765px) {
    width: 90%;
    margin: 10px auto;
  }
`

const schema = yup.object().shape({
  id: yup.string(),
  description: yup.string().required("Description is required"),
  logoUrl: yup.string().url("Logo URL must be a valid URL").required("Logo URL is required"),
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  status: yup.string().required("Status is required"),
  inventory: yup.number().required("Inventory is required"),
  active: yup.boolean().required("Active status is required"),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  timeZone: yup.string().required("Timezone is required"),
  categoryId: yup.string(),
  openingTime: yup.string().required("Opening time is required."),
  closingTime: yup.string().required("Closing time is required"),
  subAccountId: yup.string().required("Subaccount ID is required"),
  vatCharge: yup.number().required("VAT charge is required"),
  marketId: yup.string(),
  coordinate: yup.object().shape({
    latitude: yup.number().required("Latitude is required"),
    longitude: yup.number().required("Longitude is required"),
  }),
  paystackAccountId: yup.string().required("Pay stack account Id is required"),
})
