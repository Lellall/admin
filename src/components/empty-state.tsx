import styled from 'styled-components';

const EmptyState = () => {
  return (
    <Empty>
      <img src="/assets/user-order.svg" alt="favorites" />
      <div className="text-container">
        <p className="bold">Empty for Now</p>
        <p>
          It looks like there’s nothing here right now— browse our store for some great finds or check back with us soon
        </p>
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
    width: 100%;

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
