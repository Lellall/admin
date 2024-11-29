import { useState, useEffect } from "react"
import { Delete } from "@mui/icons-material"
import { useCompleteOrderMutation, useGetOrderQuery } from "@/redux/orders"
import { useParams } from "react-router-dom"
import { Order } from "@/redux/orders/typings"
import ScreenLoader from "@/components/screen.loader"

function RestaurantOrderDetails() {
  const { id: orderId } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetOrderQuery({ id: orderId ?? "" })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [handleCompleteOrder, { isLoading: isCompleting }] = useCompleteOrderMutation()
  useEffect(() => {
    if (data) {
      setSelectedOrder(data)
    }
  }, [data])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setSelectedOrder((prev) => {
      if (!prev?.paymentItems) return prev

      return {
        ...prev,
        paymentItems: prev.paymentItems.map((item) =>
          item.productId === productId ? { ...item, count: newQuantity } : item
        ),
      }
    })
  }

  const handleDeleteProduct = (productId: string) => {
    setSelectedOrder((prev) => {
      if (!prev?.paymentItems) return prev

      return {
        ...prev,
        paymentItems: prev.paymentItems.filter((item) => item.productId !== productId),
      }
    })
  }

  const completeOrder = () => {
    if (!selectedOrder?.paymentItems?.length) {
      alert("No products selected for invoice generation")
      return
    }
    handleCompleteOrder({ id: orderId ?? "" })
  }

  if (isLoading) {
    return <ScreenLoader />
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-600">Error loading order details. Please try again.</div>
      </div>
    )
  }

  if (!selectedOrder) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">No order found</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Order Code: {selectedOrder.orderCode}</h3>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/n</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedOrder.paymentItems?.map((item, index) => (
              <tr key={item.productId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                <td className="px-4 py-3 text-sm">
                  <input
                    type="number"
                    min="1"
                    className="border border-gray-300 p-2 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={item.count}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      if (!isNaN(value)) {
                        handleQuantityChange(item.productId, value)
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleDeleteProduct(item.productId)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete product"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
            {!selectedOrder.paymentItems?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                  No products selected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={completeOrder}
          disabled={!selectedOrder.paymentItems?.length}
          className="bg-green-800 text-white px-4 py-2 rounded-md shadow-md 
                     hover:bg-green-700 transition-colors
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCompleting ? "Completing..." : "Complete Order"}
        </button>
      </div>
    </div>
  )
}

export default RestaurantOrderDetails
