import styled from "styled-components";

const EmptyState = () => {
  return (
    <Empty>
      <img src="/assets/user-order.svg" alt="favorites" />
      <div className="text-container">
        <p className="bold">Nothing Yet!</p>
        <p>All your Closed Orders will be saved here.</p>
      </div>
    </Empty>
  );
};

export default EmptyState;

export const Empty = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    p {
      color: #2f313f;
      font-feature-settings: "clig" off, "liga" off;
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
