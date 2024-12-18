import styled from "styled-components"
import InvoiceCard from "./components/card"
import InvoiceCardList from "./components/invoiceCardList"
import { TabButton, TabContainer, TabPanel } from "@/components/tab.component"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import InvoiceHeader from "./components/InvoiceHeader"
import { useGetInvoicesQuery, useGetInvoicesStatsQuery } from "@/redux/orders"
import Pagination from "rc-pagination"
import ScreenLoader from "@/components/screen.loader"
import Skeleton from "react-loading-skeleton"
import EmptyState from "@/components/empty-state"

const Invoices = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("paid")
  const [page, setPage] = useState(1)

  const userStored = localStorage.getItem("user")
  const user = userStored ? JSON.parse(userStored) : ""
  const userId = user?.id
  const { shopId } = useParams()
  const { data, isLoading } = useGetInvoicesQuery({ restaurantId: shopId ?? "", page: page - 1 })
  const { data: stats } = useGetInvoicesStatsQuery({ restaurantId: shopId ?? "" })
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

        <>
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((el) => (
                <Skeleton key={el} count={1} style={{ minWidth: "302px" }} width="175px" height="189px" />
              ))}
            </>
          ) : (
            <Grid>
              <InvoiceCard title="Total Invoice" total={stats?.total ?? 0} type="total" />
              <InvoiceCard title="Total Paid Invoice" total={stats?.paid ?? 0} type="paid" />
              <InvoiceCard title="Total Pending Invoice" total={stats?.pending ?? 0} type="pending" />
              <InvoiceCard title="Total Failed Invoices" total={stats?.failed ?? 0} type="failed" />
            </Grid>
          )}
        </>

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
            ) : !data?.data.length ? (
              <>
                <EmptyState />
              </>
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
  @media (min-width: 942px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`
