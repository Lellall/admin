import styled from 'styled-components';
import { CopyAllOutlined } from '@mui/icons-material';

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
