import Text from "@/components/text/Text"
import styled from "styled-components"

const NewInventory = () => {
  return (
    <>
      <Container>
        <Text h1>Invoices</Text>
        <Text block color="#0E5D3796">
          Invoices are generated every 30 days and are sent to your default payment method.
        </Text>

        <div>
          <CardInvoice>
            <Text>Total Invoice</Text>
          </CardInvoice>
        </div>
      </Container>
    </>
  )
}

export default NewInventory

const Container = styled.div``
const CardInvoice = styled.div`
  background: #34a8530f;
`
