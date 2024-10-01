import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import PieGraph from "../widgets/PieGraph";

function ExpenseDetail() {
  const { expenses, groupData, friends } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const expenseDetails = expenses.find((expense) => expense.id === expenseId);

  const expenseGroup = groupData.filter((group) => group.id === expenseDetails.groupId)

  const test = expenseGroup.find((group) => group.id === expenseDetails.groupId)

  const getFriends = friends.filter((friend) => test.friendIDs.includes(friend.id))

  const totalAmount = expenseDetails.amount

  const pieChartData = [40, 30, 25, 15, 30];

  const amountPaid = 40

  console.log(expenseDetails)

  console.log(expenseGroup)

  console.log(getFriends)

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
      <PieGraph
          labels={getFriends.map(item => item.name)}
          label={"Contribution"}
          data={pieChartData}
        />
      <p className="mt-4 mb-2 bg-primary text-white p-2">Remaining Pay:</p>
        {getFriends.map((item) => (
          <div className="flex-row mb-4">
            <p className="">{item.name}:
            </p>
            <p className="text-red-400">$25</p>
          </div>
        ))}
    </div>
  );
}

export default ExpenseDetail;