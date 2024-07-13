import React from "react";
import styled from "styled-components";
import { ConsumerOrderHistory } from "../../redux/orders/typings";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

interface StyledStatusProps {
  status?: "PENDING" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELED";
}

const StatusTd = styled(Td)<StyledStatusProps>`
  color: ${({ status }) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "ON_GOING":
        return "blue";
      case "COMPLETED":
        return "green";
      default:
        return "black";
    }
  }};
`;
interface OrdersTableProps {
  data: ConsumerOrderHistory[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Product Name</Th>
            <Th>Status</Th>
            <Th>Price</Th>
            <Th>Distance</Th>
            <Th> Items</Th>
            {/* <Th>Action</Th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((order) => (
            <tr key={order.orderId}>
              <Td>{order.paymentItems[0].productName}</Td>
              <StatusTd status={order.status}>{order.status}</StatusTd>
              <Td>&#x20A6;{order.paymentItems[0].price}</Td>
              <Td>{order.distance} km</Td>
              <StatusTd style={{ cursor: "pointer" }}>
                {" "}
                {order.paymentItems.length}
              </StatusTd>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
