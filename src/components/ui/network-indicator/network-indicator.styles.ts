import styled from "styled-components";

type NetworkIndicatorWrapperProps = {
  isOnline: boolean;
};
export const NetworkIndicatorWrapper = styled.div<NetworkIndicatorWrapperProps>`
  position: fixed;
  z-index: 9000;
  /* bottom: 0; */
  top: 0;
  
  left: 0;
  width: 100vw;
  padding: 0.5em 1em;
  text-align: center;
  background: ${(p) => (p.isOnline ? "green" : "black")};
  color: ${(p) => (p.isOnline ? "white" : "red")};
`;
