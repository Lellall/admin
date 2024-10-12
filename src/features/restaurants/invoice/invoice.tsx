import Text from "@/components/text/Text"
import styled from "styled-components"
import InvoiceCard from "./components/card"
import InvoiceCardList from "./components/invoiceCardList copy"

const Invoice = () => {
  return (
    <>
      <Container>
        <Text h1>Invoices</Text>
        <Text block color="#0E5D3796">
          Invoices are generated every 30 days and are sent to your default payment method.
        </Text>

        <div className="grid grid-cols-2 gap-5 mt-5 mb-5">
          <InvoiceCard title="Total Invoice" total={200000} type="total" />
          <InvoiceCard title="Total Invoice" total={200000} type="paid" />
          <InvoiceCard title="Total Invoice" total={200000} type="pending" />
          <InvoiceCard title="Cancel" total={200000} type="cancel" />
        </div>

        <div className="bg-[#fff] p-3 mt-3 rounded-lg">
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
          <InvoiceCardList date="12-12-2024" id="Invoice-ID" price={20010} title="75800707-AR" />
        </div>
      </Container>
    </>
  )
}

export default Invoice

const Container = styled.div``
