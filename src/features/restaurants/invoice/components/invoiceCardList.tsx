import Text from "@/components/text/Text"
import { thousandFormatter } from "@/utils/helpers"
import styled from "styled-components"

interface CardProps {
  id: string
  title: string
  date: string
  price: number
  status: "pending" | "cancel" | "paid"
  onClick?: () => void
}

function InvoiceCardList(props: CardProps) {
  const { date, id, price, title, status, onClick } = props
  return (
    <Card onClick={onClick}>
      <div>
        <p>{id}</p>
        <Text h3>{title}</Text>
      </div>
      <StatusCard status={status}>
        <span></span>
        status
      </StatusCard>
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
  cursor: pointer;
`
interface CardStyleProps {
  status?: string
}

const StatusCard = styled.div<CardStyleProps>`
  background: ${({ status }) => (status === "paid" ? "#0e5d3726" : status === "pending" ? "#E5B8045C" : "#FF3D0059")};
  padding: 4px;
  width: 70px;

  font-size: 11px;
  text-align: center;
  border-radius: 34px;
  color: ${({ status }) => (status === "paid" ? "#3f7e60" : status === "pending" ? "#E5B804" : "#FF3D00")};

  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  span {
    background: ${({ status }) => (status === "paid" ? "#3f7e60" : status === "pending" ? "#E5B804" : "#FF3D00")};
    content: "";
    height: 7px;
    display: block;
    width: 7px;
    padding: 3px;
    border-radius: 100px;
    /* margin: 0px 5px; */
  }
`
