import { appPaths } from "@/components/layout/app-paths"
import { usePrivileges } from "@/components/privileges"
import { Add, Data, Diagram, Profile2User, Setting4, Settings } from "iconsax-react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 52, 8, 1) 0%, rgba(253, 187, 45, 0) 100%);

  opacity: 0.8;
`

const BottomBox = styled.div`
  position: absolute;
  bottom: 20px; /* Push down slightly */
  left: 0;
  right: 0;
  width: 90%;
  padding: 1rem;
  background: #dcfce7;
  border-radius: 1rem;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow */
  display: flex;
  justify-content: space-between;
`

const ContentText = styled.p`
  color: #2d3748;
  font-size: 1.125rem; /* Tailwind's text-lg equivalent */
  @media (max-width: 900px) {
    /* display: none; */
    grid-template-columns: repeat(2, 1fr);
  }
`

const HeaderProfile = ({ openShopModal, showOther, url }: any) => {
  const { hasPrivilege } = usePrivileges()
  const navigate = useNavigate()
  return (
    <HeaderWrapper>
      <BackgroundImage
        src={
          url
            ? url
            : "https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=2738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        // src="https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=2738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Header Profile"
      />
      <GradientOverlay />

      <BottomBox>
        <h1 className="hidden md:block text-[#092d2b] text-2xl  font-light tracking-wider leading-tight">
          Cafe Dimanche
        </h1>

        <ContentText>
          {showOther ? (
            showOther
          ) : (
            <div className="flex justify-content">
              {/* <button
                type="button"
                className="bg-white mr-4 shadow-lg py-2 px-3 md:px-4 text-xs rounded-lg hover:bg-green-100 flex items-center justify-center space-x-2 font-light tracking-wider leading-tight"
              >
                <Setting4 size="15" color="#092d2b" />
                <span>SYSTEM</span>
              </button> */}
              {hasPrivilege("r:user") && (
                <>
                  <button
                    type="button"
                    className="bg-white mr-4 shadow-lg py-2 px-3 md:px-4 text-xs rounded-lg hover:bg-green-100 flex items-center justify-center space-x-2 font-light tracking-wider leading-tight"
                    onClick={() => {
                      navigate(appPaths.users)
                    }}
                  >
                    <Data size="15" color="#092d2b" />
                    <span>VIEW USERS</span>
                  </button>
                </>
              )}
              {/* <button
                type="button"
                className="bg-white mr-4 shadow-lg py-2 px-3 md:px-4 text-xs rounded-lg hover:bg-green-100 flex items-center justify-center space-x-2 font-light tracking-wider leading-tight"
              >
                <Diagram size="15" color="#092d2b" />
                <span>VIEW ANALYTICS</span>
              </button> */}
              {hasPrivilege("c:shop") && (
                <>
                  <button
                    type="button"
                    onClick={openShopModal}
                    className="bg-white shadow-lg py-2 px-3 md:px-4 text-xs rounded-lg hover:bg-green-100 flex items-center justify-center space-x-2 font-light tracking-wider leading-tight"
                  >
                    <Add size="15" color="#092d2b" />
                    <span>CREATE SHOP</span>
                  </button>
                </>
              )}
            </div>
          )}
        </ContentText>
      </BottomBox>
    </HeaderWrapper>
  )
}

export default HeaderProfile
