import Text from "@/components/text/Text"
import { Shops } from "@/redux/shops/typings"
import { MoreVert } from "@mui/icons-material"
import styled from "styled-components"

function ShopCard(props: Shops) {
  return (
    <Card>
      <div className="img"></div>

      <StatusCard status={props.status} />

      <div className="info">
        <div>
          <Text color="#fff">
            Name:
            <Text h3 color="#fff" style={{ marginLeft: "5px" }}>
              {props.name}
            </Text>
          </Text>
          <Text block color="#fff">
            Category:
            <Text h3 color="#fff" style={{ marginLeft: "5px" }}>
              {props.category?.name}
            </Text>
          </Text>
        </div>

        <div className="dropdown">
          <div className="  ">
            <MoreVert className="icon" />
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-menu-item">Edit</div>
            <div className="dropdown-menu-item">Delete</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ShopCard

const StatusCard = (props: Shops) => {
  return (
    <Status status={props.status ?? ""}>
      <Text color={props.status === "OPEN" ? "#fff" : "#FF3200"}>{props.status ? "Open" : "Close"}</Text>
    </Status>
  )
}

interface StatusProps {
  status: "OPEN" | "CLOSE" | string
}
const Status = styled.div<StatusProps>`
  border: ${({ status }) => (status === "OPEN" ? "1px solid #A9DDC4" : "1px solid #ff3d00")};
  background: ${({ status }) => (status === "OPEN" ? "#0E5D37" : "#ff3d0059")};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border-radius: 28px;
  top: 5px;
  right: 0px;
  position: absolute;
`
const Card = styled.div`
  max-width: 350px;
  /* min-width: 100%; */
  background: #9df5b50f;
  border: 1px solid #0e5d37;
  margin: 5px;
  border-radius: 5px;
  padding: 15px 10px 0px 10px;
  height: 271px;
  position: relative;
  box-sizing: border-box;

  .img {
    height: 70%;
    box-sizing: border-box;
    background-image: url("https://img.freepik.com/free-photo/dinner-table-luxury-hotel_1150-10908.jpg?t=st=1728944065~exp=1728947665~hmac=d2ce44fd14ab714f931b2fb14e4b3c28c9d8496d65d93e1b142b19468b393d13&w=1380");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .info {
    background: #0e5d37;
    color: #fff;
    height: 30%;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }
  .dropdown {
    position: absolute;
    width: 100px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    div:nth-child(1) {
      padding: 10px;
      bottom: 0;
      top: 0;
      margin-bottom: -10px;
      .icon {
        float: right;
        clear: both;
        margin-top: 40px;
      }
    }
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    background: #fff;
    z-index: 9;
    left: 0px;
    top: 75px;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    min-width: 100px;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu-item {
    padding: 8px 10px;
    cursor: pointer;
    color: #000;
  }

  .dropdown-menu-item:hover {
    /* background-color: #f4f3f3e3; */
    color: green;
  }
`
