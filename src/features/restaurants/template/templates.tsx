/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react"
import { AddSquare, Calendar2, Clock, More, ShoppingCart } from "iconsax-react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Pagination from "rc-pagination/lib/Pagination"
import ReusableCard from "../components/card"
import rose from "@/assets/rose-petals.svg"
import main from "@/assets/scattered-forcefields.svg"
import { useCreateTemplateMutation, useGetTemplatesQuery } from "@/redux/templates/template.api"
import { appPaths } from "@/components/layout/app-paths"
import ScreenLoader from "@/components/screen.loader"
import EmptyState from "@/components/empty-state"
import { useGetShopQuery } from "@/redux/shops"
import Skeleton from "react-loading-skeleton"
import DeleteModal from "./modals/deleteModal"
import { TabButton, TabContainer, TabPanel } from "@/components/tab.component"
import Inventory from "../inventory/inventory"
import Invoices from "../invoice/invoices"
import { usePrivileges } from "@/components/privileges"

const formatDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const formattedDateTime = `${month}-${day}-${year}`
  return formattedDateTime
}

function Templates() {
  const navigate = useNavigate()
  const { shopId } = useParams()
  const { hasPrivilege, hasAllPrivileges } = usePrivileges()
  const [page, setPage] = useState(1)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("template")

  const { data: shopData, isLoading: isLoadingShop } = useGetShopQuery({ id: shopId ?? "" })
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const { data, isLoading } = useGetTemplatesQuery({
    shopId: shopId ?? "",
    page: page - 1,
    name: "",
    size: 10,
  })
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleDuplicateTemplate = (data: any) => {
    // @ts-ignore
    createTemplate(data)
  }

  const truncateText = (text: string, maxLength = 20) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  const handleTabSwitch = (value: string) => setActiveTab(value)
  return (
    <div className="max-w-[1440px] ">
      <div className="flex flex-col md:flex-row h-auto md:h-[250px] rounded-lg bg-gray-50 max-w-[1440px] w-full  mx-auto items-center gap-6 p-4 mb-5">
        {isLoadingShop ? (
          <>
            {[1, 2].map((el) => (
              <Skeleton key={el} count={1} width="350px" height="189px" />
            ))}
          </>
        ) : (
          <>
            <div
              className="bg-greenn-900 h-[200px] md:h-[230px] rounded-lg w-full md:w-1/2 flex items-center justify-center"
              style={{
                backgroundImage: `url(https://lellall-dev.sfo3.cdn.digitaloceanspaces.com/rose-petals.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className="text-xl md:text-2xl font-bold text-white">{shopData?.name.toUpperCase()}</h1>
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
                {/* <button
                  type="button"
                  onClick={() => {
                    navigate(`${appPaths.createTemplate}`)
                  }}
                  className="bg-[#0E5D37] text-white py-2 px-3 md:px-4 rounded hover:bg-green-700"
                >
                  Get Started
                </button> */}
                <div className="mt-5 mb-5 border rounded">
                  <TabContainer>
                    {hasAllPrivileges(["c:order", "r:order", "d:order"]) && (
                      <TabButton onClick={() => handleTabSwitch("template")} active={activeTab === "template"}>
                        ORDERS
                      </TabButton>
                    )}
                    {hasPrivilege("c:inventory") && (
                      <TabButton onClick={() => handleTabSwitch("inventory")} active={activeTab === "inventory"}>
                        INVENTORY
                      </TabButton>
                    )}
                    {hasAllPrivileges(["r:order"]) && (
                      <TabButton onClick={() => handleTabSwitch("invoice")} active={activeTab === "invoice"}>
                        INVOICES
                      </TabButton>
                    )}
                  </TabContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <>
          {hasAllPrivileges(["r:order"]) && (
            <TabPanel active={activeTab === "template"}>
              <>
                <Grid
                // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
                >
                  <ReusableCard
                    width="100%"
                    className="flex justify-center border rounded-md mx-auto items-center"
                    noBg
                    bgColor="#F3FAF5"
                  >
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
                        <div
                          key={item.id}
                          // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
                          // className="mx-auto items-center"
                        >
                          <Card width="100%" key={item?.id}>
                            <div className="flex p-4 justify-between">
                              <div>
                                <div className="text-white text-2xl semi-bold ">{truncateText(item.name)}</div>
                              </div>
                              <div className="dropdown">
                                <More size="22" className="mt-1 cursor-pointer" color="#fff" />

                                <div className="dropdown-menu">
                                  {/* <div
                                  className="dropdown-menu-item"
                                  onClick={() => navigate(`/restaurant/templates/${shopId}/id/${item.id}`)}
                                >
                                  Edit
                                </div> */}
                                  <div
                                    className="dropdown-menu-item"
                                    onClick={() => {
                                      setCurrentItem(item)
                                      const data = {
                                        name: "Duplicate " + item.name,
                                        templateItemsDto: item.templateItems,
                                        shopId: shopId,
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
                                <div className="text-white ml-2 text-1xl semi-bold ">
                                  Order Delivered on Mon 04, 2024
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      )
                    })
                  )}
                </Grid>

                <div
                  style={{
                    float: "right",
                    margin: "20px 10px",
                    paddingBottom: "20px",
                  }}
                >
                  <Pagination onChange={handlePageClick} current={page} total={data?.resultTotal} />
                </div>

                <DeleteModal
                  isModalOpen={isModalOpen}
                  shopId={shopId}
                  templateId={currentItem.id}
                  toggleModal={toggleModal}
                />
              </>
            </TabPanel>
          )}

          {hasAllPrivileges(["c:inventory"]) && (
            <TabPanel active={activeTab === "inventory"}>
              <Inventory />
            </TabPanel>
          )}
          {hasAllPrivileges(["r:order"]) && (
            <TabPanel active={activeTab === "invoice"}>
              <div className="mx-5">
                <Invoices />
              </div>
            </TabPanel>
          )}
        </>
      )}
    </div>
  )
}

export default Templates

const Card = styled(ReusableCard)`
  /* max-width: 350px; */
  /* width: 100%; */
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
  gap: 1rem; // adjust spacing as needed
  /* grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr)); */
  /* grid-template-columns: repeat(1, 1fr); */
  /* gap: 1.5rem; */
  /* margin-top: 1.5rem; */

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
