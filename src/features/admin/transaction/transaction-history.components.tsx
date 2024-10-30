import { useState } from "react"

import Pagination from "rc-pagination"
import styled from "styled-components"
import Select from "react-select"
import { HeadingContainer, HeadingText, EmptyState, MainContainer } from "./transaction.style"
import TransactionTable from "./tansaction-table"
import { useGetTransactionQuery } from "@/redux/transaction"
import ScreenLoader from "@/components/screen.loader"

type Option = {
  value: "PENDING" | "FAILED" | "COMPLETED"
  label: string
}

const options: Option[] = [
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
  { value: "COMPLETED", label: "Completed" },
]
function Transaction() {
  const [page, setPage] = useState(1)
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: "COMPLETED",
    label: "Completed",
  })

  const { data, isLoading, isFetching } = useGetTransactionQuery({
    page,
    size: 10,
    status: selectedOption.value,
    userId: "",
  })
  // const { data: transactionHistory, resultTotal } = data;

  const onChange = (pageNumber: number) => {
    setPage(pageNumber)
  }
  const handleSelectChange = (option: Option) => {
    setSelectedOption(option)
  }

  if (isLoading) {
    return <ScreenLoader style={{ height: "60vh" }} />
  }

  return (
    <MainContainer>
      <HeadingContainer>
        <HeadingText>Transaction History</HeadingText>
        <div>
          <StyledSelect
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="Select Status"
            isLoading={isFetching}
          />
        </div>
      </HeadingContainer>

      {data?.data?.length ? (
        <>
          <TransactionTable transactions={data?.data} />

          <Pagination
            onChange={onChange}
            current={page}
            total={data.resultTotal}
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </>
      ) : (
        <EmptyState>
          <img src="/assets/user-order.svg" alt="favorites" />
          <div className="text-container">
            <p className="bold">Nothing Yet!</p>
            <p>All your Closed Orders will be saved here.</p>
          </div>
        </EmptyState>
      )}
    </MainContainer>
  )
}

export default Transaction

const StyledSelect = styled(Select)`
  width: 200px;
  font-size: 11px;
`
