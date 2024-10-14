import styled from "styled-components"
import InvoiceHeader from "./components/InvoiceHeader"
import Text from "@/components/text/Text"

function Invoice() {
  return (
    <div>
      <InvoiceHeader />
      <div className=" bg-[#F8F7F7]">
        <Receipt>
          <div> </div>
          <div></div>
          <main>
            <p>
              <Text>Restaurant name: </Text>
              <Text h3>CAFE DEMANCHI</Text>
            </p>
            <p>
              <Text>Invoice Id: </Text>
              <Text h3>75800707-AR</Text>
            </p>
            <p>
              <Text>invoice From: </Text>
              <Text h3>Lellall</Text>
            </p>
            <span className="span" />

            <p className="font-bold text-lg">Items</p>
            <ProductList>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>{" "}
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
              <li>
                <p>50 psc of tissue paper:</p>
                <p>₦20,010</p>
              </li>
            </ProductList>
          </main>
        </Receipt>
      </div>
    </div>
  )
}

export default Invoice

const Receipt = styled.div`
  background: #fff;
  min-height: 660px;
  min-width: 380px;
  position: relative;
  padding: 40px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 4rem;

  div:nth-child(1) {
    position: absolute;
    left: -50px;
    top: 50%;
    border-radius: 100px;
    height: 100px;
    width: 100px;
    content: "";
    padding: 10px;
    background: #f8f7f7;
    transform: translateY(-50%);
  }

  div:nth-child(2) {
    position: absolute;
    right: -50px;
    top: 50%;
    border-radius: 100px;
    height: 100px;
    width: 100px;
    content: "";
    padding: 10px;
    background: #f8f7f7;
    transform: translateY(-50%);
  }

  main {
    max-width: 80%;
    margin: auto;
    p {
      margin: 10px 0px;
    }
    .span {
      content: "";
      display: flex;
      border: 1px dashed #454545c9;
      margin: 30px 0px;
    }
  }
`

const ProductList = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
  }
`
