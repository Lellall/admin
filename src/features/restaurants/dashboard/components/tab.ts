import styled from "styled-components"

export const TabContainer = styled.div`
  display: flex;
  background: #fff;
  padding: 10px;
  gap: 10px;
  background: transparent;
  width: 100%;
`

export const TabButton = styled.div<{ active: boolean }>`
  width: 60px;
  height: 30px;
  border-bottom: ${(props) => (props.active ? "1px solid #33A06C" : "none")};
  /* background: ${(props) => (props.active ? "#125f3a" : "#F3FAF5")}; */
  color: ${(props) => (props.active ? "#000" : "lightgrey")};
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  padding: 10px;
  display: flex;
  align-items: center;
`

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`
