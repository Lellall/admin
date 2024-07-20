import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { Order } from '../../redux/transaction/typings';

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

const Tag = styled.div`
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  font-size: 14px;
`;

const CustomTag = styled(Tag)`
  background: ${({ status }) => {
    switch (status) {
      case 'PENDING':
        return '#ffa6004a';
      case 'PROCESSING':
        return '#0000ff55';
      case 'COMPLETED':
        return '#00800063';
      default:
        return 'transparent';
    }
  }};
`;

const StatusTd = styled(Td)`
  color: ${({ status }) => {
    switch (status) {
      case 'PENDING':
        return 'orange';
      case 'PROCESSING':
        return 'blue';
      case 'COMPLETED':
        return 'green';
      default:
        return 'black';
    }
  }};
`;

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getFullYear()).slice(-2);
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
}
interface TransactionTableProps {
  transactions: Order[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {/* <Th>S/N</Th> */}
            <Th>User Name</Th>
            <Th>Amount</Th>
            <Th>Total Items</Th>
            <Th>Status</Th>
            {/* <Th> Platform</Th> */}
            <Th>Reference</Th>
            <Th>Date</Th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((order: Order) => (
            <tr key={order.id}>
              {/* <Td>{++index}</Td> */}
              <Td>
                {order.user.firstName} {order.user.lastName}{' '}
              </Td>
              <Td>{formatCurrency(order.amount)}</Td>
              <Td>{order.items.length}</Td>
              <StatusTd status={order.status}>
                <CustomTag status={order.status}>{order.status}</CustomTag>
              </StatusTd>
              {/* <Td>{order.paymentPlatform} </Td> */}
              <Td>{order.reference} </Td>
              <Td>{formatDate(order.createdAt)} </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
