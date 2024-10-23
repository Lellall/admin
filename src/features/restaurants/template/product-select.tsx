import { formatCurrency } from "@/utils/helpers"
import { useState } from "react"
import styled from "styled-components"

const CardWrapper = styled.div`
  position: relative;
  width: 100%; /* Ensure the card takes full width of the grid cell */
  box-sizing: border-box;
  height: 220px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: ${({ selected }) => (selected ? "3px solid #bbf7d0" : "none")};
  background-color: ${({ selected }) => (selected ? "#bbf7d0" : "white")};
  box-shadow: ${({ selected }) => (selected ? "0px 2px 5px 2px #bbf7d0" : "0 4px 8px rgba(0, 0, 0, 0.1)")};

  &:hover {
    transform: scale(1.05);
  }

  .checkbox-container {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  input[type="checkbox"] {
    display: none;
  }

  .custom-checkbox {
    width: 20px;
    height: 20px;
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
  }

  input[type="checkbox"]:checked + .custom-checkbox {
    background-color: #0e5d37;
    border-color: #0e5d37;
  }

  .custom-checkbox::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    display: none;
  }

  input[type="checkbox"]:checked + .custom-checkbox::after {
    display: block;
  }

  @media (max-width: 1024px) {
    height: 200px;
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 160px;
  }
`

const CardContent = styled.div`
  padding: 8px;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 480px) {
    height: 80px;
  }
`

const Title = styled.h3`
  font-size: 14px;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const Price = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ isShopClose }) => (isShopClose ? "#888" : "#000")};

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const Card = ({ imageUrl, title, price, isShopClose, isSelected, toggleSelect }) => {
  return (
    <CardWrapper selected={isSelected} onClick={toggleSelect}>
      <div className="checkbox-container">
        <input type="checkbox" checked={isSelected} onChange={toggleSelect} onClick={(e) => e.stopPropagation()} />
        <div className="custom-checkbox"></div>
      </div>
      <Image src={imageUrl} alt="Product Image" />
      <CardContent>
        <Title>{title}</Title>
        <div className="flex justify-between items-center">
          <Price isShopClose={isShopClose}>{formatCurrency(price)}</Price>
        </div>
      </CardContent>
    </CardWrapper>
  )
}

const CardList = ({ cards, setSelectedProducts }) => {
  const [selectedCards, setSelectedCards] = useState([])

  const toggleSelect = (card) => {
    if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
      const updatedCards = selectedCards.filter((selectedCard) => selectedCard.id !== card.id)
      setSelectedCards(updatedCards)
      setSelectedProducts(updatedCards)
    } else {
      const updatedCards = [...selectedCards, card]
      setSelectedCards(updatedCards)
      setSelectedProducts(updatedCards)
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          imageUrl={card.imageUrl}
          title={card.name}
          price={card.price}
          isShopClose={card.isShopClose}
          isSelected={selectedCards.some((selectedCard) => selectedCard.id === card.id)}
          toggleSelect={() => toggleSelect(card)}
        />
      ))}
    </div>
  )
}

export default CardList
