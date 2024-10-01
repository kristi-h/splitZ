import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import Button from "../ui/Button";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const expenseDetails = expenses.find((expense) => expense.id === expenseId);

  const expenseGroup = groupData.filter((group) => group.id === expenseDetails.groupId)

  const test = expenseGroup.find((group) => group.id === expenseDetails.groupId)

  const getFriends = friends.filter((friend) => test.friendIDs.includes(friend.id))

  const getWeight = expenseDetails.weight

  const totalAmount = expenseDetails.amount

  const pieChartData = getWeight.map(item => item.contribution);

  let contributionSum = 0;

  for (let i = 0; i < pieChartData.length; i++) {
    contributionSum += pieChartData[i];
  }

  const amountPaid = totalAmount - contributionSum

  const sortedContributions = getWeight.sort(function(a, b) {return (b.contribution - a.contribution)})

  pieChartData.push(amountPaid)


  function PieChart() {
  
    const chartRef = useRef(null);
  
  
    useEffect(() => {
      
      const dataPie = {
        datasets: [
          {
            // label: getFriends.map(item => item.name),
            data: pieChartData,
            backgroundColor: [
              "#05299e",
              "#761699",
              "#af008b",
              "#d80076",
              "#f4235d",
              "#ff5344",
              "#ffa600",
            ],
            hoverOffset: 4,
          },
        ],
      };
  
      const configPie = {
        type: "pie",
        data: dataPie,
        options: {},
      };
  
      const pieChart = new Chart(chartRef.current, configPie);
  
      // Cleanup the chart on component unmount
      return () => {
        pieChart.destroy();
      };
    });
  
    return (
      <div className="mx-auto max-w-sm overflow-hidden lg:max-w-lg">
        <canvas className="p-4" ref={chartRef}></canvas>
      </div>
    );
  }

  console.log(getFriends.map(item => item.name))

  return (
    <div>
      <h1 className="text-center">{expenseDetails.name}</h1>
      <p className="mb-3 text-center">{expenseDetails.category}: {expenseDetails.description}</p>
      <div className="text-center">
        <progress
          className=""
          value={amountPaid/totalAmount} />
        <p>${amountPaid} / ${totalAmount}</p>
      </div>
      <PieChart
          // labels={getFriends.map(item => item.name)}
          label={"Contribution"}
          data={pieChartData}
        />
      <p className="mt-4 mb-2 bg-primary text-white p-2">Remaining Pay:</p>
        <div className="flex-row mb-4">
          <p>Me:</p>
          <p className="text-red-400">${amountPaid}</p>
        </div>
          {sortedContributions.map((item) => (
          <div className="flex-row mb-4">
            <p className="">{item.id}:
            </p>
            <p className="text-red-400">${item.contribution}</p>
          </div>
        ))}
    </div>
  );
}

export default ExpenseDetail;