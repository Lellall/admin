import styled from "styled-components";

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
  width: 20%;
  /* background: red; */
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr`
  font-size: 11px;
  padding: 20px;
  width: 100%;
  cursor: pointer;

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

export const ShopStatus = styled(TableDataCell)<{ status: "OPEN" | "CLOSE" }>`
  color: ${({ status }) => {
    switch (status) {
      case "OPEN":
        return "GREEN";
      case "CLOSE":
        return "RED";
      default:
        return "black";
    }
  }};
`;
