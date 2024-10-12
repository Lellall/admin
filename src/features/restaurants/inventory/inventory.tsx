// import { Additem, AddSquare, ArrangeVertical, ShoppingCart } from "iconsax-react"
import Table from "../components/table"
import { useGetInventoryDetailsQuery, useUpdateInventoryMutation } from "@/redux/inventory/inventory.api"
import ScreenLoader from "@/components/screen.loader"
import { useState } from "react"

const Inventory = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "")
  const [query, setQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const { data: products, isLoading } = useGetInventoryDetailsQuery({ shopId: user?.shopIds[0], query })
  const [onUpdateInv, { isLoading: isUpdatingInv }] = useUpdateInventoryMutation()

  return (
    <>
      {isLoading ? (
        <ScreenLoader style={{ height: "50vh" }} />
      ) : (
        <div className="flex px-2 h-screen">
          <div className="w-full mr-4">
            <div className="h-[150px] px-2 rounded-lg w-full flex items-center justify-between">
              <div>
                <h1 className="text-2xl semi-bold">STOCK SHEET</h1>
              </div>
              <div className="w-[600px] ml-1">
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
              <div className="flex justify-end p-4">
                <button className="bg-[#0E5D37] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200">
                  Export Sheet
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
