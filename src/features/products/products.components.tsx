import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import EditForm from './product-edit-form';
import { TableBody } from '@mui/material';
import { Menu } from 'iconsax-react';
import { SearchInp } from '../../components/ui/base/navbar/navbar.styles';
import Modal from '../../components/modal';
import { useDebounce } from 'react-use';
import MiniLoader from '../../components/mini-loader';
import ScreenLoader from '../../components/screen-loader';
import { useGetProductsQuery } from '../../redux/products';
import { Table, TableHead, TableWrapper, TableDataCell, TableHeadCell, TableRow, TableHeadRow } from './product.style';
const Products = () => {
  const [current, setCurrent] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
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
  } = useGetProductsQuery({
    page: current - 1,
    size: 10,
    categoryId: '',
    filter: debouncedSearchTerm,
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
        <SearchInp
          type="text"
          placeholder="What are you looking for?"
          value={produtName}
          onChange={handleSearchChange}
        />
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
                    <TableHeadCell>Quantity</TableHeadCell>
                    <TableHeadCell>Available</TableHeadCell>
                    <TableHeadCell>category</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {products?.data?.map((product) => (
                    <TableRow key={product.id}>
                      <TableDataCell>{product.name}</TableDataCell>
                      <TableDataCell>{product.price}</TableDataCell>
                      <TableDataCell>{product.quantity}</TableDataCell>
                      <TableDataCell>{product.available ? 'Yes' : 'No'}</TableDataCell>
                      <TableDataCell>{product.category?.name}</TableDataCell>
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
      <Modal width="100%" style={{ maxWidth: '700px' }} show={isOpen} onClose={() => setIsOpen(false)}>
        Edit Product
        <hr />
        <EditForm product={selected} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default Products;
