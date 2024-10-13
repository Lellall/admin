import styled from "styled-components"

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  padding: 10px;
  width: 100%;
`

export const TabButton = styled.div<{ active: boolean }>`
  width: 33%;
  max-width: 200px;
  height: 30px;
  border-right: ${(props) => (props.active ? "none" : "1px solid #bfc0c0")};
  border-radius: 5px;
  background: ${(props) => (props.active ? "#125f3a" : "#F3FAF5")};
  color: ${(props) => (props.active ? "#fff" : "#4F5D75")};
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;

  /* &:last-child {
    flex-grow: 1;
    border-right: none;
    border-bottom-right-radius: 0;
  } */
`

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`
