import React, { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';
// import EditForm from './product-edit-form';
import { TableBody } from '@mui/material';
import { Add, Menu } from 'iconsax-react';
// import { SearchInp } from '../../components/ui/base/navbar/navbar.styles';
import Modal from '../../components/modal';
import { useDebounce } from 'react-use';
import MiniLoader from '../../components/mini-loader';
import ScreenLoader from '../../components/screen-loader';
import { Table, TableHead, TableWrapper, TableDataCell, TableHeadCell, TableRow, TableHeadRow } from './shops.style';
import SearchInput from '../../components/Inputs/searchInput';
import {
  useGetShopProductsQuery,
  useLazyGetSingleShopProductsQuery,
  useUpdateShopProductMutation,
} from '../../redux/shops/shops.api';
import { useParams } from 'react-router-dom';
import ShopsProductForm from './shops-product.form';
import EmptyState from '../../components/empty-state';
import { Product } from '../../redux/products/typings';

const ShopsProducts = () => {
  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState<Product | null>(null);
  const [produtName, setProductName] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  // const [isAddModalOpen, setIsAdddModalOpen] = useState(false);

  const [fetchSingleProduct, { data: singleProduct, isLoading: loadSingleProduct }] =
    useLazyGetSingleShopProductsQuery();
  const [updateProduct, { isSuccess }] = useUpdateShopProductMutation();

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
    isLoading,
    isFetching,
  } = useGetShopProductsQuery({
    page: current - 1,
    size: 10,
    filter: debouncedSearchTerm,
    categoryId: '',
    id: id,
  });

  const handlePageClick = (page: number) => {
    setCurrent(page);
  };

  const openProductModal = (product: any) => {
    setSelected(product);
    setIsEditModalOpen(true);
  };
  const closeProductModal = () => {
    setSelected(null);
    setIsEditModalOpen(false);
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
  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInput placeholder="What are you looking for?" value={produtName} onChange={handleSearchChange} />
        {isFetching && <MiniLoader />}
        <button>
          <Add />
        </button>
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: '50vh' }} />
      ) : (
        <>
          <div style={{ width: '100%' }}>
            <TableWrapper>
              <Table>
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>Description</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {!products.data.length ? (
                    <TableRow>
                      <TableDataCell colSpan={6} style={{ height: '40vh' }}>
                        <EmptyState />
                      </TableDataCell>
                    </TableRow>
                  ) : (
                    products?.data?.map((product) => (
                      <TableRow key={product.id}>
                        <TableDataCell>{product?.name}</TableDataCell>
                        <TableDataCell>{product?.price}</TableDataCell>
                        <TableDataCell>{product?.description}</TableDataCell>
                        <TableDataCell>
                          <button
                            style={{
                              textAlign: 'center',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '8px',
                            }}
                            onClick={() => openProductModal(product)}>
                            <Menu size="16" color="#FF8A65" />
                          </button>
                        </TableDataCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableWrapper>
          </div>
          <div style={{ float: 'right', margin: '10px' }}>
            <Pagination onChange={handlePageClick} current={current} total={products?.resultTotal} />
          </div>
        </>
      )}
      <Modal
        width="100%"
        title="Edit Product"
        style={{ maxWidth: '700px', width: '90%', margin: 'auto', overflowY: 'auto' }}
        show={isEditModalOpen}
        onClose={closeProductModal}>
        <>
          <ShopsProductForm isLoading={loadSingleProduct} data={singleProduct} onSubmit={handleProductUpdate} />
        </>
      </Modal>
    </>
  );
};

export default ShopsProducts;
