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
  const [currentVendor, setCurrentVendor] = useState<Shop | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, vendor: Shop) => {
    setAnchorEl(event.currentTarget);
    setCurrentVendor(vendor);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentVendor(null);
  };

  const handleEditVendor = (vendor: Shop) => {
    navigate(`${appPaths.getVendors(vendor.id)}`);
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
            <TableHeadCell>Action</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableDataCell>{vendor.name}</TableDataCell>
              <ShopStatus status={vendor.status}>{vendor.status}</ShopStatus>
              <TableDataCell>{vendor.category.name}</TableDataCell>
              <TableDataCell>{vendor.category.type}</TableDataCell>
              <TableDataCell>
                <button
                  style={{
                    textAlign: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={(event) => handleClick(event, vendor)}>
                  <MenuIcon color="#FF8A65" size={16} />
                </button>
                <Menu
                  id="demo-customized-menu"
                  elevation={0}
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && currentVendor === vendor)}
                  onClose={handleClose}>
                  <MenuItem style={{ fontSize: 'small' }} onClick={() => handleEditVendor(vendor)} disableRipple>
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
