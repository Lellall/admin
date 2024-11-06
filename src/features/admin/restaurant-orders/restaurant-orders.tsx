import ScreenLoader from "@/components/screen.loader"
import Pagination from "rc-pagination"
import EmptyState from "@/components/empty-state"
import { useNavigate } from "react-router-dom"
import { appPaths } from "@/components/layout/app-paths"
import { useGetOrdersQuery } from "@/redux/orders"
import styled from "styled-components"
import { useState } from "react"

function RestaurantOrders() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useGetOrdersQuery({
    pageNo: page - 1,
    pageSize: 10,
    role: "RESTAURANT",
  })

  const navigateToOrderDetails = (id: string) => {
    navigate(`/${appPaths.restaurantOrders}/${id}`)
  }
  const onChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <div>
      {isLoading || isFetching ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <div className="bg-white">
          <div style={{ width: "100%" }}>
            {!data?.data?.length ? (
              <EmptyState />
            ) : (
              <>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">S/n</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">User</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Phone number</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                        Total Product
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.map((order, index) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50"
                        onClick={() => navigateToOrderDetails(order.id)}
                      >
                        <td className="px-4 py-2 text-sm text-gray-700">{++index}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{order.shop?.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{order.consumerPhoneNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          <StatusCard status={order.status}>
                            <span></span>
                            {order.status}
                          </StatusCard>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">{order.items.length}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {order.address.estate} {order.address.apartmentName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div style={{ float: "right", margin: "10px" }}>
            {data?.data?.length ? <Pagination onChange={onChange} current={page} total={data?.resultTotal} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantOrders

interface CardStyleProps {
  status?: string
}
const StatusCard = styled.div<CardStyleProps>`
  background: ${({ status }) =>
    status === "ACCEPTED"
      ? "#0e5d3726"
      : status === "PENDING"
        ? "#E5B8045C"
        : status === "COMPLETED"
          ? "#00800080"
          : "#FF3D0059"};
  padding: 4px;
  width: 80px;

  font-size: 11px;
  text-align: center;
  border-radius: 34px;
  color: ${({ status }) =>
    status === "ACCEPTED"
      ? "#3f7e60"
      : status === "PENDING"
        ? "#E5B804"
        : status === "COMPLETED"
          ? "#008000"
          : "#FF3D00"};

  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  span {
    background: ${({ status }) =>
      status === "ACCEPTED"
        ? "#3f7e60"
        : status === "PENDING"
          ? "#E5B804"
          : status === "COMPLETED"
            ? "#008000"
            : "#FF3D00"};
    content: "";
    height: 7px;
    display: block;
    width: 7px;
    padding: 3px;
    border-radius: 100px;
    margin-right: 3px;
  }
`
