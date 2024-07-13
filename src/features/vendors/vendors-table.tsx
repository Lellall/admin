import { Shop } from "../../redux/shops/typings";
import {
  Table,
  TableHead,
  TableWrapper,
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeadRow,
  TableRow,
  ShopStatus,
} from "./vendors.style";

interface VendorsTableProps {
  vendors: Shop[];
}

const VendorsTable = ({ vendors }: VendorsTableProps) => {
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            {/* <TableHeadCell>Action</TableHeadCell> */}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableDataCell>{vendor.name} </TableDataCell>
              <ShopStatus status={vendor.status}>{vendor.status} </ShopStatus>
              <TableDataCell>{vendor.category.name} </TableDataCell>
              <TableDataCell>{vendor.category.type} </TableDataCell>
              <TableDataCell>{vendor.category.description} </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default VendorsTable;
