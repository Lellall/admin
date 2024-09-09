/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react"
import { AddSquare, Calendar2, Clock, More, ShoppingCart } from "iconsax-react"
import { useNavigate } from "react-router-dom"
import Pagination from "rc-pagination/lib/Pagination"
import ReusableCard from "./components/card"
import rose from "../../assets/rose-petals.svg"
import main from "../../assets/scattered-forcefields.svg"
import { useGetTemplatesQuery } from "@/redux/templates/template.api"
import { appPaths } from "@/components/layout/app-paths"
import ScreenLoader from "@/components/screen.loader"
import EmptyState from "@/components/empty-state"

function Restaurant() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const user = JSON.parse(localStorage.getItem("user"))

    const { data, isLoading } = useGetTemplatesQuery({
        shopId: user?.shopIds[0],
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
    return (
        <div>
            <div className="flex  h-[250px] rounded-lg bg-gray-50 w-max-[1100px] mx-auto items-center gap-6 ">
                <div
                    className="bg-greenn-900 h-[230px] rounded-lg w-1/2 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${main})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl font-bold text-[#0E5D37] mb-4">
                            Experience the convenience you deserve with Lellall.
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Get all you want in one store!
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                navigate(`${appPaths.createTemplate}`)
                            }}
                            className="bg-[#0E5D37] text-white py-2 px-4 rounded hover:bg-green-700"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
                <div
                    className="bg-greenn-900 h-[230px] rounded-lg w-1/2 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${rose})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <h1 className="text-2xl font-bold text-white">
                        CAFÉ DIMANCHE
                    </h1>
                </div>
            </div>

            {isLoading ? (
                <ScreenLoader style={{ height: "50vh" }} />
            ) : (
                <>
                    <div className="flex cursor-pointer justify-between items-center gap-6 mt-4 flex-wrap">
                        <ReusableCard
                            className="flex justify-center border items-center rounded-md"
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
                                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            navigate(
                                                `${appPaths.template}/${item.id}`
                                            )
                                        }}
                                    >
                                        <ReusableCard key={item?.id}>
                                            <div className="flex p-4 justify-between">
                                                <div>
                                                    <div className="text-white text-2xl semi-bold ">
                                                        {item.name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <More
                                                        size="22"
                                                        className="mt-1 cursor-pointer"
                                                        color="#fff"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex p-4 mt-4">
                                                <div>
                                                    <ShoppingCart
                                                        variant="Bold"
                                                        size="25"
                                                        color="#fff"
                                                    />
                                                </div>
                                                <div className="ml-2">
                                                    <div className="text-white text-1xl semi-bold ">
                                                        {
                                                            item?.templateItems
                                                                ?.length
                                                        }{" "}
                                                        item listed
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  px-4">
                                                <div>
                                                    <Clock
                                                        variant="Bold"
                                                        size="25"
                                                        color="#fff"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-white ml-2 text-1xl semi-bold ">
                                                        Created on{" "}
                                                        {formatDateTime(
                                                            item?.createdAt
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex mt-4 px-4">
                                                <div>
                                                    <Calendar2
                                                        variant="Bold"
                                                        size="25"
                                                        color="#fff"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-white ml-2 text-1xl semi-bold ">
                                                        Order Delivered on Mon
                                                        04, 2024
                                                    </div>
                                                </div>
                                            </div>
                                        </ReusableCard>
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
                        <Pagination
                            onChange={handlePageClick}
                            current={page}
                            total={data?.resultTotal}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Restaurant
