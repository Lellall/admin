import { useEffect } from "react"
import styled from "styled-components"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ScreenLoader from "@/components/screen.loader"
import { Product, productSchema } from "@/redux/products/typings"
import InputComponent from "@/components/Inputs/input-component"
import { useGetCategoriesQuery } from "@/redux/categories/categories.api"
import { Category } from "@/redux/categories/typings"
import { useShop } from "./shop.controller"
import { useGetSingleShopProductsQuery } from "@/redux/shops/shops.api"
import { useParams } from "react-router-dom"
// import Select from "react-select"

interface EditFormProps {
  mode: "create" | "update"
  close?: () => void
  productId?: string
}

function ShopsProductForm({ mode, close, productId }: EditFormProps) {
  const { actions, loading } = useShop()
  const { id: shopId } = useParams()

  const { data: product, isLoading } = useGetSingleShopProductsQuery(
    {
      productId: productId ?? "",
      shopId: shopId ?? "",
    },
    { skip: mode === "create" }
  )
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
    resolver: yupResolver(productSchema) as any,
  })

  const { data: categories } = useGetCategoriesQuery({ type: "PRODUCT" })

  const handleFormSubmit: SubmitHandler<Product> = (product) => {
    if (mode === "create") {
      const { category, ...rest } = product
      const categoryId = category.id
      const data = { categoryId: categoryId, ...rest }
      actions.handleAddProduct(data)
      return
    }
    actions.handleProductUpdate(product)
  }

  useEffect(() => {
    if (mode === "update" && product) {
      reset({ category: { label: "MUSA", value: "MUSA" }, ...product })
    }

    if (loading.isUpdateSuccess || loading.isAddProductSucess) {
      if (close) {
        close()
      }
    }
  }, [reset, product, close, loading.isUpdateSuccess, loading.isAddProductSucess])
  // const pricingDetails = getValues().pricingDetails;

  const categoriesData = categories?.map((item: Category) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  if (isLoading) {
    return <ScreenLoader />
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            disabled
            styledContainer={{ display: "none" }}
            errorMessage={errors?.id?.message}
            name="id"
            control={control}
            label="ID"
          />
          <InputComponent errorMessage={errors?.name?.message} name="name" control={control} label="Name" />

          <InputComponent errorMessage={errors?.price?.message} name="price" control={control} label="Price" />
          <InputComponent
            errorMessage={errors?.minPurchasePrice?.message}
            name="minPurchasePrice"
            control={control}
            label="Min Purchase Price"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.description?.message}
            name="description"
            control={control}
            label="Description"
            type="textArea"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            errorMessage={errors?.inventory?.message}
            name="inventory"
            control={control}
            label="Inventory"
          />
          <InputComponent errorMessage={errors?.quantity?.message} name="quantity" control={control} label="Quantity" />
          <InputComponent errorMessage={errors?.discount?.message} name="discount" control={control} label="Discount" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            disabled
            errorMessage={errors?.currency?.message}
            name="currency"
            control={control}
            label="Currency"
            styledContainer={{ display: "none" }}
          />
          <InputComponent
            errorMessage={errors?.manufacturer?.message}
            name="manufacturer"
            control={control}
            label="Manufacturer"
          />
          <InputComponent
            errorMessage={errors?.featured?.message}
            name="featured"
            control={control}
            label="Featured"
            type="checkbox"
          />
          <InputComponent
            errorMessage={errors?.available?.message}
            name="available"
            control={control}
            label="Available"
            type="checkbox"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.height?.message} name="height" control={control} label="Height" />
          <InputComponent errorMessage={errors?.width?.message} name="width" control={control} label="Width" />

          <InputComponent
            type="select"
            label="Category"
            name="category.id"
            control={control}
            options={categoriesData}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent errorMessage={errors?.depth?.message} name="depth" control={control} label="Depth" />
          <InputComponent errorMessage={errors?.tags?.message} name="tags.0" control={control} label="Tags" />
          <InputComponent errorMessage={errors?.imageUrl?.message} name="imageUrl" control={control} label="ImageUrl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InputComponent
            label="Measurement"
            control={control}
            name="pricingDetails.0.measurement"
            errorMessage={errors?.pricingDetails?.message}
          />
          <InputComponent
            label="Price"
            control={control}
            name="pricingDetails.0.price"
            errorMessage={errors?.pricingDetails?.message}
          />
          <InputComponent errorMessage={errors?.weight?.message} name="weight" control={control} label="Weight" />
        </div>

        <SubmitButton type="submit">
          {loading.updatingProduct || loading.addingProduct ? "Loading..." : "Submit"}
        </SubmitButton>
      </form>
    </Container>
  )
}

export default ShopsProductForm

const Container = styled.div`
  width: 100%;
  overflow: scroll;
`

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 12px 20px;
  margin-top: 17px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  width: 100%;
`
