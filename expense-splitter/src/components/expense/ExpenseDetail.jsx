import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import CardExpenseDetail from "../ui/CardExpenseDetail";
import PieChart from "../widgets/PieChart";
import DownloadPDF from "../widgets/DownloadPDF";
import { useRef } from "react";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const downloadRef = useRef(null);

  // get expense details
  const expenseDetails = expenses.find((expense) => expense.id === expenseId);

  // Redirect to 404 page if expense not found
  if (!expenseDetails) {
    return <Navigate to={"404"} />;
  }

  // get group connected to expense
  const expenseGroup = groupData.filter(
    (group) => group.id === expenseDetails.groupId,
  )[0];

  // get friends names from goup
  const friendNames = friends.filter((friend) =>
    expenseGroup.friendIDs.includes(friend.id),
  );

  // set data for pie chart to be array of contribution values
  const pieChartData = {};

  expenseDetails.weight.forEach((weight) => {
    const friendInfo = friends.find((friend) => friend.id === weight.friendId);
    pieChartData[friendInfo.name] = (
      (weight.percentage / 100) *
      expenseDetails.amount
    ).toFixed(2);
  });

  // sort payers by contribution amount
  const sortedContributions = expenseDetails.weight.sort(function (a, b) {
    return b.percentage - a.percentage;
  });

  const memberDisplay = sortedContributions.map((friend) => {
    return (
      <CardExpenseDetail
        key={friend.friendId}
        icon={"fa-user"}
        title={friendNames.find((i) => i.id === friend.friendId).name}
        subtitle={friend.percentage + "%"}
        price={((friend.percentage / 100) * expenseDetails.amount).toFixed(2)}
      />
    );
  });

  return (
    <div ref={downloadRef}>
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
        <p>
          <span className="mr-1 font-bold">Info:</span>
          {expenseDetails.description}
        </p>
      </div>
      <div className="flex">
        <p>
          <span className="mr-1 font-bold">Category:</span>
          {expenseDetails.category}
        </p>
      </div>
      <PieChart label="Amount Owed" pieData={pieChartData} />
      <div className="flex justify-end">
        <button
          className="text-xl underline"
          onClick={() => {
            navigate(`/groups/${expenseGroup.id}`);
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
      <DownloadPDF
        filename={expenseDetails.name}
        contentRef={downloadRef}
        data-html2canvas-ignore
      />
    </div>
  );
}

export default ExpenseDetail;
