import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Card from "../ui/CardExpenseDetail";
import Button from "../ui/Button";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const [progressBarStyle, setProgressBarStyle] = useState({
    width: 0,
    color: "#05299e",
  });
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

  // get percentages from weight array
  const getPercentages = getWeight.map((item) => item.percentage);

  // set sum of percentage to calculate 'me' percentage
  let percentageSum = 0;

  // sum of values in percentages array
  for (let i = 0; i < getPercentages.length; i++) {
    percentageSum += getPercentages[i];
  }

  // calculate 'me' percentage
  const percentageMe = 100 - percentageSum;

  // calculate contribution of 'me'
  const contributionMe = (percentageMe / 100) * totalAmount;

  // round 'me' contribution to 2 decimal places
  const contributionMeRounded = contributionMe.toFixed(2);

  // set data for pie chart to be array of contribution values
  const pieChartData = getWeight.map((item) => item.contribution);

  // set sum of contributions to calculate 'me' contribution
  let contributionSum = 0;

  // sum of values in pie chart array which contains contribution values
  for (let i = 0; i < pieChartData.length; i++) {
    contributionSum += pieChartData[i];
  }

  // calculate total amount to pay of all payers ('me' + group members)
  const totalContribution = contributionSum + contributionMe;

  // calculate progress to total expense amount payoff
  const progressPaid = totalAmount - totalContribution;

  // round progress paid to 2 decimal places
  const progressPaidRounded = progressPaid.toFixed(2);

  // sort payers by contribution amount
  const sortedContributions = getWeight.sort(function (a, b) {
    return b.contribution - a.contribution;
  });

  // add 'me' contribution to pie chart data
  pieChartData.push(contributionMeRounded);

  // calculate amount of progress paid
  const progressPercentage = (progressPaid / totalAmount) * 100;

  // handle bar status
  useEffect(() => {
    // if progress is over 75%, bar is red
    const barColor = progressPercentage > 75 ? "#139B20" : "#05299e";
    setProgressBarStyle((prev) => ({
      ...prev,
      width: progressPercentage,
      color: barColor,
    }));
  }, [progressPercentage]);

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

  const MeDisplay = () => {
    return (
      <Card
        key={"Me"}
        id={"Me"}
        type={"friend"}
        icon={"fa-user"}
        title={"Me"}
        subtitle={percentageMe + "%"}
        price={contributionMe.toFixed(2)}
      />
    );
  };

  const memberDisplay = sortedContributions.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        type={"friend"}
        icon={"fa-user"}
        title={getFriends.find((i) => i.id === item.id).name}
        subtitle={item.percentage + "%"}
        price={item.contribution.toFixed(2)}
      />
    );
  });

  console.log(expenseDetails);

  return (
    <div>
      <h1 className="text-center text-5xl">{expenseDetails.name}</h1>
      <h1 className="text-center text-4xl text-green-600">
        ${expenseDetails.amount}
      </h1>
      <p className="mb-3">{expenseDetails.description}</p>
      <p className="font-bold">
        Category: <p>{expenseDetails.category}</p>
      </p>

      {/* <div className="relative mb-2 flex">
        <div
          className={`absolute h-8 rounded-lg transition-all duration-500 ease-out`}
          style={{
            width: `${progressBarStyle.width}%`,
            background: `${progressBarStyle.color}`,
          }}
        ></div>
        <div className="h-8 w-full rounded-lg bg-accent"></div>
      </div>
      <div className="text-center">
        <p>
          ${progressPaidRounded} / ${totalAmount}
        </p>
      </div> */}

      <PieChart
        // labels={getFriends.map(item => item.name)}
        label={"Contribution"}
        data={pieChartData}
      />
      <p className="mb-2 mt-4 bg-primary p-2 text-white">Split Costs:</p>
      <div className="mb-4">
        <MeDisplay />
      </div>
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
