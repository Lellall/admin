import { useContext } from "react"
import styled from "styled-components"
import { CloseCircle, HambergerMenu } from "iconsax-react"
import Logo from "@/assets/react.svg"
import { capitalizeFirstLetterOFEachWord } from "@/utils/helpers"
import { LayoutContext } from "@/features/restaurants/LayoutContext"

function AdminHeader() {
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(LayoutContext)

  // Get and parse user data with error handling
  const user = (() => {
    try {
      const storedUser = localStorage.getItem("user")
      return JSON.parse(storedUser ?? "{}")
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error)
      return {}
    }
  })()

  const getTitle = () => "Super Admin Dashboard"

  const userInitials = user?.firstName?.[0] + user?.lastName?.[0]
  const fullName = `${capitalizeFirstLetterOFEachWord(user?.firstName ?? "")} ${capitalizeFirstLetterOFEachWord(user?.lastName ?? "")}`
  const role = capitalizeFirstLetterOFEachWord(user?.role ?? "")

  return (
    <Wrapper>
      <div className="title">
        <h3>{getTitle()}</h3>
      </div>

      <Profile>
        <div className="profile-card">{userInitials}</div>
        <div>
          <p className="name">{fullName}</p>
          <p className="role">{role}</p>
        </div>
      </Profile>

      <img src={Logo} alt="Logo" className="h-8 w-auto" />

      <div className="menu">
        <button onClick={toggleMobileMenu} className="text-white p-2 rounded">
          {isMobileMenuOpen ? <CloseCircle size="32" color="#0E5D37" /> : <HambergerMenu size="32" color="#0E5D37" />}
        </button>
      </div>
    </Wrapper>
  )
}

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .profile-card {
    background: #0e5d376b;
    padding: 5px;
    border-radius: 100px;
    font-weight: 700;
    height: 30px;
    width: 30px;
    font-size: small;
    text-align: center;
  }

  p {
    font-size: small;
  }

  .name {
    color: #0e5d37;
  }

  .role {
    color: #0e5d3796;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    .title {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    img,
    .menu {
      display: none;
    }
  }
`

export default AdminHeader
