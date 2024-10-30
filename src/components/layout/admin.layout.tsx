import { useContext } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { BookSaved, Additem, Heart, TicketDiscount, Clock, MonitorRecorder, MoneyRecive, Logout } from "iconsax-react"
import styled from "styled-components"

import { appPaths } from "./app-paths.js"
import NetworkIndicator from "../ui/network-indicator/network-indicator-component.js"
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/auth.slice.js"
import { RestaurantMenu } from "@mui/icons-material"
import Logo from "@/assets/react.svg"
import { LayoutContext } from "@/features/restaurants/LayoutContext.js"
import AdminHeader from "./admin-header.js"

function AdminLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  const navItems = [
    {
      id: 1,
      icon: <MonitorRecorder size="20" />,
      text: "Orders & Riders",
      url: "/",
    },
    {
      id: 9,
      icon: <RestaurantMenu />,
      text: "Restaurant Orders",
      url: appPaths.restaurantOrders,
    },
    {
      id: 2,
      icon: <MoneyRecive size="20" />,
      text: "Transaction History",
      url: appPaths.transaction,
    },
    {
      id: 3,
      icon: <BookSaved size="20" />,
      text: "Order History",
      url: appPaths.myOrders,
    },
    {
      id: 4,
      icon: <Additem size="20" />,
      text: "Manage Shops",
      url: appPaths.shops,
    },
    {
      id: 5,
      icon: <Additem size="20" />,
      text: "Manage Products",
      url: appPaths.products,
    },
    {
      id: 6,
      icon: <Heart size="20" />,
      text: "Favorites",
      url: appPaths.favorites,
    },
    {
      id: 7,
      icon: <TicketDiscount size="20" />,
      text: "Discount",
      url: appPaths.discount,
    },
    {
      id: 8,
      icon: <Clock size="20" />,
      text: "Recently viewed",
      url: appPaths.recentlyViewed,
    },
  ]

  const { isMobileMenuOpen, toggleMobileMenu } = useContext(LayoutContext)

  return (
    <>
      <NetworkIndicator />
      <Main className="flex flex-col md:flex-row h-screen ">
        <aside className="w-full md:w-[15%] max-w-sm border-none bg-white shadow-md text-[#0E5D37] p-4 sticky top-0 h-screen md:flex flex-col hidden ">
          <div className="mb-6">
            <img src={Logo} alt="Logo" className="h-10 w-auto mb-4" />
          </div>
          <nav className="flex-1 ">
            <ul className="space-y-2 ">
              {navItems.map((item) => (
                <StyledMenuItem key={item.id} to={item.url} end>
                  <div className="main">
                    {item.icon} <p>{item.text}</p>
                  </div>
                </StyledMenuItem>
              ))}
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
          {navItems.map((item) => (
            <NavLink
              className={`p-2 rounded flex items-center`}
              to={item.url}
              end
              key={item.id}
              onClick={toggleMobileMenu}
            >
              <span>{item.icon}</span>
              {item.text}
            </NavLink>
          ))}
        </Navbar>

        <main className="flex-1  overflow-y-auto ">
          <header className="sticky top-0 bg-white shadow-md z-10 p-4">
            <AdminHeader />
          </header>
          <div className="p-4  min-h-full ">
            <Outlet />
          </div>
          <h3>Footer</h3>
        </main>
      </Main>
    </>
  )
}

export default AdminLayout

const Main = styled.div`
  background: url("/assets/background.svg");
`

interface Props {
  isOpen: boolean
}
const Navbar = styled.nav<Props>`
  background: #fff;
  width: 80%;
  position: fixed;
  left: ${(props) => (props.isOpen ? "0" : "-80%")};
  top: 70px;
  bottom: 0;
  padding: 20px 10px;
  color: #0e5d37;
  z-index: 11;
  transition: left 0.3s ease-in-out;
  a {
    margin: 1.56rem 0px;
    padding: 8px;
    display: flex;
    flex-direction: row;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`

const StyledMenuItem = styled(NavLink)`
  display: flex;
  padding: 10px 10px;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
  color: #2f313f;
  &.active {
    background: #eafef1;
    color: #00a661;
  }
  .main {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    font-size: 15px;
  }
`
StyledMenuItem.defaultProps = {
  className: ({ isActive }) => (isActive ? "active" : ""),
}
