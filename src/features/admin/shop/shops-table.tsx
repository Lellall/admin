import { useNavigate } from "react-router-dom";
import { Shop } from "../../../redux/shops/typings";
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
} from "./shops.style";
import { appPaths } from "../../../components/layout/app-paths";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Menu as MenuIcon } from "iconsax-react";

interface ShopsTableProps {
  shops: Shop[];
}

const ShopsTable = ({ shops }: ShopsTableProps) => {
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
    navigate(`${appPaths.getShops(vendor.id)}`);
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
          {shops?.map((shop) => (
            <TableRow key={shop.id}>
              <TableDataCell>{shop.name}</TableDataCell>
              <ShopStatus status={shop.status}>{shop.status}</ShopStatus>
              <TableDataCell>{shop.category.name}</TableDataCell>
              <TableDataCell>{shop.category.type}</TableDataCell>
              <TableDataCell>
                <button
                  style={{
                    textAlign: "center",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                  onClick={(event) => handleClick(event, shop)}
                >
                  <MenuIcon color="#FF8A65" size={16} />
                </button>
                <Menu
                  id="demo-customized-menu"
                  elevation={0}
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && currentVendor === shop)}
                  onClose={handleClose}
                >
                  <MenuItem
                    style={{ fontSize: "small" }}
                    onClick={() => handleEditVendor(shop)}
                    disableRipple
                  >
                    Edit Vendor
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "small" }}
                    onClick={() => {
                      navigate(`/shops-products/${shop.id}`);
                    }}
                    disableRipple
                  >
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

export default ShopsTable;
