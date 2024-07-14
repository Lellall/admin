import styled from 'styled-components';
import { Typography, Box, Button } from '@mui/material';
// import { ViewportWidth } from "../../../utils/enums";

export const MainContainer = styled(Box)`
  display: flex !important;

  flex-direction: column !important;
  width: 100% !important;
`;

export const HeadingContainer = styled(Box)`
  display: flex !important;
  padding: 16px !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 8px !important;
  align-self: stretch !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.93) !important;
`;

export const HeadingText = styled(Typography)`
  color: #2f313f !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Raleway !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 28px !important;
`;

export const TabContainer = styled(Box)`
  display: flex !important;
  padding: 16px !important;

  align-items: flex-start !important;
  gap: 8px !important;
  align-self: stretch !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.93) !important;
`;

export const StyledButton = styled(Button)`
  display: flex !important;
  padding: 5px 10px !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 5px !important;
  background: ${(props) => (props.active ? '#EAFEF1' : '')} !important;
  color: ${(props) => (props.active ? '#00A661' : '#ccc')} !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  text-transform: capitalize !important;
  border-radius: 0 !important;
`;

export const EmptyState = styled(Box)`
  display: flex !important;
  padding: 40px 16px !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 20px !important;
  align-self: stretch !important;

  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    p {
      color: #2f313f;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .bold {
      font-weight: 600 !important;
    }
  }
`;
