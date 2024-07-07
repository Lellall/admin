import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import { ViewportWidth } from "../../../../utils/enums";

export const ModalTitle = styled(Typography)`
  color: #aaa !important;
  text-align: center !important;
  font-feature-settings: "clig" off, "liga" off !important;
  font-family: Raleway !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 20.87px !important;
`;

export const Header = styled(Box)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  align-self: stretch !important;

  .icon {
    font-size: 28px !important;
    cursor: pointer !important;
    color: #232323 !important;
  }
`;

export const ModalBody = styled(Box)`
  position: absolute !important;
  display: flex !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 34% !important;
  padding: ${(props) => props.pad ? props.pad : "53.933px 26.966px"} !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 20.225px !important;
  border-radius: 26.966px !important;
  background: #fcfcfc !important;
  box-sizing: border-box !important;

  @media (max-width: ${ViewportWidth.md}px) {
    width: 55% !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    padding: 40px 20px !important;
    gap: 15px !important;
    border-radius: 20px !important;
    width: 85% !important;
  }
`;
