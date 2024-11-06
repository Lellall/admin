import CardIcon from "@/assets/3dcube.svg"
import styled from "styled-components"
import DashboardCard from "../dashboard/components/card"
import { Pie } from "react-chartjs-2"
import Text from "@/components/text/Text"

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

function Analytics() {
  return (
    <div>
      <Container>
        <DashboardCard imgUrl={CardIcon} title="Total" amount={20000} amountInPercentage={"+5%"} />
        <DashboardCard imgUrl={CardIcon} title="Inventory" amount={20000} amountInPercentage={"+5%"} />
        <DashboardCard imgUrl={CardIcon} title="Invoices" amount={20000} amountInPercentage={"+5%"} />
        <DashboardCard imgUrl={CardIcon} title="Orders" amount={20000} amountInPercentage={"+5%"} />
      </Container>
      <MainContainer>
        <div className="top">
          <Text h3>Product Trends</Text>
          <p className="dropDown">Yearly </p>
        </div>
        <div className="chart">
          <Pie
            key="pie-chart-analytics"
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            data={PieChartData}
          />
        </div>
      </MainContainer>
    </div>
  )
}

export default Analytics

const Container = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(min-content, 350px)); */

  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 887px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  max-width: 1024px;
`

const MainContainer = styled.div`
  border: 1px solid #e4e7ec;
  padding: 10px;
  border-radius: 10px;
  margin: 40px 0px;
  max-width: 600px;
  /* max-width: 1024px; */
  /* min-height: 400px; */

  .chart {
    /* background: red; */
  }
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
