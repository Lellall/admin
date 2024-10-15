import CardIcon from "@/assets/3dcube.svg"
import DashboardCard from "./components/card"
import styled from "styled-components"
import { Pie, Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import CardList from "./components/cardList"
import Text from "@/components/text/Text"
import { TabButton, TabContainer, TabPanel } from "@/components/tab.component"
import { useState } from "react"
import Shops from "../shops/shops"

ChartJS.register(ArcElement, Tooltip, Legend)
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales in 2024 (in USD)",
      data: [12000, 19000, 3000, 5000, 2000, 3000],
      backgroundColor: "rgba(0, 128, 0, 0.6)", // Green with 60% opacity
      borderColor: "rgba(0, 128, 0, 1)", // Solid green border
      borderWidth: 1,
      barThickness: 20,
      maxBarThickness: 20,
    },
  ],
}
const PieChartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Color Distribution",
      data: [300, 50, 100, 80, 120, 90],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}
const RestaurantDashBoard = () => {
  const [activeTab, setActiveTab] = useState("home")

  const handleTabSwitch = (val: string) => setActiveTab(val)
  return (
    <>
      <div className="">
        <TabContainer>
          <TabButton active={activeTab === "home"} onClick={() => handleTabSwitch("home")}>
            Home
          </TabButton>
          <TabButton active={activeTab === "activity"} onClick={() => handleTabSwitch("activity")}>
            Activity
          </TabButton>
        </TabContainer>

        <TabPanel active={activeTab === "home"}>
          <Shops />
        </TabPanel>
        <TabPanel active={activeTab === "activity"}>
          <>
            <Container>
              <DashboardCard imgUrl={CardIcon} title="Total" amount={20000} amountInPercentage={"+5%"} />
              <DashboardCard imgUrl={CardIcon} title="Inventory" amount={20000} amountInPercentage={"+5%"} />
              <DashboardCard imgUrl={CardIcon} title="Invoices" amount={20000} amountInPercentage={"+5%"} />
              <DashboardCard imgUrl={CardIcon} title="Orders" amount={20000} amountInPercentage={"+5%"} />
            </Container>

            {/* <ChartContainer>
        <div className="top">
          <h2>Product Trends</h2>
          <p className="dropDown">Yearly </p>
        </div>
        <Bar data={data} key="barChart" />
      </ChartContainer> */}
            <MainContainer>
              <div className="top">
                <Text h3>Product Trends</Text>
                <p className="dropDown">Yearly </p>
              </div>
              <div className="chart">
                <Pie data={PieChartData} key="pieChart" />
              </div>
            </MainContainer>

            <MainContainer>
              <div className="top">
                <h2>Product Trends</h2>
                <p className="dropDown">Yearly </p>
              </div>
              <div>
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
                <CardList buttonTitle="Remove" date="11/12/2023" name="Yam" quantity="10 tubers" />
              </div>
            </MainContainer>
          </>
        </TabPanel>
      </div>
    </>
  )
}

export default RestaurantDashBoard

const Button = styled.div`
  padding: 5px;
  border-bottom: 1px solid green;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  /* background: red; */
`
const MainContainer = styled.div`
  border: 1px solid #e4e7ec;
  padding: 10px;
  border-radius: 10px;
  margin: 40px 0px;
  max-width: 600px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e7ec;
  }
  .dropDown {
    color: #0e5d37;
    background: #edf5f2;
    padding: 2px;
    border-radius: 5px;
    width: 60px;
    text-align: center;
    margin-bottom: 5px;
  }
`
