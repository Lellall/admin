import { DocumentText, ShoppingCart, Box, Chart, Setting, Logout, HambergerMenu, CloseCircle } from "iconsax-react"
import { Outlet, useNavigate } from "react-router-dom"
import Logo from "../../assets/react.svg"
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/auth.slice"
import { useState } from "react"

function RestaurantLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
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
              <a href="/restaurant">Templates</a>
            </li>
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <ShoppingCart size="24" className="mr-3" />
              <a href="/restaurant/orders">Orders</a>
            </li>
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
            Logging Out
          </button>
        </div>
      </aside>
      <div className="md:hidden bg-white p-4 border-b flex justify-between items-center">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
        <button onClick={toggleMobileMenu} className=" text-white p-2 rounded">
          {isMobileMenuOpen ? <CloseCircle size="32" color="#0E5D37" /> : <HambergerMenu size="32" color="#0E5D37" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#FFF] text-[#0E5D37] p-4 border-b z-50">
          <ul className="space-y-4">
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <DocumentText size="24" className="mr-3" />
              <a href="/restaurant">Templates</a>
            </li>
            <li className="hover:bg-green-100 p-2 rounded flex items-center">
              <ShoppingCart size="24" className="mr-3" />
              <a href="/restaurant/orders">Orders</a>
            </li>
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
      )}

      <main className="flex-1 overflow-y-auto">
        {/* <header className="sticky top-0 bg-white border-b z-10 p-4">
          <h1 className="text-xl font-semibold">Templates</h1>
        </header> */}
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
