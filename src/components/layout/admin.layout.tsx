import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  BookSaved,
  Additem,
  Heart,
  TicketDiscount,
  Clock,
  MonitorRecorder,
  MoneyRecive,
} from "iconsax-react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import { useResponsiveValue } from "../../lib/use-responsive-value.js";
import { ViewportWidth } from "../../utils/enums.js";
import { appPaths } from "./app-paths.js";
import { Modal } from "../ui/index.js";

const AdminLayout = () => {
  //   const { logoutAdmin } = useAuth();

  const navItems = [
    {
      id: 1,
      icon: <MonitorRecorder size="20" />,
      text: "Manage Orders & Riders",
      url: "/check",
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
      text: "Manage Vendors",
      url: appPaths.myOrders,
    },
    {
      id: 4,
      icon: <Additem size="20" />,
      text: "Manage Products",
      url: appPaths.products,
    },
    {
      id: 5,
      icon: <Heart size="20" />,
      text: "Favorites",
      url: appPaths.favorites,
    },
    {
      id: 6,
      icon: <TicketDiscount size="20" />,
      text: "Discount",
      url: appPaths.discount,
    },
    {
      id: 7,
      icon: <Clock size="20" />,
      text: "Recently viewed",
      url: appPaths.recentlyViewed,
    },
  ];

  const isMobile = useResponsiveValue({
    sm: true,
    md: false,
  });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MainContainer>
        <NavContainer>
          <div className="nav-items">
            {navItems.map((item) => (
              <StyledMenuItem key={item.id} to={item.url} end>
                <div className="main">
                  {item.icon} <p>{item.text}</p>
                </div>
              </StyledMenuItem>
            ))}
          </div>
          <div className="deactivate">
            {/* <button onClick={() => logoutAdmin()}>Logout</button> */}
            <button onClick={() => {}}>Logout</button>
          </div>
        </NavContainer>
        <ContentContainer>
          {isMobile && (
            <div className="mobile-nav">
              {navItems.map((item) => (
                <MobileNav key={item.id} to={item.url} end>
                  <p>{item.text}</p>
                </MobileNav>
              ))}
            </div>
          )}
          <Outlet />
        </ContentContainer>
      </MainContainer>

      <Modal isOpen={showModal} withCloseButton={false} pad={"20px 10px"}>
        <ModalContent>
          <ModalHeading>Are you sure?</ModalHeading>
          <p className="sub-text">
            Your account will be deactivated, and all your information will be
            cleared.
          </p>
          <div className="buttons">
            <button className="danger">Yes, Deactivate Account</button>
            <button className="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminLayout;

const MainContainer = styled.div`
  display: flex !important;
  align-items: flex-start !important;
  padding: 40px 60px 200px !important;
  gap: 30px !important;
  background: url("/assets/background.svg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: lightgray !important;
  min-width: 100% !important;
  box-sizing: border-box !important;
  max-width: 100% !important;
  margin-top: 5.5rem !important;

  @media (max-width: ${ViewportWidth.md}px) {
    max-width: 1024px !important;
    padding: 28.623px 38px 120px !important;
    gap: 20px !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    padding: 0 !important;
  }
`;

const NavContainer = styled(Box)`
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  border-radius: 8px !important;
  background: #fcfcfc !important;
  box-shadow: 0px 10px 20px 0px rgba(32, 56, 85, 0.15) !important;
  box-sizing: border-box !important;
  width: 22% !important;

  p {
    margin: 0;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    align-self: stretch;
  }

  .deactivate {
    display: flex;
    padding: 15px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;

    button {
      display: flex;
      padding: 8px 0px;
      width: 100% !important;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 30px;
      border: 1px solid #e41749;
      color: #e41749;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.3px;
      background: #fff;
      font-family: Open Sans;
      cursor: pointer;
    }
  }

  @media (max-width: ${ViewportWidth.md}px) {
    width: 25% !important;

    .deactivate {
      padding: 10.734px 11.449px;
      gap: 7.156px;

      button {
        padding: 6px 0px;
        gap: 7.156px;
        border-radius: 21.468px;
        font-size: 10px;
        line-height: 17.174px;
        letter-spacing: 0.215px;
      }
    }
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    display: none !important;
  }
`;

const StyledMenuItem = styled(NavLink)`
  display: flex;
  padding: 15px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
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

    p {
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      font-feature-settings: "clig" off, "liga" off;
    }
  }

  @media (max-width: ${ViewportWidth.md}px) {
    padding: 10.734px 11.449px !important;
    gap: 5.725px !important;

    main {
      gap: 5.725px !important;

      p {
        font-size: 12px;
        line-height: 17.174px;
      }
    }
  }
`;
StyledMenuItem.defaultProps = {
  className: ({ isActive }) => (isActive ? "active" : ""),
};

const ContentContainer = styled(Box)`
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 20px !important;
  flex: 1 0 0 !important;
  border-radius: 8px !important;
  background: #fcfcfc !important;
  box-shadow: 0px 10px 20px 0px rgba(32, 56, 85, 0.15) !important;

  p {
    margin: 0;
  }

  .mobile-nav {
    padding-top: 10px !important;
    text-align: center !important;
    width: 100% !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    width: 100% !important;
  }
`;

const MobileNav = styled(NavLink)`
  color: #2f313f !important;
  font-feature-settings: "clig" off, "liga" off !important;
  font-family: Raleway !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 22px;
  display: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center !important;

  &.active {
    display: block;
  }
`;
MobileNav.defaultProps = {
  className: ({ isActive }) => (isActive ? "active" : ""),
};

const ModalHeading = styled(Typography)`
  color: #2f313f !important;
  text-align: center !important;
  font-feature-settings: "clig" off, "liga" off !important;
  font-family: Raleway !important;
  font-size: 34px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 46px !important;

  @media (max-width: ${ViewportWidth.md}px) {
    font-size: 24px !important;
    line-height: 36px !important;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    font-size: 20px !important;
    line-height: 22px !important;
  }
`;

const ModalContent = styled(Box)`
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 12px !important;
  flex-shrink: 0 !important;

  p {
    margin: 0 !important;
  }

  .sub-text {
    color: #2f313f !important;
    text-align: center !important;
    font-feature-settings: "clig" off, "liga" off !important;
    font-family: Open Sans !important;
    font-size: 22px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 38px !important;
  }

  .buttons {
    display: flex !important;
    padding: 0px 15px !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 15px !important;
    width: 60% !important;
    margin: 0 auto !important;

    button {
      display: flex;
      padding: 12px 0px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      font-feature-settings: "clig" off, "liga" off;
      font-family: Open Sans;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      border-radius: 30px;
      border: none;
      cursor: pointer;
      width: 100%;
    }

    .danger {
      background: #e41749;
      color: #fff;
    }

    .cancel {
      background: #f3f3f8;
      color: #0e5d37;
    }
  }

  @media (max-width: ${ViewportWidth.md}px) {
    .sub-text {
      font-size: 20px !important;
      line-height: 22px !important;
    }

    .buttons {
      width: 68% !important;
      gap: 5px;
    }
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    .sub-text {
      font-size: 16px !important;
      line-height: 18px !important;
    }

    .buttons {
      width: 80% !important;
      gap: 5px;
    }
  }
`;
