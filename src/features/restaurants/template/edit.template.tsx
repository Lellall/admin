import { Trash } from "iconsax-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import empty from "@/assets/empty.svg"
import SearchComponent from "../components/searchInput"

import InputComponent from "@/components/Inputs/input-component"
import { Template as TemplateForm } from "@/redux/templates/typings"
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useCreateTemplateMutation,
} from "@/redux/templates/template.api"
import ScreenLoader from "@/components/screen.loader"
import { SelectedProduct } from "./create.template"
import { TitledBackButton } from "@/components/ui/base/back-button"
import { thousandFormatter } from "@/utils/helpers"

function EditTemplate() {
  const { id: templateId } = useParams()
  const user = JSON.parse(localStorage.getItem("user"))
  const shopId = user?.shopIds[0]
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct | any>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const navigate = useNavigate()
  const { data: template, isLoading } = useGetTemplateQuery({
    shopId,
    templateId,
  })

  const [updateTemplate, { isLoading: IsUpdating }] = useUpdateTemplateMutation()
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setSelectedProducts((prev: any[]) => prev.map((p) => (p.productId === id ? { ...p, quantity: newQuantity } : p)))
  }
  const handleMeasurementChange = (id: string, measurement: string) => {
    setSelectedProducts((prev: any[]) => prev.map((p) => (p.productId === id ? { ...p, measurement } : p)))
  }
  const handleUnitChange = (id: string, unit: string) => {
    setSelectedProducts((prev: any[]) => prev.map((p) => (p.productId === id ? { ...p, unitPrice: unit } : p)))
  }
  const handleDeleteProduct = (id: string) => {
    setSelectedProducts((prev: any[]) => prev.filter((p) => p.productId !== id))
  }

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<TemplateForm>({ defaultValues: template })

  useEffect(() => {
    const newSubtotal = selectedProducts?.reduce(
      (acc: number, product: { price: number; quantity: number }) => acc + product.price * product.quantity,
      0
    )
    setSubtotal(newSubtotal)
    setValue("templateItemsDto", selectedProducts)
  }, [selectedProducts, setValue])

  const handleFormSubmit = (data: TemplateForm) => {
    updateTemplate({
      shopId,
      templateId,
      data,
    })
  }
  const handleDuplicateTemplate = () => {
    const data = {
      name: "Duplicate " + getValues().name,
      templateItemsDto: getValues().templateItemsDto,
    }
    createTemplate({ data, shopId })
      .unwrap()
      .then(() => {
        navigate(-1)
      })
  }
  useEffect(() => {
    reset(template)
    setSelectedProducts(template?.templateItems)
  }, [reset, template])
  // const pricingDetails = getValues().pricingDetails;

  if (isLoading) {
    return <ScreenLoader />
  }

  const ButtonTitle = IsUpdating ? "Updating..." : "Update"
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <div className="flex justify-between">
        <TitledBackButton />
        <button
          type="button"
          onClick={handleDuplicateTemplate}
          className="mt-4 bg-[#0F5D38] text-white rounded px-4 py-2 hover:bg-green-950"
        >
          {isCreating ? "Duplicating..." : "Duplicate"}
        </button>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex justify-between  mb-4 flex-col">
          <InputComponent
            errorMessage={errors?.name?.message}
            name="name"
            control={control}
            label="Template Name"
            rules={{ required: "Template name is required" }} // Added validation rule
          />
        </div>

        <SearchComponent setSelectedProducts={setSelectedProducts} />

        {selectedProducts?.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Selected Products</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Product Name</th>
                  <th className="w-[10%] py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Measurment</th>
                  <th className="py-2 px-4 border">Unit</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product: any) => (
                  <tr key={product.productId}>
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={product.quantity}
                        min="1"
                        className="w-full h-full px-2 py-1 outline-none"
                        onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={product?.measurement}
                        placeholder="Ex: Basket"
                        className="w-full h-full px-2 py-1 outline-none"
                        onChange={(e) => handleMeasurementChange(product.productId, e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={product?.unitPrice}
                        placeholder="Ex: 4 or 4.4"
                        className="w-full h-full px-2 py-1 outline-none"
                        onChange={(e) => handleUnitChange(product.productId, e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.productId)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete product"
                      >
                        <Trash size="22" color="#FF8A65" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end flex-col items-end">
              {/* <div className="text-lg font-bold">Subtotal: ₦{subtotal?.toFixed(2)}</div> */}
              <div className="text-lg font-bold">Total: ₦{thousandFormatter(subtotal)}</div>
              <button type="submit" className="mt-4 bg-[#0F5D38] text-white rounded px-4 py-2 hover:bg-blue-600">
                {ButtonTitle}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="">
              <img src={empty} alt="image_" />
            </div>
            <div className="text-center text-lg font-semibold text-gray-600">
              🛒 <span className="text-green-600">No products added to your cart yet!</span> Start browsing and add
              items to place your order. 🛒
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default EditTemplate
