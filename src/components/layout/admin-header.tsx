import { useContext } from "react"
import styled from "styled-components"
import { CloseCircle, HambergerMenu } from "iconsax-react"
import Logo from "@/assets/react.svg"
import { capitalizeFirstLetterOFEachWord } from "@/utils/helpers"
import { LayoutContext } from "@/features/restaurants/LayoutContext"

function AdminHeader() {
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(LayoutContext)
  const user = JSON.parse(localStorage.getItem("user") ?? "{}")
  const getTitle = () => {
    // const path = location.pathname.substring(1)

    // if (path === "restaurant") return "Dashboard"

    // Split path and get last segment
    // const segments = path.split("/")
    // const lastSegment = segments[segments.length - 1]
    return "Super Admin Dashboard"
    // return segments[1]
    //   .split("-")
    //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //   .join(" ")
  }
  return (
    <Wrapper>
      <div className="title">
        <h3>{getTitle()}</h3>
      </div>
      <Profile>
        <div className="profile-card"> {user?.firstName[0] + user?.lastName[0]}</div>
        <div>
          <p className="name">
            {capitalizeFirstLetterOFEachWord(user?.firstName ?? "")}{" "}
            {capitalizeFirstLetterOFEachWord(user?.lastName ?? "")}
          </p>
          <p className="role">{capitalizeFirstLetterOFEachWord(user?.role ?? "")}</p>
        </div>
      </Profile>

      <img src={Logo} alt="Logo" className="h-8 w-auto" />
      <div className="menu">
        <button onClick={toggleMobileMenu} className=" text-white p-2 rounded">
          {isMobileMenuOpen ? <CloseCircle size="32" color="#0E5D37" /> : <HambergerMenu size="32" color="#0E5D37" />}
        </button>
      </div>
    </Wrapper>
  )
}

export default AdminHeader

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