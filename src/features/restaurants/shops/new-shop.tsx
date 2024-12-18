import styled from "styled-components"
import HeaderProfile from "../components/header"
import { Shop } from "@/redux/shops/typings"
import { useNavigate } from "react-router-dom"
import Modal from "@/components/modal"
import ShopForm from "@/features/admin/shop/shop-form"
import { useState } from "react"
import ShopImg from "@/assets/shop.jpg"
import { useDispatch } from "react-redux"
import { setShop, useShopSlice } from "@/redux/shops/shops-slice"
import { MoreVert } from "@mui/icons-material"
import DeleteModal from "./modals/deleteShop"
import { usePrivileges } from "@/components/privileges"
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
  const [editShopModalOpen, setEditShopModalOpen] = useState<boolean>(false)
  const { hasAnyPrivilege } = usePrivileges()
  const navigate = useNavigate()
  const { id } = useShopSlice()
  const toggleModalShop = () => {
    setIsShopModalOpen(!isShopModalOpen)
  }

  const dispatch = useDispatch()
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const toggleDeletetModalShop = () => {
    setDeleteModalOpen(!deleteModalOpen)
  }
  const toggleEditModalShop = () => {
    setEditShopModalOpen(!editShopModalOpen)
  }
  const navigateToTemplate = (shopId: string) => {
    navigate(`/restaurant/templates/${shopId}`)
  }

  return (
    <Container>
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
              <>
                <div className="dropdown">
                  <div className="  ">
                    <MoreVert className="icon" style={{ color: "#fff" }} />
                  </div>
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-menu-item"
                      onClick={() => {
                        // if (editShop) {
                        //   editShop()
                        // }
                        toggleEditModalShop()
                        dispatch(setShop(shop))
                      }}
                    >
                      Edit
                    </div>
                    {}
                    <div className="dropdown-menu-item" onClick={toggleDeletetModalShop}>
                      Delete
                    </div>
                  </div>
                </div>
              </>
              <ShopDetails>
                <h2>{shop.name}</h2>
                <div className="flex justify-between items-center mt-2">
                  <StatusBadge isOpen={shop.status === "OPEN"}>
                    {shop.status === "OPEN" ? "Active" : "Inactive"}
                  </StatusBadge>
                  <ViewButton
                    onClick={() => {
                      navigateToTemplate(shop.id ?? "")
                      dispatch(setShop(shop))
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
            title="Create Restaurant"
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
          <Modal
            width="100%"
            title="Edit Restaurant"
            style={{
              maxWidth: "700px",
              width: "90%",
              margin: "auto",
              overflowY: "auto",
            }}
            show={editShopModalOpen}
            onClose={toggleEditModalShop}
          >
            <ShopForm mode="update" restaurantId={id} close={toggleEditModalShop} />
          </Modal>
          <DeleteModal isModalOpen={deleteModalOpen} shopId={id ?? ""} toggleModal={toggleDeletetModalShop} />
        </>
      </div>
    </Container>
  )
}

export default ShopList

const Container = styled.div`
  .dropdown {
    position: absolute;
    width: 100px;
    right: 0px;
    top: -40px;
    bottom: 0px;
    div:nth-child(1) {
      padding: 10px;
      bottom: 0;
      top: 0;
      margin-bottom: -10px;
      .icon {
        float: right;
        clear: both;
        margin-top: 40px;
      }
    }
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    background: #fff;
    z-index: 9;
    left: 0px;
    top: 75px;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    min-width: 100px;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu-item {
    padding: 8px 10px;
    cursor: pointer;
    color: #000;
  }

  .dropdown-menu-item:hover {
    /* background-color: #f4f3f3e3; */
    color: green;
  }
`
