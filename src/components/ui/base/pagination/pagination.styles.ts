import styled from "styled-components";
import { ViewportWidth } from "../../../../utils/enums";

export const PageRange = styled.div`
  display: flex;
  padding: 0px 80px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  .pagination-item {
    width: 40px;
    height: 40px;
    border: 1px solid #f1f1f1;
    text-align: center;
    padding: 0 12px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    font-feature-settings: "clig" off, "liga" off;
    border-radius: 50px;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    line-height: 16px;
    cursor: pointer;
  }

  .active {
    color: #000000;
  }

  .disabled {
    pointer-events: none;
    color: #888888;

    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }

  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }

  .selected {
    background-color: #f06d06;
    color: #fff;
  }

  .unselected {
    color: #888;
  }

  @media (max-width: ${ViewportWidth.md}px) {
    padding: 0px 40px;
    gap: 7.132px;

    .pagination-item {
      width: 30px;
      height: 30px;
      padding: 0;
      font-size: 10px;
      line-height: 11.411px;
    }
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    padding: 0px;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;
    margin: 0 auto;
  }
`;
