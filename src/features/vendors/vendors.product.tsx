/* eslint-disable no-console */
import React, { useState } from 'react';
import Pagination from 'rc-pagination';
// import EditForm from './product-edit-form';
import { TableBody } from '@mui/material';
import { Menu } from 'iconsax-react';
// import { SearchInp } from '../../components/ui/base/navbar/navbar.styles';
import Modal from '../../components/modal';
import { useDebounce } from 'react-use';
import MiniLoader from '../../components/mini-loader';
import ScreenLoader from '../../components/screen-loader';
import { Table, TableHead, TableWrapper, TableDataCell, TableHeadCell, TableRow, TableHeadRow } from './vendors.style';
import SearchInput from '../../components/Inputs/searchInput';
import VendorsProductForm from './vendors-product.form';
import { useGetShopProductsQuery } from '../../redux/shops/shops.api';
import { useParams } from 'react-router-dom';

const VendorsProducts = () => {
  const [current, setCurrent] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const [produtName, setProductName] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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

  const [selected, setSelected] = useState(null);

  const handlePageClick = (page: number) => {
    setCurrent(page);
  };

  const openMenu = (product: any) => {
    setSelected(product);
    setIsOpen(true);
    // openView();
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setProductName(event.target.value);
  };
  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInput placeholder="What are you looking for?" value={produtName} onChange={handleSearchChange} />
        {isFetching && <MiniLoader />}
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
                    {/* <TableHeadCell>Available</TableHeadCell> */}
                    {/* <TableHeadCell>category</TableHeadCell> */}
                    <TableHeadCell>Action</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {products?.data?.map((product) => (
                    <TableRow key={product.id}>
                      <TableDataCell>{product?.name}</TableDataCell>
                      <TableDataCell>{product?.price}</TableDataCell>
                      <TableDataCell>{product?.description}</TableDataCell>
                      {/* <TableDataCell>{product?.available ? 'Yes' : 'No'}</TableDataCell> */}
                      {/* <TableDataCell>{product?.category?.name}</TableDataCell> */}
                      <TableDataCell>
                        <button
                          style={{
                            textAlign: 'center',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => openMenu(product)}>
                          <Menu size="16" color="#FF8A65" />
                        </button>
                      </TableDataCell>
                    </TableRow>
                  ))}
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
        style={{ maxWidth: '700px', margin: 'auto' }}
        show={isOpen}
        onClose={() => setIsOpen(false)}>
        <>
          <VendorsProductForm product={selected} setIsOpen={setIsOpen} />
        </>
      </Modal>
    </>
  );
};

export default VendorsProducts;
