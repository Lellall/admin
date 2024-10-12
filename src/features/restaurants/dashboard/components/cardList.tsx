import styled from "styled-components"

interface ListCardProps {
  name: string
  date: string
  buttonTitle: string
  quantity: string
}

function CardList(props: ListCardProps) {
  const { name, buttonTitle, date, quantity } = props
  return (
    <Card>
      <div>
        <p className="product">{name}</p>
        <p className="date">{date}</p>
      </div>
      <p className="qty">{quantity}</p>
      <button>{buttonTitle}</button>
    </Card>
  )
}

export default CardList

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e4e7ec;
  .date {
    color: #a7a8a9;
    font-size: 10px;
  }
  .qty,
  .product {
    font-weight: 500;
  }
  button {
    background: #ff3d0059;
    color: #ff3d00;
    padding: 5px;
    border-radius: 10px;
    width: 100px;
  }
`
