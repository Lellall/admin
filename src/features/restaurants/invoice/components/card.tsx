import Text from "@/components/text/Text"
import { ClipboardText, ClipboardTick, DocumentText } from "iconsax-react"
import styled from "styled-components"
import PrimaryIcon from "@/assets/Vector64.svg"
import PendingIcon from "@/assets/VectorPending.svg"
import SecondaryIcon from "@/assets/Vector-Paid.svg"
import { thousandFormatter } from "@/utils/helpers"

interface InvoiceCardProps {
  title: string
  total: number
  type: "pending" | "failed" | "total" | "paid"
}
function InvoiceCard({ title, total, type }: InvoiceCardProps) {
  return (
    <Card status={type}>
      <div className="icon">
        {type === "total" && <ClipboardText color="#125F3A" />}
        {type === "paid" && <ClipboardTick color="#fff" />}
        {type === "pending" && <DocumentText color="#A78705" />}
        {type === "failed" && <DocumentText color="#FF3D00" />}
      </div>

      <Text block color={type === "paid" ? "#125f3a" : "#fff"} style={{ fontSize: "17px", marginTop: "15px" }}>
        {title}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text color={type === "paid" ? "#125f3a" : "#fff"} h2>
          {thousandFormatter(total)}
        </Text>
        <Text color={type === "paid" ? "#125f3a" : "#fff"}> Invoice</Text>
      </div>
    </Card>
  )
}

export default InvoiceCard

interface CardProps {
  status: string
}
const Card = styled.div<CardProps>`
  /* width: 175px; */
  max-width: 302px;
  background: ${({ status }) =>
    status === "total"
      ? "#125f3a"
      : status === "paid"
        ? "#DCEDE5"
        : status === "pending"
          ? "#E5B804"
          : status === "failed"
            ? "#FF3D00"
            : "#125f3a"};
  height: 189px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 20px;
  background-image: ${({ status }) =>
    `url(${
      status === "paid"
        ? SecondaryIcon
        : status === "pending"
          ? PendingIcon
          : status === "failed"
            ? PrimaryIcon
            : PrimaryIcon
    })`};
  background-size: 158px;
  background-position: top right;
  background-repeat: no-repeat;
  border-radius: 8px;
  .icon {
    background: ${({ status }) =>
      status === "total"
        ? "#DCEDE5"
        : status === "paid"
          ? "#125f3a"
          : status === "pending"
            ? "#EFEBDBD4"
            : status === "failed"
              ? "#FFECE5"
              : "#125f3a"};
    height: 50px;
    width: 50px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    height: 60px;
    width: 60px;
  }
`
