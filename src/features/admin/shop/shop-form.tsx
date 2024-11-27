import { useEffect, useState } from "react"
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
import { useGetCategoriesQuery } from "@/redux/categories/categories.api"
import { Category } from "@/redux/categories/typings"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"

interface ShopFormProps {
  mode: "create" | "update"
  close?: () => void
  restaurantId?: string
}

function ShopForm({ mode, close, restaurantId }: ShopFormProps) {
  const { id: shopId } = useParams()
  const activeId = restaurantId ? restaurantId : shopId
  const { data: shopData, isLoading } = useGetShopQuery({ id: activeId ?? "" }, { skip: mode === "create" })
  const [updateShop, { isLoading: isUpdating, isSuccess: isUpdatingSuccess }] = useUpdateShopMutation()
  const [createShop, { isLoading: isCreating, isSuccess }] = useCreateShopMutation()
  const { data: markets } = useGetMarketsQuery()
  const { data: categories } = useGetCategoriesQuery({ type: "SHOP" })
  const [location, setLocation] = useState(null)
  // const [address, setAddress] = useState("")

  const {
    // register,
    reset,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Shop>({
    defaultValues: shopData,
    resolver: yupResolver(schema) as any,
  })

  useEffect(() => {
    if (mode === "update" && shopData) {
      reset({ paystackAccountId: shopData?.subAccountId, ...shopData })
    }

    if (isSuccess || isUpdatingSuccess) {
      if (close) {
        close()
      }
    }
  }, [mode, shopData, reset, isSuccess, isUpdatingSuccess, close])

  const handleFormSubmit: SubmitHandler<Shop> = (data) => {
    const { market, address, category, timeZone, vatCharge, metadata, paystackAccountId, ...restData } = data

    if (mode === "update") {
      const dataToSubmit = {
        ...restData,
        marketId: market?.id,
        categoryId: category?.id,
        paystackAccountId: paystackAccountId ? paystackAccountId : metadata?.PAYSTACK_ACCOUNT_CODE,
      }
      updateShop({ id: data.id, ...dataToSubmit })
    } else {
      const createShopData = {
        ...data,
        marketId: market?.id,
        categoryId: category?.id,
        vatCharge: "7.5",
        timeZone: "GMT+1",
        address,
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
    if (location) {
      geocodeByAddress(location.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setValue("coordinate.latitude", lat)
          setValue("coordinate.longitude", lng)
        })
    }
  }, [location])

  return (
    <form className="w-[90%] m-auto " onSubmit={handleSubmit(handleFormSubmit)}>
      <div className=" w-[100%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-1">
          <InputComponent errorMessage={errors?.name?.message} name="name" control={control} label="Name" />
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
          <InputComponent
            styledContainer={{ display: "none" }}
            disabled
            errorMessage={errors?.id?.message}
            name="id"
            control={control}
            label="ID"
          />
        </div>
        <div
          style={{
            // background: "red",
            marginBottom: "1rem",
          }}
        >
          <label
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#808080",
            }}
          >
            Address
          </label>

          <GooglePlacesAutocomplete
            apiKey="AIzaSyBrdpKCFrR1oMxYds0rkd80BWkhzREXmSY"
            selectProps={{
              value: location,
              onChange: (e) => {
                setLocation(e)
                setValue("address", e?.label)
              },
              placeholder: "Search address",
              styles: {
                control: (provided) => ({
                  ...provided,
                  height: "55px",
                }),
                input: (provided) => ({
                  ...provided,
                  width: "100% !important",
                  height: "100% !important",
                }),
                option: (provided) => ({
                  ...provided,
                }),
                singleValue: (provided) => ({
                  ...provided,
                }),
              },
            }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 mb-1">
          <InputComponent
            errorMessage={errors?.description?.message}
            name="description"
            control={control}
            label="Description"
            type="textArea"
            styledInput={{ width: "100%" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.category?.id?.message}
            name="category.id"
            control={control}
            label="Category "
            type="select"
            options={categoriesData}
            // disabled
          />

          <InputComponent
            errorMessage={errors?.market?.id?.message}
            name="market.id"
            control={control}
            label="Market "
            // disabled
            type="select"
            options={marketsData}
          />
          <InputComponent
            errorMessage={errors?.openingTime?.message}
            name="openingTime"
            control={control}
            label="Opening Time"
            type="time"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
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
  logoUrl: yup.string(),
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  status: yup.string().required("Status is required"),
  inventory: yup.number().required("Inventory is required"),
  active: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  timeZone: yup.string(),
  categoryId: yup.string(),
  openingTime: yup.string().required("Opening time is required."),
  closingTime: yup.string().required("Closing time is required"),
  // subAccountId: yup.string().required("Subaccount ID is required"),
  vatCharge: yup.number(),
  marketId: yup.string(),
  coordinate: yup.object().shape({
    latitude: yup.number().required("Latitude is required"),
    longitude: yup.number().required("Longitude is required"),
  }),
  paystackAccountId: yup.string(),
})
