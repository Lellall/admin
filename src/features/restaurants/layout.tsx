import { DocumentText, ShoppingCart, Box, Chart, Setting, Logout, HambergerMenu, CloseCircle } from "iconsax-react"
import { Outlet, useNavigate } from "react-router-dom"
import Logo from "../../assets/react.svg"
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/auth.slice"
import { useState } from "react"

function RestaurantLayout() {
  // const [logout, { isLoading, isSuccess }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/6 border-r bg-[#FFF] text-[#0E5D37] p-4 sticky top-0 h-screen md:flex flex-col hidden md:block">
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-10 w-auto mb-4" />
        </div>

        <nav className="flex-1">
          <ul className="space-y-4 mt-3">
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <DocumentText size="24" className="mr-3" />
              <a href="/restaurant">Orders</a>
            </li>
            {/* <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <ShoppingCart size="24" className="mr-3" />
              <a href="/restaurant/orders">Orders</a>
            </li> */}
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <Box size="24" className="mr-3" />
              <a href="/restaurant/inventory">Inventory</a>
            </li>
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <Chart size="24" className="mr-3" />
              <a href="/restaurant/reports">Reports</a>
            </li>
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <Setting size="24" className="mr-3" />
              <a href="/restaurant/invoice">Invoice</a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-[#0E5D37] hover:bg-green-900 text-white p-2 rounded text-center flex items-center justify-center"
          >
            <Logout size="24" className="mr-2" />
            Logout
            {/* {isLoading ? "Logging Out : "Logout"} */}
          </button>
        </div>
      </aside>

      {/* Middle Scrollable Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 bg-white border-b z-10 p-4">
          <h1 className="text-1xl font-semibold">Templates</h1>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>

      {/* Right Menu (optional, currently hidden on mobile) */}
      {/* <aside className="w-1/6 bg-gray-200 p-4 sticky top-0 h-screen hidden lg:block">
        <nav>
          <ul className="space-y-4">
            <li className="hover:bg-gray-300 p-2 rounded">
              <a href="#">Menu Item A</a>
            </li>
            <li className="hover:bg-gray-300 p-2 rounded">
              <a href="#">Menu Item B</a>
            </li>
            <li className="hover:bg-gray-300 p-2 rounded">
              <a href="#">Menu Item C</a>
            </li>
          </ul>
        </nav>
      </aside> */}
    </div>
  )
}

export default RestaurantLayout
