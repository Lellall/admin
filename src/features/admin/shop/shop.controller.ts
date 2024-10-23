import { useParams } from "react-router-dom"

import { useState } from "react"
import { useDebounce } from "react-use"
import { Product } from "../../../redux/products/typings"
import {
  useAddShopProductMutation,
  useGetShopCategoriesQuery,
  useGetShopProductsQuery,
  useUpdateShopProductMutation,
} from "@/redux/shops/shops.api"

export function useShop() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [produtName, setProductName] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isAddModalOpen, setIsAdddModalOpen] = useState(false)
  const [addProduct, { isLoading: addingProduct, isSuccess: isAddProductSucess }] = useAddShopProductMutation()
  const [updateProduct, { isSuccess: isUpdateSuccess, isLoading: updatingProduct }] = useUpdateShopProductMutation()
  const { data: categories, isLoading: loadingCategories } = useGetShopCategoriesQuery({
    shopId: id ?? "",
  })
  const handleAddProduct = (data: Product) => {
    addProduct({ data, shopId: id ?? "" })
  }

  const handleProductUpdate = (data: Product) => {
    const { category, ...restData } = data
    const dataToSubmit = {
      ...restData,
      categoryId: category?.id,
    }

    updateProduct({
      productId: dataToSubmit.id,
      data: dataToSubmit,
      shopId: id,
    })
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
    isLoading: loadingProducts,
    isFetching: fetchingProducts,
  } = useGetShopProductsQuery({
    page: page - 1,
    size: 10,
    filter: debouncedSearchTerm.toLocaleLowerCase(),
    categoryId: "",
    id: id ?? "",
  })

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setProductName(event.target.value)
  }
  const actions = {
    handlePageClick,
    handleSearchChange,
    handleProductUpdate,
    setIsAdddModalOpen,
    handleAddProduct,
  }
  const variables = {
    page,
    produtName,
    products,
    isAddModalOpen,
    categories,
  }
  const loading = {
    addingProduct,
    loadingCategories,
    loadingProducts,
    fetchingProducts,
    isUpdateSuccess,
    isAddProductSucess,
    updatingProduct,
  }

  return { actions, variables, loading }
}
