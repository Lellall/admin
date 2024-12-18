import Text from "@/components/text/Text"
import { thousandFormatter } from "@/utils/helpers"
import styled from "styled-components"

interface CardProps {
  title: string
  imgUrl: string
  amount: number
  amountInPercentage: string
}

function DashboardCard(props: CardProps) {
  const { amount, imgUrl, title, amountInPercentage } = props
  return (
    <Card>
      <Text color="#475367">{title}</Text>
      <div className="subTitle">
        <Text style={{ fontWeight: 700, fontSize: "17px" }}>{thousandFormatter(amount)}</Text>
        <img src={imgUrl} alt="card_icon" />
      </div>
      <div className="info">
        <Text
          style={{
            background: " #e7f6ec",
            padding: "4px",
            fontSize: "12px",
            marginRight: "4px",
            width: "40px",
            textAlign: "center",
            borderRadius: "10px",
          }}
          color="#036b26"
        >
          {amountInPercentage}
        </Text>
        <Text color="#04802e">This Month</Text>
      </div>
    </Card>
  )
}

export default DashboardCard

const Card = styled.div`
  max-width: 300px;
  height: 150px;
  border: 1px solid #e4e7ec;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .subTitle {
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
  }
  .subTitle img {
    border-radius: 100px;
    border: 1px solid #e4e7ec;
    height: 2em;
    width: 2em;
    padding: 2px;
  }
  .info {
    display: flex;
    align-items: center;
  }
  .info p {
    margin-left: 5px;
  }
`
