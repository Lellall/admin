/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CopyAllOutlined } from "@mui/icons-material";
// import { useIncompleteStore } from './incompleteOrderStore';
import { Button, ListItem } from "@mui/material";
import { ArrowCircleDown } from "iconsax-react";
import { formatCurrency, formatDateTime } from "../../utils/helpers";
import AuthModal from "../../components/authmodal";
import { useIncompleteOrdersQuery } from "../../redux/orders";

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "#ffc107"; // Yellow
    case "COMPLETED":
      return "#28a745"; // Green
    case "CANCELLED":
      return "#dc3545"; // Red
    default:
      return "#333"; // Default color
  }
};

const OrderForRider = () => {
  const {
    data: incompleteOrders,

    error,
  } = useIncompleteOrdersQuery({ page: 1, size: 10, sort: "DESC" });

  const intervalIdRef = useRef<number>(0);
  const [expandedRow, setExpandedRow] = useState(null);
  //   const { refreshAccessTokenAdmin, logoutAdmin } = useAuth();
  const [selectedRow, setSelectedRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  console.log(incompleteOrders, "incompleteOrders");

  const handleComplete = (id) => {
    setOrderId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (error !== null) {
      // refreshAccessTokenAdmin()
    }
  }, [error]);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      //   fetchIncompleteOrders();
    }, 10000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  const toggleExpand = ({ id, ind }) => {
    setSelectedRow(ind);
    setExpandedRow((prevExpandedRow) => (prevExpandedRow === id ? null : id));
  };
  const copyInfo = (customer, productName, address, phoneNumber) => {
    const info = `Customer: ${customer}\nProducts: ${productName.map(
      (p) => `${p.productName} quantinty:${p.count}`
    )}\nAddress: ${address.streetName}, ${address.estate}, ${
      address.poBox
    }\nPhone Number: ${phoneNumber}`;
    navigator.clipboard.writeText(info);
  };

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
                <TableRow onClick={() => toggleExpand({ id: item.id, ind })}>
                  <TableDataCell>{item.reference}</TableDataCell>
                  <TableDataCell style={{ color: getStatusColor(item.status) }}>
                    {item.status === "COMPLETED" ? "PAID ORDER" : item.status}
                  </TableDataCell>
                  <TableDataCell>{formatCurrency(item.amount)}</TableDataCell>
                  <TableDataCell>{item.userId}</TableDataCell>
                  <TableDataCell>{item.orderId}</TableDataCell>
                  <TableDataCell>
                    {formatDateTime(item.createdAt)}
                  </TableDataCell>
                  <TableDataCell>
                    <Button>
                      <ArrowCircleDown size="32" color="#00a661" />
                    </Button>
                  </TableDataCell>
                </TableRow>
                {expandedRow === item.id && (
                  <ExpandableRow>
                    <ExpandableDataCell colSpan="7">
                      <Content>
                        <div>
                          <h4>Items</h4>
                          <ul>
                            <ListItem>Customer: {item.customerName}</ListItem>
                            {item.items.map((product, idx) => (
                              <div key={product.productId}>
                                <ListItem>
                                  Product {idx + 1}: {product.productName} -
                                  Quantity {product.count}
                                </ListItem>
                              </div>
                            ))}
                            <ListItem>
                              Address: {item.address?.streetName},{" "}
                              {item.address?.estate},{" "}
                              {item.address?.ListItemoBox}
                            </ListItem>
                            <ListItem>
                              Phone Number: {item.phoneNumber}
                            </ListItem>
                          </ul>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Button
                            onClick={() => handleComplete(item.orderId)}
                            style={{ height: "40px", marginLeft: "5px" }}
                          >
                            Complete this Order
                          </Button>
                        </div>
                      </Content>
                      <InteractiveIcon
                        onClick={() =>
                          copyInfo(
                            item.customerName,
                            incompleteOrders[selectedRow].items.map((i) => i),
                            incompleteOrders[selectedRow].address,
                            incompleteOrders[selectedRow].phoneNumber
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
      {false && (
        <AuthModal onClose={() => setShowModal(false)}>
          <p style={{ marginBottom: "10px" }}>
            Are sure you want to complete this order?
          </p>
          <Button
            backgroundColor="#0E5D37"
            onClick={() => setShowModal(false)}
            // loading={loading}
            // spaceTop="10px"
            spaceBottom="10px"
          >
            No
          </Button>
          <Button
            backgroundColor="#F06D06"
            // onClick={() => completeOrder(orderId)}
            loading={loading}
            spaceTop="10px"
            spaceBottom="10px"
            style={{ backgroundColor: "red", color: "white", border: "none" }}
          >
            {/* {loading ? 'Completing order...' : 'Yes'} */}
          </Button>
        </AuthModal>
      )}
    </div>
  );
};

export default OrderForRider;

export const TableWrapper = styled.div`
  width: 100%;
  font-family: Arial, sans-serif;
  //   border: 1px solid #ccc;
  overflow: hidden;
  //   margin: 70px ;
  //   margin-top:140px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
  width: 100%;
`;

export const TableHeadRow = styled.tr`
  width: 100%;
`;

export const TableHeadCell = styled.th`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 300;
  padding: 20px;
  text-align: left;
  width: 100%;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr`
  font-size: 11px;
  padding: 20px;
  width: 100%;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableDataCell = styled.td`
  padding: 20px;
  border-top: 1px solid #ccc;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const ExpandableRow = styled.tr`
  background-color: #eafef1;
  color: #00a661;
`;

export const ExpandableDataCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

export const InteractiveIcon = styled(CopyAllOutlined)`
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: red;
  }
`;
export const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: 200px;
`;
