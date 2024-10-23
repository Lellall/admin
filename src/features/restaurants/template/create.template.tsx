import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Grid1, Trash, TableDocument, ShoppingCart, Category } from "iconsax-react"
import empty from "@/assets/empty.svg"
import { Template as TemplateForm } from "@/redux/templates/typings"
import { useCreateTemplateMutation } from "@/redux/templates/template.api"
import { Product } from "@/redux/products/typings"
import { TitledBackButton } from "@/components/ui/base/back-button"
import CardList from "./product-select"
import { useDebounce } from "react-use"
import { useGetProductsQuery } from "@/redux/products"
import { useGetCategoriesQuery } from "@/redux/categories/categories.api"
import CategoryModal from "./category-modal"
import Modal from "./container"
import Button from "@/components/button/button"
import ScreenLoader from "@/components/screen.loader"

export type SelectedProduct = Product & {
  productId: string
  quantity: number
  label?: string
  measurement?: string
  unitPrice?: number
}

function CreateTemplate() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("user") ?? "")
  const shopId = userData?.shopIds[0]
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()
  const [current, setCurrent] = useState(1)
  const [produtName, setProductName] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [showTable, setShowTable] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)

  const getFormattedDate = () => {
    const now = new Date()

    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
    const year = now.getFullYear()

    let hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12 || 12

    return `untitled_${hours}:${minutes}${ampm}`
  }
  const [templateName, setTemplateName] = useState(getFormattedDate())

  const handleCategoryClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  useDebounce(
    () => {
      setDebouncedSearchTerm(produtName)
    },
    500,
    [produtName]
  )

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page: current - 1,
    size: 2000,
    filter: debouncedSearchTerm,
    categoryId: "",
  })
  const { data: categories } = useGetCategoriesQuery({ type: "PRODUCT" })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TemplateForm>()

  useEffect(() => {
    const newSubtotal = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)
    setSubtotal(newSubtotal)
    setValue("templateItemsDto", selectedProducts)
  }, [selectedProducts, setValue])

  const handleFormSubmit = (data: any) => {
    createTemplate({
      name: templateName,
      templateItemsDto: data,
      shopId,
    })
      .unwrap()
      .finally(() => {
        navigate(-1)
      })
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setSelectedProducts((prev) => prev.map((p) => (p.id === id ? { ...p, newQNT: newQuantity } : p)))
  }
  const handleMeasurementChange = (id: string, measurement: string) => {
    setSelectedProducts((prev) => prev.map((p) => (p.id === id ? { ...p, measurement } : p)))
  }
  const handleUnitChange = (id: string, unit: string) => {
    setSelectedProducts((prev) => prev.map((p) => (p.id === id ? { ...p, unitPrice: unit } : p)))
  }

  const handleDeleteProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Debounced Search Term:", debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const transformData = (selectedProducts) => {
    const data = selectedProducts.map((item) => ({
      productId: item.id,
      quantity: item.newQNT,
      measurement: item.measurement,
      price: item.price,
      unitPrice: parseFloat(item.unitPrice) || 0,
    }))

    createTemplate({ name: templateName, templateItemsDto: data, shopId })
      .unwrap()
      .finally(() => {
        navigate(-1)
      })
  }

  return (
    <div className="p-4 w-full mx-auto relative">
      <div className="flex items-left w-1/3 p-3 rounded-lg mb-2">
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Template Order Name Here...."
          className="flex-grow bg-transparent border-none outline-none text-green-700 placeholder-grey-200"
        />
      </div>
      <TitledBackButton />
      <div className="flex items-center w-full max-w-[900px] bg-green-100 p-3 rounded-lg shadow-md mx-auto relative">
        <input
          type="text"
          value={produtName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Search..."
          className={`flex-grow bg-transparent border-none outline-none text-green-700 placeholder-green-500 pr-10 ${isFetching && "animate-pulse"}`} // Tailwind pulse animation when fetching
        />
        {isFetching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center w-full max-w-[1000px] p-6 bg-white mx-auto">
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
          <div className="flex flex-col items-center" onClick={() => setIsModalOpen(true)}>
            <Category
              size="24"
              className="text-green-700 hover:text-green-500 cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="mt-1 text-xs text-gray-600">Category</span>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart
              size="24"
              className="text-green-700 hover:text-green-500 cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="mt-1 text-xs text-gray-600">Selected: {selectedProducts.length}</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setShowTable(false)}>
            <Grid1
              size="24"
              className="text-green-700 hover:text-green-500 cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="mt-1 text-xs text-gray-600">Grid View</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setShowTable(true)}>
            <TableDocument
              size="24"
              className="text-green-700 hover:text-green-500 cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="mt-1 text-xs text-gray-600">Table View</span>
          </div>
        </div>
      </div>

      <div className="">
        {isLoading || isFetching ? (
          <ScreenLoader style={{ height: "50vh" }} />
        ) : (
          <CardList setSelectedProducts={setSelectedProducts} cards={products?.data ?? []} />
        )}
      </div>
      <button
        className={`fixed bottom-6 right-6 px-6 py-3 rounded-full text-white transition-all duration-200 ${
          selectedProducts.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={selectedProducts.length === 0}
        onClick={() => setShowSubmit(true)}
      >
        Shop Now
      </button>
      <Modal isOpen={showSubmit} onClose={() => setShowSubmit(false)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
            <div className="border-b p-4 flex justify-between items-center">
              <h1 className="">Continue shopping</h1>
              <button className="text-gray-600 hover:text-gray-900" onClick={() => setShowSubmit(false)}>
                &times;
              </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh] p-4">
              <form>
                {selectedProducts.length > 0 ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Selected Products</h2>

                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 border rounded-lg"
                      >
                        <div className="flex flex-col">
                          <label className="font-semibold mb-1">Product Name</label>
                          <input
                            type="text"
                            value={product.name}
                            className="border p-2 rounded bg-gray-200 outline-none"
                            disabled
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-semibold mb-1">Quantity</label>
                          <input
                            type="number"
                            min="1"
                            className="border p-2 rounded outline-none"
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-semibold mb-1">Measurement</label>
                          <input
                            type="text"
                            value={product.measurement}
                            className="border p-2 rounded outline-none"
                            placeholder="Ex: Basket"
                            onChange={(e) => handleMeasurementChange(product.id, e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-semibold mb-1">Unit Price</label>
                          <input
                            type="text"
                            value={product.unitPrice}
                            className="border p-2 rounded outline-none"
                            placeholder="Ex: 4 or 4.4"
                            onChange={(e) => handleUnitChange(product.id, e.target.value)}
                          />
                        </div>

                        <div className="flex justify-end items-center sm:col-span-2">
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                            aria-label="Delete product"
                          >
                            <Trash size="22" color="#FF8A65" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center mt-10">
                    <div className="mb-4">
                      <img src={empty} alt="No products" />
                    </div>
                    <div className="text-center text-lg font-semibold text-gray-600">
                      🛒 <span className="text-green-600">No products added to your cart yet!</span> Start browsing and
                      add items to place your order. 🛒
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="border-t p-4 flex justify-between items-center">
              <div className="text-lg font-bold"></div>
              <Button className={""} loading={isCreating} onClick={() => transformData(selectedProducts)} type="submit">
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <CategoryModal isModalOpen={isModalOpen} setIsModalOpen={handleCategoryClick} categories={categories} />
    </div>
  )
}

export default CreateTemplate
