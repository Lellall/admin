import styled from 'styled-components';
import { Container, Typography, Button } from '@mui/material';
import { ViewportWidth } from '../../../../utils/enums';
import { StyledInput } from '../../../../components/Inputs/input';

export const Wrapper = styled.div`
  display: flex !important;
  background: #fff;
  flex-direction: column !important;
  gap: 10px !important;
  align-self: stretch !important;
  width: 100% !important;
  max-width: 1440px !important;
  position: fixed !important;
  height: 105px;
  margin-bottom: 400px !important;
  top: 0; /* Specify the distance from the top where the sticky element should stick */
  z-index: 1000;
  // color: #fff;

  .input-container {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 20px !important;
    align-self: stretch !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    padding: 20px 25px 0px 25px !important;
  }
`;

export const MainContainer = styled.div`
  display: flex !important;
  width: 100% !important;
  align-self: stretch !important;
  padding: 20px 80px !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-bottom: 1px solid #ececec !important;
  min-width: 100% !important;
  box-sizing: border-box;
  margin-bottom: 3rem;
  display: none;
  // color: #fff !important;

  .logo {
    width: 64px !important;
    height: 47.882px !important;
  }

  @media (max-width: ${ViewportWidth.md}px) {
    padding: 20px 40px !important;
  }
  @media (max-width: 768px) {
    .logo {
      width: 10px;
    }
  }
`;

export const MobileNav = styled(Container)`
  display: flex !important;
  padding: 16px 0px !important;
  flex-direction: row !important;
  gap: 20px !important;
  width: 100% !important;
  justify-content: space-between;
  align-items: center !important;
  box-sizing: border-box;

  .logo {
    width: 53.465px !important;
    height: 40px !important;
  }

  .container {
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
    gap: 15px !important;

    .cart {
      width: 24px !important;
      height: 24px !important;
      flex-shrink: 0 !important;
    }

    .menu {
      font-size: 24px;
    }
  }
`;

export const SubContainer = styled.div``;

export const ShopNav = styled(Button)`
  display: flex !important;
  padding: 5px 10px !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  text-transform: capitalize !important;
  gap: 5px !important;
  color: ${(props) =>
    props.active ? '#00A661' : 'rgba(47, 49, 63, 0.30)'} !important;
  background: ${(props) => (props.active ? '#EAFEF1' : '')} !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;

export const InputContainer = styled(Container)`
  display: flex !important;
  width: 45% !important;
  padding: 10px 12px !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 10px !important;
  flex-shrink: 0 !important;
  border-radius: 30px !important;
  border: 1px solid #ececec !important;
  background: #f8f9fa !important;

  .input {
    display: flex !important;
    align-items: center !important;
    flex-direction: row !important;
    gap: 8px !important;
    align-self: stretch !important;
  }
  .icon {
    font-size: 24px !important;
    color: #121d2b99 !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    width: 100% !important;
    padding: 10px 16px !important;
  }
`;

export const Input = styled(StyledInput)`
  color: rgba(18, 29, 43, 0.6) !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  background: transparent !important;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  .cart {
    cursor: pointer;
  }
`;

export const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledSelect = styled.select`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  background: red;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  font-family: Raleway !important;
  color: #0e5d37;
  cursor: pointer;
  background: url('/assets/arrow.svg') 96% / 15% no-repeat #fff;
  font-feature-settings: 'clig' off, 'liga' off;
  border: 0px solid #fff;
  padding: 5px;
  width: 70px;
  font-size: 16px;
  font-style: normal;
  line-height: 22px;
`;

export const SubText = styled(Typography)`
  // color: #fff !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 400 !important;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  // color: #fff;

  p {
    color: #2f313f;
    font-feature-settings: 'clig' off, 'liga' off;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }

  .active {
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 27.754px;
      height: 27.756px;
      flex-shrink: 0;
      border-radius: 27.756px;
      object-fit: contain;
    }

    p {
      font-family: Open Sans;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .inactive {
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .icon {
      font-size: 24px !important;
      color: #2f313f !important;
    }

    p {
      color: #2f313f;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Open Sans;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  width: 13px;
  height: 13px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #0e5d37;
  border-radius: 23px;
  position: absolute;
  top: 0;
  right: 0;

  p {
    color: #fff;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Raleway;
    font-size: 7px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
  }
`;

export const SearchInp = styled.input`
  width: 40%;
  height: 30px;
  display: flex;
  padding: 7px 12px 7px 20px;
  outline: none;
  border-radius: 4px;
  background: #f5f5f5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  &::placeholder {
    color: #ccc;
    // font-style: italic;
  }

  position: relative;
  @media (max-width: ${ViewportWidth.sm}px) {
    width: 90% !important;
    // padding: 10px 16px !important;
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  // color: #fff !important;
`;
export const Cover = styled.div`
  position: relative;
`;
