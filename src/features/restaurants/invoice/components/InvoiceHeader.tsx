import Text from "@/components/text/Text"

function InvoiceHeader() {
  return (
    <div>
      <Text h1>Invoices</Text>
      <Text block color="#0E5D3796">
        Invoices are generated every 30 days and are sent to your default payment method.
      </Text>
    </div>
  )
}

export default InvoiceHeader
