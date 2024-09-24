import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "./context/SiteContext";
import Card from "./ui/Card";

export default function Home() {
  const navigate = useNavigate();
  const { user, groupData, expenses, modal } = UseDataContext();

  console.log(groupData);

  useEffect(() => {
    // if user is not "logged in", go to login
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const groupDisplay = groupData.map((group) => (
    <Card
      key={group.id}
      id={group.id}
      icon={"fa-user-group"}
      title={group.name}
      subtitle={group.description}
    />
  ));

  const expenseDisplay = expenses.map((expense) => {
    // get the group associated with this expense
    const expenseGroup = groupData.find(
      (group) => group.id === expense.groupId,
    );

    return (
      <Card
        key={expense.id}
        id={expense.id}
        icon={"fa-money-check-dollar"}
        title={expense.name}
        subtitle={expenseGroup.name}
        price={expense.amount}
      />
    );
  });

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Welcome, {user}!</h1>
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-medium">Recent Groups</h2>
          {groupDisplay}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-medium">Recent Expenses</h2>
          {expenseDisplay}
        </div>
      </div>
    )
  );
}
