import { useNavigate } from 'react-router-dom';
import { Shop } from '../../redux/shops/typings';
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
} from './vendors.style';
import { appPaths } from '../../components/layout/app-paths';
import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Menu as MenuIcon } from 'iconsax-react';
interface VendorsTableProps {
  vendors: Shop[];
}

const VendorsTable = ({ vendors }: VendorsTableProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewVendor = (id: string) => {
    navigate(appPaths.getVendors(id));
    handleClose();
  };
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            {/* <TableHeadCell>Description</TableHeadCell> */}
            <TableHeadCell>Action</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableDataCell>{vendor.name} </TableDataCell>
              <ShopStatus status={vendor.status}>{vendor.status} </ShopStatus>
              <TableDataCell>{vendor.category.name} </TableDataCell>
              <TableDataCell>{vendor.category.type} </TableDataCell>
              {/* <TableDataCell>{vendor.category.description} </TableDataCell> */}
              <TableDataCell>
                <button
                  style={{
                    textAlign: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={handleClick}>
                  <MenuIcon color="#FF8A65" size={16} />
                </button>
                <Menu
                  id="demo-customized-menu"
                  elevation={0}
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}>
                  <MenuItem style={{ fontSize: 'small' }} onClick={() => handleViewVendor(vendor.id)} disableRipple>
                    Edit Vendor
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: 'small' }}
                    onClick={() => {
                      navigate(`/vendors-products/${vendor.id}`);
                    }}
                    disableRipple>
                    View Products
                  </MenuItem>
                </Menu>
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default VendorsTable;
