import { ShoppingCart, Box, Chart, Setting, Logout } from "iconsax-react"
import { NavLink, Outlet, useMatch, useNavigate, useResolvedPath } from "react-router-dom"
import Logo from "../../assets/react.svg"
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/auth.slice"
import { useContext } from "react"
import { appPaths } from "@/components/layout/app-paths"
import { ShopOutlined } from "@mui/icons-material"
import Header from "./header"
import { LayoutContext } from "./LayoutContext"
import styled from "styled-components"

function RestaurantLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const resolved = useResolvedPath("/restaurant/templates")
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(LayoutContext)

  const match = useMatch({ path: resolved.pathname + "/*", end: false })

  const exactRestaurantMatch = useMatch({ path: "/restaurant", end: true })

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <aside className="w-full md:w-1/6 border-r bg-[#FFF] text-[#0E5D37] p-4 sticky top-0 h-screen md:flex flex-col hidden md:block">
          <div className="mb-6">
            <img src={Logo} alt="Logo" className="h-10 w-auto mb-4" />
          </div>

          <nav className="flex-1">
            <ul className="space-y-4 mt-3">
              <NavLink
                className={`p-2 rounded flex items-center ${match || exactRestaurantMatch ? "bg-green-100 font-bold" : ""}`}
                to={appPaths.restaurant}
                end
              >
                <ShopOutlined className="mr-3" />
                Shops
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`
                }
                to={appPaths.orders}
              >
                <ShoppingCart size="24" className="mr-3" />
                Orders
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`
                }
                to={appPaths.inventory}
              >
                <Box size="24" className="mr-3" />
                Inventory
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`
                }
                to={appPaths.reports}
              >
                <Chart size="24" className="mr-3" />
                Reports
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`
                }
                to={appPaths.invoices}
              >
                <Setting size="24" className="mr-3" />
                Invoice
              </NavLink>
            </ul>
          </nav>
          <div className="mt-auto">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-[#0E5D37] hover:bg-green-900 text-white p-2 rounded text-center flex items-center justify-center"
            >
              <Logout size="24" className="mr-2" />
              Log Out
            </button>
          </div>
        </aside>

        <Navbar isOpen={isMobileMenuOpen}>
          <NavLink
            className={`p-2 rounded flex items-center ${match || exactRestaurantMatch ? "bg-green-100 font-bold" : ""}`}
            to={appPaths.restaurant}
            end
            onClick={toggleMobileMenu}
          >
            <ShopOutlined className="mr-3" />
            Shops
          </NavLink>
          <NavLink
            onClick={toggleMobileMenu}
            className={({ isActive }) => `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`}
            to={appPaths.orders}
          >
            <ShoppingCart size="24" className="mr-3" />
            Orders
          </NavLink>
          <NavLink
            onClick={toggleMobileMenu}
            className={({ isActive }) => `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`}
            to={appPaths.inventory}
          >
            <Box size="24" className="mr-3" />
            Inventory
          </NavLink>

          <NavLink
            onClick={toggleMobileMenu}
            className={({ isActive }) => `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`}
            to={appPaths.reports}
          >
            <Chart size="24" className="mr-3" />
            Reports
          </NavLink>

          <NavLink
            onClick={toggleMobileMenu}
            className={({ isActive }) => `p-2 rounded flex items-center ${isActive ? "bg-green-100 font-bold" : ""}`}
            to={appPaths.invoices}
          >
            <Setting size="24" className="mr-3" />
            Invoice
          </NavLink>
        </Navbar>

        <main className="flex-1 overflow-y-auto ">
          <header className="sticky top-0 bg-white border-b z-10 p-4">
            <Header />
          </header>
          <div className="p-4 bg-[#F8F7F7] ">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

export default RestaurantLayout

interface Props {
  isOpen: boolean
}
const Navbar = styled.nav<Props>`
  background: #fff;
  width: 40%;
  position: fixed;
  left: ${(props) => (props.isOpen ? "0" : "-40%")};
  top: 70px;
  bottom: 0;
  padding: 20px 10px;
  color: #0e5d37;
  z-index: 11;
  transition: left 0.3s ease-in-out;
  a {
    margin: 1.56rem 0px;
    padding: 8px;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`
