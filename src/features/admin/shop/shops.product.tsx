import Pagination from "rc-pagination";
import { TableBody } from "@mui/material";
import { Menu } from "iconsax-react";
import {
  Table,
  TableHead,
  TableWrapper,
  TableDataCell,
  TableHeadCell,
  TableRow,
  TableHeadRow,
} from "./shops.style";
import { useShop } from "./shop.controller";
import ScreenLoader from "@/components/screen-loader";
import SearchInput from "@/components/Inputs/searchInput";
import MiniLoader from "@/components/mini-loader";
import EmptyState from "@/components/empty-state";
import Modal from "@/components/modal";
import ShopsProductForm from "./shops-product.form";

const ShopsProducts = () => {
  const { actions, loading, variables } = useShop();
  const {
    fetchingProducts,
    loadingProduct,
    loadingProducts,
    updatingProduct,
    addingProduct,
  } = loading;
  const { produtName, product, page, products, isAddModalOpen, isEditModalOpen } =
    variables;

  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInput
          placeholder="What are you looking for?"
          value={produtName}
          onChange={actions.handleSearchChange}
        />
        {fetchingProducts && <MiniLoader />}
        <button
          className="bg-[#F06D04] p-1 m-3 rounded-sm shadow-lg"
          onClick={() => actions.setIsAdddModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      {loadingProducts ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <>
          <div style={{ width: "100%" }}>
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
                      <TableDataCell colSpan={6} style={{ height: "40vh" }}>
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
                              textAlign: "center",
                              border: "none",
                              cursor: "pointer",
                              padding: "8px",
                            }}
                            onClick={() => actions.openProductModal(product)}
                          >
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
          <div style={{ float: "right", margin: "10px" }}>
            <Pagination
              onChange={actions.handlePageClick}
              current={page}
              total={products?.resultTotal}
            />
          </div>
        </>
      )}
      <Modal
        width="100%"
        title="Edit Product"
        style={{ maxWidth: "700px", width: "90%", margin: "auto", overflowY: "auto" }}
        show={isEditModalOpen}
        onClose={actions.closeProductModal}
      >
        <>
          <ShopsProductForm
            loading={updatingProduct}
            fetching={loadingProduct}
            data={product}
            onSubmit={actions.handleProductUpdate}
          />
        </>
      </Modal>
      <Modal
        width="100%"
        title="Add Product"
        style={{ maxWidth: "700px", width: "90%", margin: "auto", overflowY: "auto" }}
        show={isAddModalOpen}
        onClose={actions.closeProductModal}
      >
        <>
          <ShopsProductForm
            loading={addingProduct}
            data={null}
            onSubmit={actions.handleAddProduct}
          />
        </>
      </Modal>
    </>
  );
};

export default ShopsProducts;
