import styled from "styled-components"
import InvoiceCard from "./components/card"
import InvoiceCardList from "./components/invoiceCardList"
import { TabButton, TabContainer, TabPanel } from "@/components/tab.component"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import InvoiceHeader from "./components/InvoiceHeader"
import { useGetInvoicesQuery } from "@/redux/orders"
import Pagination from "rc-pagination"
import ScreenLoader from "@/components/screen.loader"
import Skeleton from "react-loading-skeleton"

const Invoices = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("paid")
  const [page, setPage] = useState(1)

  const userStored = localStorage.getItem("user")
  const user = userStored ? JSON.parse(userStored) : ""
  const userId = user?.id
  const { data, isLoading } = useGetInvoicesQuery({ restaurantId: userId, page: page - 1 })

  const handleTabSwitch = (value: string) => setActiveTab(value)

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const viewInvoice = () => {
    // templates/invoices
    navigate(`/restaurant/template/invoices/121`)
  }
  return (
    <>
      <>
        <InvoiceHeader />

        <Grid>
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((el) => (
                <Skeleton key={el} count={1} style={{ minWidth: "302px" }} width="175px" height="189px" />
              ))}
            </>
          ) : (
            <div className="grid grid-cols-1  lg:grid-cols-4 gap-6 items-center">
              <InvoiceCard title="Total Invoice" total={data?.resultTotal ?? 0} type="total" />
              <InvoiceCard title="Total Paid Invoice" total={data?.resultTotal ?? 0} type="paid" />
              <InvoiceCard title="Total Pending Invoice" total={data?.resultTotal ?? 0} type="pending" />
              <InvoiceCard title="Total Failed Invoices" total={data?.resultTotal ?? 0} type="failed" />
            </div>
          )}
        </Grid>

        <div>
          <TabContainer>
            <TabButton onClick={() => handleTabSwitch("paid")} active={activeTab === "paid"}>
              Paid
            </TabButton>
            <TabButton onClick={() => handleTabSwitch("pending")} active={activeTab === "pending"}>
              Pending
            </TabButton>
            <TabButton onClick={() => handleTabSwitch("failed")} active={activeTab === "failed"}>
              Failed
            </TabButton>
          </TabContainer>
        </div>

        <div className="bg-[#fff] p-3 mt-3 rounded-lg">
          <TabPanel active={activeTab === "paid"}>
            {isLoading ? (
              <ScreenLoader />
            ) : (
              data?.data?.map((invoice) => {
                return (
                  <InvoiceCardList
                    onClick={viewInvoice}
                    status="paid"
                    date={invoice.orderDate}
                    id="Invoice-ID"
                    price={20010}
                    title={invoice.consumerPhoneNumber}
                    key={invoice.invoiceId}
                  />
                )
              })
            )}

            <div style={{ float: "right", margin: "30px 0px", paddingBottom: "10p" }}>
              <Pagination onChange={handlePageClick} current={page} total={data?.resultTotal} />
            </div>
          </TabPanel>
          <TabPanel active={activeTab === "pending"}>
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="pending" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          </TabPanel>
          <TabPanel active={activeTab === "failed"}>
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="failed" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          </TabPanel>
        </div>
      </>
    </>
  )
}

export default Invoices

const Grid = styled.div`
  display: grid;
  gap: 10px;
  margin: 30px 0px;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 887px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`
