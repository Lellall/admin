import { useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import { useDebounce } from "react-use"
import { Product } from "../../../redux/products/typings"
import {
    useAddShopProductMutation,
    useGetShopCategoriesQuery,
    useGetShopProductsQuery,
    useLazyGetSingleShopProductsQuery,
    useUpdateShopProductMutation,
} from "@/redux/shops/shops.api"

export function useShop() {
    const { id } = useParams()
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<Product | null>(null)
    const [produtName, setProductName] = useState<string>("")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [isAddModalOpen, setIsAdddModalOpen] = useState(false)
    const [fetchSingleProduct, { data: product, isLoading: loadingProduct }] =
        useLazyGetSingleShopProductsQuery()
    const [
        addProduct,
        { isLoading: addingProduct, isSuccess: isProdcutSucess },
    ] = useAddShopProductMutation()
    const [updateProduct, { isSuccess, isLoading: updatingProduct }] =
        useUpdateShopProductMutation()
    const { data: categories, isLoading: loadingCategories } =
        useGetShopCategoriesQuery({
            shopId: id,
        })
    const handleAddProduct = (data: Product) => {
        const dataToSubmit = {
            ...data,
            category: { id: categories[0].id, type: categories[0].type },
        }
        // @ts-expect-error
        addProduct({ data: dataToSubmit, shopId: id })
    }

    //   console.log(categories);
    const handleProductUpdate = (data: Product) => {
        const { category, ...restData } = data
        const dataToSubmit = {
            ...restData,
            categoryId: category.id,
        }
        updateProduct({
            productId: selected.id,
            data: dataToSubmit,
            shopId: selected.shop.id,
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
        filter: debouncedSearchTerm,
        categoryId: "",
        id,
    })

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber)
    }

    const openProductModal = (productItem: any) => {
        setSelected(productItem)
        setIsEditModalOpen(true)
    }
    const closeProductModal = () => {
        setSelected(null)
        setIsEditModalOpen(false)
        setIsAdddModalOpen(false)
    }

    useEffect(() => {
        if (selected) {
            fetchSingleProduct({
                productId: selected.id,
                shopId: selected.shop.id,
            })
        }
    }, [fetchSingleProduct, selected])

    useEffect(() => {
        if (isSuccess) {
            closeProductModal()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isProdcutSucess) {
            closeProductModal()
        }
    }, [isProdcutSucess])

    const handleSearchChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setProductName(event.target.value)
    }
    const actions = {
        handlePageClick,
        handleSearchChange,
        openProductModal,
        handleProductUpdate,
        setIsAdddModalOpen,
        closeProductModal,
        handleAddProduct,
    }
    const variables = {
        page,
        produtName,
        products,
        product,
        isAddModalOpen,
        isEditModalOpen,
        categories,
    }
    const loading = {
        addingProduct,
        loadingCategories,
        loadingProducts,
        fetchingProducts,
        loadingProduct,
        updatingProduct,
    }

    return { actions, variables, loading }
}
