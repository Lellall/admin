/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react"
import { AddSquare, Calendar2, Clock, More, ShoppingCart, OceanProtocol } from "iconsax-react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Pagination from "rc-pagination/lib/Pagination"
import ReusableCard from "./components/card"
import rose from "../../assets/rose-petals.svg"
import main from "../../assets/scattered-forcefields.svg"
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
} from "@/redux/templates/template.api"
import { appPaths } from "@/components/layout/app-paths"
import ScreenLoader from "@/components/screen.loader"
import EmptyState from "@/components/empty-state"
import Modal from "@/components/modal"
import { Template } from "@/redux/templates/typings"
import { useGetShopsQuery } from "@/redux/shops"
import ShopForm from "../admin/shop/shop-form"

function Restaurant() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false)
  const userStored = localStorage.getItem("user")
  const user = userStored ? JSON.parse(userStored) : ""
  const shopId = user?.shopIds?.[0] ?? null
  const [deleteTemplate, { isLoading: isDeleting, isSuccess }] = useDeleteTemplateMutation()
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()
  const toggleModalShop = () => {
    setIsShopModalOpen(!isShopModalOpen)
  }
  const { data, isLoading } = useGetTemplatesQuery({
    shopId,
    page: page - 1,
    name: "",
    size: 10,
  })

  const formatDateTime = (dateTimeString: string | number | Date) => {
    const date = new Date(dateTimeString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDateTime = `${month}-${day}-${year}`
    return formattedDateTime
  }

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleDuplicateTemplate = (item: Template) => {
    createTemplate({ data: item, shopId })
  }

  useEffect(() => {
    if (isSuccess) {
      toggleModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const { data: shops } = useGetShopsQuery({ page: 0, size: 10, categoryId: "", filter: "" })
  return (
    <div>
      <div className="flex flex-col md:flex-row h-auto md:h-[250px] rounded-lg bg-gray-50 w-full  mx-auto items-center gap-6 p-4">
        <div
          className="bg-greenn-900 h-[200px] md:h-[230px] rounded-lg w-full md:w-1/2 flex items-center justify-center"
          style={{
            backgroundImage: `url(${rose})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-xl md:text-2xl font-bold text-white">CAFÉ DIMANCHE</h1>
        </div>
        <div
          className="bg-greenn-900 h-[200px] md:h-[230px] rounded-lg w-full md:w-1/2 flex items-center justify-center"
          style={{
            backgroundImage: `url(${main})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#0E5D37] mb-2 md:mb-4">
              Experience the convenience you deserve with Lellall.
            </h1>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">Get all you want in one store!</p>
            <button
              type="button"
              onClick={() => {
                navigate(`${appPaths.createTemplate}`)
              }}
              className="bg-[#0E5D37] text-white py-2 px-3 md:px-4 rounded hover:bg-green-700"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={toggleModalShop}
              className="bg-[#0E5D37] text-white py-2 px-4 ml-2 rounded hover:bg-green-700"
            >
              Create Shop
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <>
          <div
            className="grid cursor-pointer gap-2 mt-4 justify-center items-center"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}
          >
            <ReusableCard className="flex justify-center border rounded-md mx-auto items-center" noBg bgColor="#F3FAF5">
              <AddSquare
                onClick={() => {
                  navigate(`${appPaths.createTemplate}`)
                }}
                size="50"
                color="#0E5D37"
                variant="Bold"
              />
            </ReusableCard>

            {!data?.data?.length ? (
              <EmptyState />
            ) : (
              data?.data?.map((item) => {
                return (
                  <div key={item.id} className="mx-auto items-center">
                    <Card key={item?.id}>
                      <div className="flex p-4 justify-between">
                        <div>
                          <div className="text-white text-2xl semi-bold ">{item.name}</div>
                        </div>
                        <div className="dropdown">
                          <More size="22" className="mt-1 cursor-pointer" color="#fff" />

                          <div className="dropdown-menu">
                            <div
                              className="dropdown-menu-item"
                              onClick={() => navigate(`${appPaths.template}/${item.id}`)}
                            >
                              Edit
                            </div>
                            <div
                              className="dropdown-menu-item"
                              onClick={() => {
                                setCurrentItem(item)
                                const data = {
                                  name: "Duplicate " + item.name,
                                  templateItemsDto: item.templateItems,
                                }
                                if (isCreating) return
                                handleDuplicateTemplate(data)
                              }}
                            >
                              {isCreating ? "Duplicating..." : "Duplicate"}
                            </div>
                            <div
                              className="dropdown-menu-item"
                              onClick={() => {
                                toggleModal()
                                setCurrentItem(item)
                              }}
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex p-4 mt-4">
                        <div>
                          <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className="ml-2">
                          <div className="text-white text-1xl semi-bold ">
                            {item?.templateItems?.length} item listed
                          </div>
                        </div>
                      </div>
                      <div className="flex  px-4">
                        <div>
                          <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                          <div className="text-white ml-2 text-1xl semi-bold ">
                            Created on {formatDateTime(item?.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 px-4">
                        <div>
                          <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                          <div className="text-white ml-2 text-1xl semi-bold ">Order Delivered on Mon 04, 2024</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })
            )}
          </div>
          <div
            style={{
              float: "right",
              margin: "20px 10px",
              paddingBottom: "20px",
            }}
          >
            <Pagination onChange={handlePageClick} current={page} total={data?.resultTotal} />
          </div>
          <Modal width="500px" show={isModalOpen} onClose={toggleModal} title="Delete Template">
            <p>Are you sure you want to permanently delete this template?</p>

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={toggleModal}
                className="bg-[#0E5D37] text-white min-w-[100px] py-2 px-4 rounded hover:bg-green-700"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTemplate({ shopId, templateId: currentItem.id })
                }}
                className="bg-[#5d1b0e] text-white  min-w-[100px]  py-2 px-4 rounded hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
            </div>
          </Modal>
        </>
      )}

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

export default Restaurant

const Card = styled(ReusableCard)`
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    background-color: #fff;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    min-width: 100px;
    z-index: 1;
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
    background-color: #f4f3f3e3;
    color: green;
  }
`
