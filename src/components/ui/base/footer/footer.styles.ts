import styled from 'styled-components';
import { Container, Typography, Button } from '@mui/material';
import { ViewportWidth } from '../../../../utils/enums';
import StyledInput from '../../../Inputs/input';

export const NewsLetter = styled(Container)`
  background: url('/assets/background.svg') !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: lightgray !important;
  position: relative !important;
  height: 33rem !important;
  width: 100% !important;
  object-fit: contain !important;
  max-width: 1440px !important;
  min-width: 100% !important;
  display: ${(props) => (props.show ? 'block' : 'none')} !important;

  .news-letter {
    display: flex !important;
    padding: 30px !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 30px !important;
    border-radius: 8px !important;
    background: #fcfcfc !important;
    margin: auto !important;
    width: calc(100vw - 44%) !important;
    box-shadow: 0px 20px 40px 0px rgba(32, 56, 85, 0.15) !important;
    position: absolute;
    left: 0;
    right: 0;
    box-sizing: border-box;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);

    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      text-align: center;
    }
  }

  @media (max-width: ${ViewportWidth.md}px) {
    height: 384px !important;

    .news-letter {
      padding: 21.333px !important;
      width: 65% !important;
      gap: 21.333px !important;
      border-radius: 5.689px !important;
      box-shadow: 0px 14.222px 28.444px 0px rgba(32, 56, 85, 0.15) !important;

      .text-container {
        gap: 8.533px;
      }
    }
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    height: 415px !important;

    .news-letter {
      width: 88% !important;
      padding: 20px !important;
      gap: 20px !important;
    }
  }
`;

export const Heading = styled(Typography)`
  color: #2f313f !important;
  text-align: center !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Raleway !important;
  font-size: 34px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 46px !important;

  @media (max-width: ${ViewportWidth.md}px) {
    font-size: 24px !important;
    line-height: 35px !important;
    text-transform: capitalize !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    font-size: 22px !important;
    line-height: 28px !important;
    text-transform: capitalize !important;
  }
`;

export const SubText = styled(Typography)`
  text-align: center !important;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 24px !important;

  @media (max-width: ${ViewportWidth.md}px) {
    font-size: ${(props) =>
      props.tabletSize ? props.tabletSize : '14px'} !important;
    line-height: 20px;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    font-size: ${(props) =>
      props.mobileSize ? props.mobileSize : '16px'} !important;
    line-height: 20px !important;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 8px 8px 8px 32px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  background: #f3f3f8;
  box-sizing: border-box;

  .container {
    display: flex;
    gap: 12px;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
  }

  @media (max-width: ${ViewportWidth.md}px) {
    padding: 5.689px 5.689px 5.689px 22.756px;
    gap: 8.533px;

    .container {
      gap: 8.533px;

      img {
        width: 14.222px;
        height: 14.222px;
      }
    }
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    flex-direction: column;
    padding: 0;
    background: #fff;
    gap: 20px;

    .container {
      background: #f3f3f8;
      display: flex;
      padding: 15px;
      border-radius: 8px;
      width: 100%;
      box-sizing: border-box;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Input = styled(StyledInput)`
  color: #9a9ea6;
  padding: 0 !important;
  background: transparent;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Open Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  @media (max-width: ${ViewportWidth.md}px) {
    font-size: 12px;
    line-height: 17.067px;
  }

  @media (max-width: ${ViewportWidth.md}px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const SubmitButton = styled(Button)`
  height: 48px !important;
  padding: 0px 38px !important;
  text-transform: capitalize !important;
  border-radius: 8px !important;
  background: #00a661 !important;
  color: #fff !important;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off !important;
  font-family: Open Sans !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 24px !important;
  box-sizing: border-box !important;

  @media (max-width: ${ViewportWidth.md}px) {
    height: 34.133px !important;
    padding: 0px 27.022px !important;
    border-radius: 5.689px !important;
    font-size: 12px !important;
    line-height: 17.067px !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    height: 48px !important;
    width: 100%;
    padding: 12px 87px !important;
    border-radius: 30px !important;
    font-size: 14px !important;
    line-height: 24px !important;
  }
`;

export const Wrapper = styled(Container)`
  display: flex !important;
  max-width: 1440px !important;
  width: 100% !important;
  padding: 40px 0px !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 57px !important;
  flex-shrink: 0 !important;
  background: #0e5d37 !important;
  box-sizing: border-box;
  min-width: 100% !important;

  @media (max-width: ${ViewportWidth.md}px) {
    gap: 5px !important;
    padding-bottom: 30px !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    gap: 5px !important;
    padding-bottom: 10px !important;
  }
`;

export const ButtomContainer = styled.div`
  display: flex;
  align-items: flex-start !important;
  flex-direction: row !important;
  gap: 80px !important;
  width: 85%;
  margin: 0 auto;
  justify-content: space-between;

  @media (max-width: ${ViewportWidth.md}px) {
    gap: 60px !important;
    flex-direction: column !important;
    width: 90%;
    margin-bottom: 30px;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    flex-direction: column !important;
    align-items: center;
    padding: 15px 0px;
    justify-content: center;
    gap: 30px !important;
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  width: 48%;

  @media (max-width: ${ViewportWidth.md}px) {
    width: 80%;
    margin: 0 auto;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 96%;
  }
`;

export const ColoredText = styled(SubText)`
  text-align: inherit !important;

  @media (max-width: ${ViewportWidth.md}px) {
    text-align: center !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    font-size: ${(props) =>
      props.mobileSize ? props.mobileSize : '14px'} !important;
    text-align: center !important;
    line-height: 20px !important;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
  width: 45% !important;
  box-sizing: border-box;

  @media (max-width: ${ViewportWidth.md}px) {
    width: 88% !important;
    margin: 0 auto;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    flex-direction: column;
    width: 100% !important;
  }
`;

export const NavContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: ${ViewportWidth.sm}px) {
    align-items: center;
    gap: 10px;
    border-bottom: 1px dashed #fff;
  }
`;

export const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;

  @media (max-width: ${ViewportWidth.sm}px) {
    flex-direction: row;
    padding: 0px 15px;
    gap: 15px;
    align-self: stretch;
  }
`;

export const SubHeading = styled(Typography)`
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 22px !important;
`;

export const StyledImage = styled.img`
  object-fit: cover;
  height: 23px;
  width: 120px;
`;
