import { SetStateAction, useState } from "react";
import {
  HeadingContainer,
  HeadingText,
  TabContainer,
  StyledButton,
  MainContainer,
} from "./orders.style";
import Pagination from "rc-pagination";
import { useGetConsumerHistoryQuery } from "../../../redux/orders";
import EmptyState from "../../../components/empty-state";
import MiniLoader from "../../../components/mini-loader";
import { OrdersTable } from "./orders.table";

type Option = "PENDING" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELED";

const OrderHistory = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<Option>("PENDING");
  const { data, isFetching } = useGetConsumerHistoryQuery({
    page: page,
    size: 10,
    status,
  });

  const handleTabChange = (tabIndex: SetStateAction<number>, orderStatus: Option) => {
    setCurrentTab(tabIndex);
    setStatus(orderStatus);
    setPage(1);
  };

  const onChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <MainContainer>
      <HeadingContainer>
        <div className="flex items-center justify-between  w-full">
          <HeadingText>Order History</HeadingText>
          {isFetching ? <MiniLoader /> : ""}
        </div>
      </HeadingContainer>
      <TabContainer>
        <StyledButton
          onClick={() => handleTabChange(1, "PENDING")}
          active={currentTab === 1}
        >
          PENDING
        </StyledButton>
        <StyledButton
          onClick={() => handleTabChange(2, "ACCEPTED")}
          active={currentTab === 2}
        >
          ACCEPTED
        </StyledButton>
        <StyledButton
          onClick={() => handleTabChange(3, "ON_GOING")}
          active={currentTab === 3}
        >
          ON_GOING
        </StyledButton>
        <StyledButton
          onClick={() => handleTabChange(4, "COMPLETED")}
          active={currentTab === 4}
        >
          COMPLETED
        </StyledButton>
        <StyledButton
          onClick={() => handleTabChange(5, "CANCELED")}
          active={currentTab === 5}
        >
          CANCELED
        </StyledButton>
      </TabContainer>
      <>
        {data?.data?.length ? (
          <>
            <OrdersTable data={data?.data} />
            <Pagination
              onChange={onChangePage}
              current={page}
              total={data?.resultTotal}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          </>
        ) : (
          <>
            <EmptyState />
          </>
        )}
      </>
    </MainContainer>
  );
};
export default OrderHistory;
