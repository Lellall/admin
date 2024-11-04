import styled from "styled-components"
import HeaderProfile from "../components/header"
import { Shop } from "@/redux/shops/typings"
import { useNavigate } from "react-router-dom"
import Modal from "@/components/modal"
import ShopForm from "@/features/admin/shop/shop-form"
import { useState } from "react"
import ShopImg from "@/assets/shop.jpg"
const ShopCard = styled.div`
  position: relative;
  height: 300px; /* Set the height for the card */
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }
`

const ShopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(75%);
  transition: all 0.4s ease-in-out;
  ${ShopCard}:hover & {
    filter: brightness(90%);
    transform: scale(1.05);
  }
`

const ShopDetails = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  color: white;
  transition: opacity 0.3s ease;
  opacity: 0.9;
  ${ShopCard}:hover & {
    opacity: 1;
  }
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`
interface StatusBadgeProps {
  isOpen: boolean
}

const StatusBadge = styled.span<StatusBadgeProps>`
  background-color: ${(props) => (props.isOpen ? "#34d399" : "#f87171")};
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
`

const ViewButton = styled.button`
  background-color: #fff;
  color: #064e3b;
  font-size: 0.75rem;
  padding: 0.2rem 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  &:hover {
    background-color: #f0fdf4;
    transform: scale(1.05);
  }
`

const ShopList = ({ shops }: any) => {
  const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const navigateToTemplate = (shopId: string) => {
    navigate(`/restaurant/templates/${shopId}`)
  }
  const toggleModalShop = () => {
    setIsShopModalOpen(!isShopModalOpen)
  }

  const storeShop = async (shop) => {
    await localStorage.setItem("shopId", shop.id)
    navigateToTemplate(shop.id ?? "")
  }

  return (
    <div className="container mx-auto px-3 py-5">
      <HeaderProfile openShopModal={toggleModalShop} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {shops?.map((shop: Shop) => (
          <ShopCard key={shop.id}>
            <ShopImage
              style={{
                backgroundImage: `url(${ShopImg})`,
              }}
            />
            <ShopDetails>
              <h2>{shop.name}</h2>
              <div className="flex justify-between items-center mt-2">
                <StatusBadge isOpen={shop.status === "OPEN"}>
                  {shop.status === "OPEN" ? "Active" : "Inactive"}
                </StatusBadge>
                <ViewButton
                  onClick={() => {
                    storeShop(shop ?? "")
                  }}
                >
                  View
                </ViewButton>
              </div>
            </ShopDetails>
          </ShopCard>
        ))}
      </div>

      <>
        <Modal
          width="100%"
          title="Create Shop"
          style={{
            maxWidth: "700px",
            width: "90%",
            margin: "auto",
            overflowY: "auto",
          }}
          show={isShopModalOpen}
          onClose={toggleModalShop}
        >
          <ShopForm mode="create" close={toggleModalShop} />
        </Modal>
      </>
    </div>
  )
}

export default ShopList
