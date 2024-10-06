import { useEffect, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import CardExpenseDetail from "../ui/CardExpenseDetail";
// import PieChart from "../widgets/PieChart";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  // get expense details
  const expenseDetails = expenses.find((expense) => expense.id === expenseId);

  // Redirect to 404 page if expense not found
  if (!expenseDetails) {
    return <Navigate to={"404"} />;
  }

  // get total amount of expense
  const totalAmount = expenseDetails.amount;

  // get group connected to expense
  const expenseGroup = groupData.filter(
    (group) => group.id === expenseDetails.groupId,
  )[0];

  // get friends names from goup
  const getFriends = friends.filter((friend) =>
    expenseGroup.friendIDs.includes(friend.id),
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

  const memberDisplay = sortedContributions.map((friend) => {
    return (
      <CardExpenseDetail
        key={friend.friendId}
        icon={"fa-user"}
        title={getFriends.find((i) => i.id === friend.friendId).name}
        subtitle={friend.percentage + "%"}
        price={((friend.percentage / 100) * totalAmount).toFixed(2)}
      />
    );
  });

  return (
    <div>
      <div className="mb-4 flex items-center">
        <i
          onClick={() => navigate("/expenses")}
          className="fa-solid fa-chevron-left cursor-pointer text-3xl text-accent"
        ></i>
        <h1 className="mx-auto mb-0 border-b-2 border-[#05299e]">
          {expenseDetails.name}
        </h1>
        <i className="fa-solid fa-chevron-right text-3xl text-accent opacity-0"></i>
      </div>
      <h1 className="mb-6 border-b-2 border-[#05299e] p-2 text-center">
        ${expenseDetails.amount}
      </h1>
      <div className="mb-2 flex">
        <p className="mr-1 font-bold">Info:</p>
        <p>{expenseDetails.description}</p>
      </div>
      <div className="flex">
        <p className="mr-1 font-bold">Category:</p>
        <p>{expenseDetails.category}</p>
      </div>
      <PieChart
        // labels={getFriends.map(item => item.name)}
        label={"Contribution"}
        data={pieChartData}
      />
      <div className="flex justify-end">
        <button
          className="text-xl underline"
          onClick={() => {
            navigate(`/group/id/${expenseGroup.id}`);
          }}
        >
          {expenseGroup.name}
        </button>
      </div>
      <p className="mb-2 mt-4 bg-primary p-2 text-white">Split Costs:</p>
      <div>
        <>{memberDisplay}</>
      </div>
      <div className="text-center">
        {expenseDetails.receipt_URL !== null ? (
          <a
            href={expenseDetails.receipt_URL}
            className="text-blue-400 underline"
          >
            Receipt
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default ExpenseDetail;
