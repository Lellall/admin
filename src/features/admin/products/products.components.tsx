/* eslint-disable no-console */
import React, { useState } from "react"
import Pagination from "rc-pagination"
import { TableBody } from "@mui/material"
import { Menu } from "iconsax-react"
// import { SearchInp } from '../../components/ui/base/navbar/navbar.styles';
import { useDebounce } from "react-use"
import EditForm from "./product-edit-form"
import {
    Table,
    TableHead,
    TableWrapper,
    TableDataCell,
    TableHeadCell,
    TableRow,
    TableHeadRow,
} from "./product.style"
import { useGetProductsQuery } from "@/redux/products"
import SearchInput from "@/components/Inputs/searchInput"
import MiniLoader from "@/components/mini-loader"
import ScreenLoader from "@/components/screen.loader"
import EmptyState from "@/components/empty-state"
import Modal from "@/components/modal"

function Products() {
    const [current, setCurrent] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [produtName, setProductName] = useState<string>("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
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
        size: 10,
        filter: debouncedSearchTerm,
        categoryId: "",
    })

    const [selected, setSelected] = useState(null)

    const handlePageClick = (page: number) => {
        setCurrent(page)
    }

    const openMenu = (product: any) => {
        setSelected(product)
        setIsOpen(true)
        // openView();
    }

    const handleSearchChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setProductName(event.target.value)
    }

    return (
        <>
            <div className="flex justify-between w-full items-center  ">
                <SearchInput
                    placeholder="What are you looking for?"
                    value={produtName}
                    onChange={handleSearchChange}
                />
                {isFetching && <MiniLoader />}
            </div>

            {isLoading ? (
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
                                        <TableHeadCell>Quantity</TableHeadCell>
                                        <TableHeadCell>Available</TableHeadCell>
                                        <TableHeadCell>category</TableHeadCell>
                                        <TableHeadCell>Action</TableHeadCell>
                                    </TableHeadRow>
                                </TableHead>
                                <TableBody>
                                    {!products?.data?.length ? (
                                        <TableRow>
                                            <TableDataCell
                                                colSpan={6}
                                                style={{ height: "40vh" }}
                                            >
                                                <EmptyState />
                                            </TableDataCell>
                                        </TableRow>
                                    ) : (
                                        products?.data?.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableDataCell>
                                                    {product.name}
                                                </TableDataCell>
                                                <TableDataCell>
                                                    {product.price}
                                                </TableDataCell>
                                                <TableDataCell>
                                                    {product.quantity}
                                                </TableDataCell>
                                                <TableDataCell>
                                                    {product.available
                                                        ? "Yes"
                                                        : "No"}
                                                </TableDataCell>
                                                <TableDataCell>
                                                    {product.category?.name}
                                                </TableDataCell>
                                                <TableDataCell>
                                                    <button
                                                        type="button"
                                                        style={{
                                                            textAlign: "center",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            padding: "6px",
                                                        }}
                                                        onClick={() =>
                                                            openMenu(product)
                                                        }
                                                        aria-label="Open product menu"
                                                    >
                                                        <Menu
                                                            size="16"
                                                            color="#FF8A65"
                                                        />
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
                        {products?.data?.length ? (
                            <Pagination
                                onChange={handlePageClick}
                                current={current}
                                total={products?.resultTotal}
                            />
                        ) : null}
                    </div>
                </>
            )}
            <Modal
                width="100%"
                title="Edit Product"
                style={{ maxWidth: "700px", margin: "auto" }}
                show={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <EditForm product={selected} setIsOpen={setIsOpen} />
            </Modal>
        </>
    )
}

export default Products
