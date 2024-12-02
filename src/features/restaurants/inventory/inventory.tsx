import Table from "../components/table"
import {
  useGetInventoryDetailsQuery,
  useLazyExportInventoryQuery,
  useUpdateInventoryMutation,
} from "@/redux/inventory/inventory.api"
import ScreenLoader from "@/components/screen.loader"
import { useState } from "react"
import { useShopSlice } from "@/redux/shops/shops-slice"

const Inventory = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "")
  // const shopId = localStorage.getItem("shopId")
  const { id: shopId } = useShopSlice()
  const [query, setQuery] = useState("")
  // const { shopId } = useParams()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const { data: products, isLoading } = useGetInventoryDetailsQuery({ shopId })
  const [onUpdateInv, { isLoading: isUpdatingInv }] = useUpdateInventoryMutation()
  const [handleExportInventory, { isLoading: isExporting }] = useLazyExportInventoryQuery()
  return (
    <>
      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <div className="flex px-2 h-screen">
          <div className="w-full mr-4">
            <div className="h-auto md:h-[150px] px-2 py-4 rounded-lg w-full flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-xl md:text-2xl font-semibold">Inventory</h1>
              </div>
              <div className="w-full md:w-[600px] mb-4 md:mb-0">
                <input
                  type="search"
                  value={query}
                  onChange={handleSearchChange}
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>
              <div className="flex justify-end w-full md:w-auto">
                <button
                  onClick={() => {
                    handleExportInventory({ shopId: shopId ?? "", query: "" })
                  }}
                  className="bg-[#0E5D37] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 w-full md:w-auto"
                >
                  {isExporting ? "Exporting..." : "Export Sheet"}
                </button>
              </div>
            </div>

            <Table
              products={products}
              onUpdateInv={onUpdateInv}
              isUpdatingInv={isUpdatingInv}
              showAsList={false}
              shopId={user?.shopIds[0]}
            />
          </div>
          {/* <aside className="border-l w-[250px] bg-gray-20 px-4 sticky top-0 h-screen">
            <div className="mt-10 mb-4">Quick Actions</div>
            <nav>
              <ul className="space-y-4">
                <li className="hover:bg-green-100 p-2 rounded flex items-center">
                  <Additem size="18" className="mr-3" />
                  <a href="#">Add Product</a>
                </li>
                <li className="hover:bg-green-100 p-2 rounded flex items-center">
                  <ShoppingCart size="18" className="mr-3" />
                  <a href="#">Create Order</a>
                </li>
                <li className="hover:bg-green-100 p-2 rounded flex items-center">
                  <ArrangeVertical size="18" className="mr-3" />
                  <a href="#">Request Supply</a>
                </li>
                <li className="hover:bg-green-100 p-2 rounded flex items-center">
                  <AddSquare size="18" className="mr-3" />
                  <a href="#">Create Template</a>
                </li>
              </ul>
            </nav>
          </aside> */}
        </div>
      )}
    </>
  )
}

export default Inventory
