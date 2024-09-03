import React, { useEffect, useState } from "react"
import { Button, ListItem } from "@mui/material"
import { ArrowCircleDown } from "iconsax-react"
import {
    Table,
    TableHead,
    TableWrapper,
    Content,
    TableBody,
    TableDataCell,
    TableHeadRow,
    TableHeadCell,
    TableRow,
    ExpandableDataCell,
    ExpandableRow,
    InteractiveIcon,
} from "./orders.style"
import {
    useCompleteOrderMutation,
    useIncompleteOrdersQuery,
} from "@/redux/orders"
import EmptyState from "@/components/empty-state"
import ScreenLoader from "@/components/screen.loader"
import { formatCurrency, formatDateTime } from "@/utils/helpers"
import AuthModal from "@/components/auth-modal"

// export const copyToClipboard = (text:string) => {
//   navigator.clipboard.writeText(text);
// };

const getStatusColor = (status: string) => {
    switch (status) {
        case "PENDING":
            return "#ffc107" // Yellow
        case "COMPLETED":
            return "#28a745" // Green
        case "CANCELLED":
            return "#dc3545" // Red
        default:
            return "#333" // Default color
    }
}

function OrderForRider() {
    const {
        data: incompleteOrders,
        isLoading,
        error,
        refetch,
    } = useIncompleteOrdersQuery({ page: 1, size: 10, sort: "DESC" })
    const [completeOrder, { isLoading: isCompleting, isSuccess }] =
        useCompleteOrderMutation()
    // const intervalIdRef = useRef(0);
    const [expandedRow, setExpandedRow] = useState(null)
    //   const { refreshAccessTokenAdmin, logoutAdmin } = useAuth();
    const [, setSelectedRow] = useState<any>(0)
    const [showModal, setShowModal] = useState(false)
    const [orderId, setOrderId] = useState("")

    useEffect(() => {
        if (isSuccess) {
            setShowModal(false)
        }
    }, [isSuccess])

    const handleComplete = (id: string) => {
        setOrderId(id)
        setShowModal(true)
    }

    useEffect(() => {
        if (error !== null) {
            // refreshAccessTokenAdmin()
        }
    }, [error])

    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [refetch])

    const toggleExpand = ({ id, ind }: { id: string; ind: number }) => {
        setSelectedRow(ind)
        setExpandedRow((prevExpandedRow: any) =>
            prevExpandedRow === id ? null : id
        )
    }
    const copyInfo = (
        customer: string,
        productName: { productName: string; count: number }[],
        address: {
            streetName: string
            estate: string | null
            poBox: string | null
        },
        phoneNumber: string
    ) => {
        const info = `Customer: ${customer}\nProducts: ${productName
            .map((p) => `${p.productName} quantity: ${p.count}`)
            .join("\n")}\nAddress: ${address.streetName}, ${address.estate}, ${
            address.poBox || ""
        }\nPhone Number: ${phoneNumber}`

        navigator.clipboard.writeText(info)
    }

    if (!incompleteOrders?.data?.length) {
        return <EmptyState />
    }

    if (isLoading) {
        return <ScreenLoader />
    }
    return (
        <div style={{ width: "100%" }}>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableHeadRow>
                            <TableHeadCell>Reference</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell>Amount</TableHeadCell>
                            <TableHeadCell>User ID</TableHeadCell>
                            <TableHeadCell>Order ID</TableHeadCell>
                            <TableHeadCell>Created At</TableHeadCell>
                            <TableHeadCell>Action</TableHeadCell>
                        </TableHeadRow>
                    </TableHead>
                    <TableBody>
                        {incompleteOrders?.data?.map((item, ind) => (
                            <React.Fragment key={item.id}>
                                <TableRow
                                    onClick={() =>
                                        toggleExpand({ id: item.id, ind })
                                    }
                                >
                                    <TableDataCell>
                                        {item.reference}
                                    </TableDataCell>
                                    <TableDataCell
                                        style={{
                                            color: getStatusColor(item.status),
                                        }}
                                    >
                                        {item.status === "COMPLETED"
                                            ? "PAID ORDER"
                                            : item.status}
                                    </TableDataCell>
                                    <TableDataCell>
                                        {formatCurrency(item.amount)}
                                    </TableDataCell>
                                    <TableDataCell>{item.userId}</TableDataCell>
                                    <TableDataCell>
                                        {item.orderId}
                                    </TableDataCell>
                                    <TableDataCell>
                                        {formatDateTime(item.createdAt)}
                                    </TableDataCell>
                                    <TableDataCell>
                                        <Button>
                                            <ArrowCircleDown
                                                size="32"
                                                color="#00a661"
                                            />
                                        </Button>
                                    </TableDataCell>
                                </TableRow>

                                {expandedRow === item.id && (
                                    <ExpandableRow>
                                        <ExpandableDataCell colSpan={7}>
                                            <Content>
                                                <div>
                                                    <h4>Items</h4>
                                                    <ul>
                                                        <ListItem>
                                                            Customer:{" "}
                                                            {item.customerName}
                                                        </ListItem>
                                                        {item.items.map(
                                                            (product, idx) => (
                                                                <div
                                                                    key={
                                                                        product.productId
                                                                    }
                                                                >
                                                                    <ListItem>
                                                                        Product{" "}
                                                                        {idx +
                                                                            1}
                                                                        :{" "}
                                                                        {
                                                                            product.productName
                                                                        }{" "}
                                                                        -
                                                                        Quantity{" "}
                                                                        {
                                                                            product.count
                                                                        }
                                                                    </ListItem>
                                                                </div>
                                                            )
                                                        )}
                                                        <ListItem>
                                                            Address:{" "}
                                                            {
                                                                item.address
                                                                    ?.streetName
                                                            }
                                                            ,{" "}
                                                            {
                                                                item.address
                                                                    ?.estate
                                                            }
                                                            ,{" "}
                                                            {
                                                                item.address
                                                                    ?.poBox
                                                            }
                                                        </ListItem>
                                                        <ListItem>
                                                            Phone Number:{" "}
                                                            {item.phoneNumber}
                                                        </ListItem>
                                                    </ul>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            handleComplete(
                                                                item.orderId
                                                            )
                                                        }
                                                        style={{
                                                            height: "40px",
                                                            marginLeft: "5px",
                                                        }}
                                                    >
                                                        Complete this Order
                                                    </Button>
                                                </div>
                                            </Content>
                                            <InteractiveIcon
                                                onClick={() =>
                                                    copyInfo(
                                                        item.customerName,
                                                        item.items,
                                                        item.address,
                                                        item.phoneNumber
                                                    )
                                                }
                                            />
                                        </ExpandableDataCell>
                                    </ExpandableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
            {showModal && (
                <AuthModal onClose={() => setShowModal(false)}>
                    <p style={{ marginBottom: "30px" }}>
                        Are sure you want to complete this order?
                    </p>
                    <Button
                        onClick={() => setShowModal(false)}
                        style={{ background: "#0E5D37", marginTop: "0px" }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => completeOrder({ id: orderId })}
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            margin: "0px 20px",
                        }}
                    >
                        {isCompleting ? "Completing order..." : "Yes"}
                    </Button>
                </AuthModal>
            )}
        </div>
    )
}

export default OrderForRider
