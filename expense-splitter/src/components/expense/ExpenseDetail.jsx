import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Card from "../ui/CardExpenseDetail";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  // get expense details
  const expenseDetails = expenses.find((expense) => expense.id === expenseId);

  // get total amount of expense
  const totalAmount = expenseDetails.amount;

  // get group connected to expense
  const expenseGroup = groupData.filter(
    (group) => group.id === expenseDetails.groupId,
  );

  // turn array into single object
  const findGroup = expenseGroup.find(
    (group) => group.id === expenseDetails.groupId,
  );

  // get friends names from goup
  const getFriends = friends.filter((friend) =>
    findGroup.friendIDs.includes(friend.id),
  );

  // get weight array from expense object
  const getWeight = expenseDetails.weight;

  // set data for pie chart to be array of contribution values
  const pieChartData = getWeight.map((item) =>
    ((item.percentage / 100) * totalAmount).toFixed(2),
  );

  // sort payers by contribution amount
  const sortedContributions = getWeight.sort(function (a, b) {
    return b.percentage - a.percentage;
  });

  // create PieChart function
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

  const memberDisplay = sortedContributions.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        type={"friend"}
        icon={"fa-user"}
        title={getFriends.find((i) => i.id === item.friendId).name}
        subtitle={item.percentage + "%"}
        price={((item.percentage / 100) * totalAmount).toFixed(2)}
      />
    );
  });

  return (
    <div>
      <h1 className="border-b-2 border-[#05299e] p-2 text-center">
        {expenseDetails.name}
      </h1>
      <h1 className="mb-6 border-b-2 border-[#05299e] p-2 text-center">
        ${expenseDetails.amount}
      </h1>
      <p className="mb-3 font-bold">
        Info: <p>{expenseDetails.description}</p>
      </p>
      <p className="font-bold">
        Category: <p>{expenseDetails.category}</p>
      </p>
      <PieChart
        // labels={getFriends.map(item => item.name)}
        label={"Contribution"}
        data={pieChartData}
      />
      <p className="mb-2 mt-4 bg-primary p-2 text-white">Split Costs:</p>
      <div>
        <>{memberDisplay}</>
      </div>
      <div className="text-center">
        {expenseDetails.receipt_URL !== null ? (
          <a href={expenseDetails.receipt_URL} className="text-blue-400">
            Receipt
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default ExpenseDetail;
