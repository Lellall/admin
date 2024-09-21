/* eslint-disable no-console */
import Pagination from "rc-pagination/lib/Pagination"
import { useState } from "react"
import { useDebounce } from "react-use"
import ShopsTable from "./shops-table"
import { useGetShopsQuery } from "@/redux/shops"
import SearchInput from "@/components/Inputs/searchInput"
import MiniLoader from "@/components/mini-loader"
import ScreenLoader from "@/components/screen.loader"
import EmptyState from "@/components/empty-state"
import Modal from "@/components/modal"
import ShopForm from "./shop-form"

function Shops() {
  const [page, setPage] = useState(1)
  const [vendorName, setVendorName] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  useDebounce(
    () => {
      setDebouncedSearchTerm(vendorName)
    },
    500,
    [vendorName]
  )

  const { data, isLoading, isFetching } = useGetShopsQuery({
    page: page - 1,
    size: 10,
    categoryId: "",
    filter: debouncedSearchTerm,
  })

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setVendorName(event.target.value)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className="flex justify-between w-full items-center  ">
        <SearchInput placeholder="Who are you looking for?" value={vendorName} onChange={handleSearchChange} />
        <button className="bg-[#F06D04] p-1 m-3 rounded-sm shadow-lg" onClick={toggleModal}>
          Add Shop
        </button>
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <>
          <div style={{ width: "100%" }}>
            {!data?.data?.length ? <EmptyState /> : <ShopsTable shops={data?.data} />}
          </div>
          <div style={{ float: "right", margin: "10px" }}>
            {data?.data?.length ? (
              <Pagination onChange={handlePageClick} current={page} total={data?.resultTotal} />
            ) : null}
          </div>
        </>
      )}
      <>
        <Modal
          width="100%"
          title="Add Vendor"
          style={{
            maxWidth: "700px",
            width: "90%",
            margin: "auto",
            overflowY: "auto",
          }}
          show={isModalOpen}
          onClose={toggleModal}
        >
          <ShopForm mode="create" />
        </Modal>
      </>
    </>
  )
}
export default Shops
