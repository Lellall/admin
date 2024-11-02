import { useGetShopsQuery } from "@/redux/shops"
import Pagination from "rc-pagination"
import { useState } from "react"
import ScreenLoader from "@/components/screen.loader"
import styled from "styled-components"
import Modal from "@/components/modal"
import ShopForm from "@/features/admin/shop/shop-form"
import ShopList from "./new-shop"

function Shops() {
  const [page, setPage] = useState(1)
  const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false)
  const { data, isLoading } = useGetShopsQuery({ page: page - 1, size: 10, categoryId: "", filter: "" })

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const toggleModalShop = () => {
    setIsShopModalOpen(!isShopModalOpen)
  }

  return (
    <div className="">
      <>
        {isLoading ? <ScreenLoader /> : <ShopList shops={data?.data} />}
        <Pagination
          style={{ float: "right", margin: "40px 0px" }}
          onChange={handlePageClick}
          current={page}
          total={data?.resultTotal}
        />

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
        </>
      </>
    </div>
  )
}

export default Shops

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(min-content, 350px));
  grid-template-rows: masonry;
  gap: 15px;
`
