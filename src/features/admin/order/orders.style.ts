import styled from "styled-components"
import { Typography, Box, Button } from "@mui/material"
import { CopyAllOutlined } from "@mui/icons-material"
// import { ViewportWidth } from "../../../utils/enums";

export const MainContainer = styled(Box)`
  display: flex !important;

  flex-direction: column !important;
  width: 100% !important;
`

export const HeadingContainer = styled(Box)`
  display: flex !important;
  padding: 16px !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: flex-start !important;
  gap: 8px !important;
  align-self: stretch !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.93) !important;
`

export const HeadingText = styled(Typography)`
  color: #2f313f !important;
  font-feature-settings:
    "clig" off,
    "liga" off !important;
  font-family: Raleway !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 28px !important;
`

export const TabContainer = styled(Box)`
  display: flex !important;
  padding: 16px !important;

  align-items: flex-start !important;
  gap: 8px !important;
  align-self: stretch !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.93) !important;
`
interface StyledButtonProps {
  active?: boolean // Define the 'active' prop here
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex !important;
  padding: 5px 10px !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 5px !important;
  background: ${(props) => (props.active ? "#EAFEF1" : "")} !important;
  color: ${(props) => (props.active ? "#00A661" : "#ccc")} !important;
  font-feature-settings:
    "clig" off,
    "liga" off !important;
  font-family: Open Sans !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  text-transform: capitalize !important;
  border-radius: 0 !important;
`

export const TableWrapper = styled.div`
  width: 100%;
  font-family: Arial, sans-serif;
  //   border: 1px solid #ccc;
  overflow: hidden;
  //   margin: 70px ;
  //   margin-top:140px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHead = styled.thead`
  background-color: #f2f2f2;
  width: 100%;
`

export const TableHeadRow = styled.tr`
  width: 100%;
`

export const TableHeadCell = styled.th`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 300;
  padding: 20px;
  text-align: left;
  width: 100%;
`

export const TableBody = styled.tbody`
  width: 100%;
`

export const TableRow = styled.tr`
  font-size: 11px;
  padding: 20px;
  width: 100%;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`

export const TableDataCell = styled.td`
  padding: 20px;
  border-top: 1px solid #ccc;
  word-break: break-word;
  white-space: pre-wrap;
`

export const ExpandableRow = styled.tr`
  background-color: #eafef1;
  color: #00a661;
`

export const ExpandableDataCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`

export const InteractiveIcon = styled(CopyAllOutlined)`
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: red;
  }
`
export const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: 200px;
`
