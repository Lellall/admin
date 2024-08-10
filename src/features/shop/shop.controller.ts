import { useParams } from 'react-router-dom';
import {
  useAddShopProductMutation,
  useGetShopCategoriesQuery,
  useGetShopProductsQuery,
  useLazyGetSingleShopProductsQuery,
  useUpdateShopProductMutation,
} from '../../redux/shops/shops.api';
import { useEffect, useState } from 'react';
import { Product } from '../../redux/products/typings';
import { useDebounce } from 'react-use';

export function useShop() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Product | null>(null);
  const [produtName, setProductName] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isAddModalOpen, setIsAdddModalOpen] = useState(false);
  const [fetchSingleProduct, { data: product, isLoading: loadingProduct }] = useLazyGetSingleShopProductsQuery();
  const [addProduct, { isLoading: addingProduct }] = useAddShopProductMutation();
  const [updateProduct, { isSuccess, isLoading: updatingProduct }] = useUpdateShopProductMutation();
  const { data: categories, isLoading: loadingCategories } = useGetShopCategoriesQuery({ shopId: id });
  const handleAddProduct = (data: Product) => {
    const dataToSubmit = {
      ...data,
      categories,
    };
    addProduct({ data: dataToSubmit, shopId: id });
  };

  //   console.log(categories);
  const handleProductUpdate = (data: Product) => {
    const { category, ...restData } = data;
    const dataToSubmit = {
      ...restData,
      categoryId: category.id,
    };
    updateProduct({
      productId: selected.id,
      data: dataToSubmit,
      shopId: selected.shop.id,
    });
  };
  useDebounce(
    () => {
      setDebouncedSearchTerm(produtName);
    },
    500,
    [produtName]
  );

  const {
    data: products,
    isLoading: loadingProducts,
    isFetching: fetchingProducts,
  } = useGetShopProductsQuery({
    page: page - 1,
    size: 10,
    filter: debouncedSearchTerm,
    categoryId: '',
    id: id,
  });

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const openProductModal = (product: any) => {
    setSelected(product);
    setIsEditModalOpen(true);
  };
  const closeProductModal = () => {
    setSelected(null);
    setIsEditModalOpen(false);
    setIsAdddModalOpen(false);
  };

  useEffect(() => {
    if (selected) {
      fetchSingleProduct({ productId: selected.id, shopId: selected.shop.id });
    }
  }, [fetchSingleProduct, selected]);

  useEffect(() => {
    if (isSuccess) {
      closeProductModal();
    }
  }, [isSuccess]);

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setProductName(event.target.value);
  };
  const actions = {
    handlePageClick,
    handleSearchChange,
    openProductModal,
    handleProductUpdate,
    setIsAdddModalOpen,
    closeProductModal,
    handleAddProduct,
  };
  const variables = { page, produtName, products, product, isAddModalOpen, isEditModalOpen, categories };
  const loading = {
    addingProduct,
    loadingCategories,
    loadingProducts,
    fetchingProducts,
    loadingProduct,
    updatingProduct,
  };

  return { actions, variables, loading };
}
