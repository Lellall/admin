import Text from "@/components/text/Text"
import styled from "styled-components"
import InvoiceCard from "./components/card"
import InvoiceCardList from "./components/invoiceCardList"
import { TabButton, TabContainer, TabPanel } from "@/components/tab.component"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import InvoiceHeader from "./components/InvoiceHeader"
// import { appPaths } from "@/components/layout/app-paths"

const Invoices = () => {
  const [activeTab, setActiveTab] = useState("paid")
  const handleTabSwitch = (value: string) => setActiveTab(value)
  const navigate = useNavigate()

  const viewInvoice = () => {
    navigate(`/restaurant/invoices/121`)
  }
  return (
    <>
      <Container>
        <InvoiceHeader />

        <div className="grid grid-cols-2 gap-5 mt-5 mb-5">
          <InvoiceCard title="Total Invoice" total={200000} type="total" />
          <InvoiceCard title="Total Invoice" total={200000} type="paid" />
          <InvoiceCard title="Total Invoice" total={200000} type="pending" />
          <InvoiceCard title="Cancel" total={200000} type="cancel" />
        </div>

        <div>
          <TabContainer>
            <TabButton onClick={() => handleTabSwitch("paid")} active={activeTab === "paid"}>
              Paid
            </TabButton>
            <TabButton onClick={() => handleTabSwitch("pending")} active={activeTab === "pending"}>
              Pending
            </TabButton>
            <TabButton onClick={() => handleTabSwitch("cancel")} active={activeTab === "cancel"}>
              Cancel
            </TabButton>
          </TabContainer>
        </div>

        <div className="bg-[#fff] p-3 mt-3 rounded-lg">
          <TabPanel active={activeTab === "paid"}>
            <InvoiceCardList
              onClick={viewInvoice}
              status="paid"
              date="12-12-2024"
              id="Invoice-ID"
              price={20010}
              title="75800707-AR"
            />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="paid" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
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
          <TabPanel active={activeTab === "cancel"}>
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
            <InvoiceCardList status="cancel" date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          </TabPanel>
        </div>
      </Container>
    </>
  )
}

export default Invoices

const Container = styled.div``
