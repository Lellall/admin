import Text from "@/components/text/Text"
import { thousandFormatter } from "@/utils/helpers"
import styled from "styled-components"

interface CardProps {
  id: string
  title: string
  date: string
  price: number
}

function InvoiceCardList(props: CardProps) {
  const { date, id, price, title } = props
  return (
    <Card>
      <div>
        <p>{id}</p>
        <Text h3>{title}</Text>
      </div>
      <p>status</p>
      <div>
        <Text h3>₦{thousandFormatter(price)}</Text>
        <p>{date}</p>
      </div>
    </Card>
  )
}

export default InvoiceCardList

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #454545;
`
