import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "./context/SiteContext";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function Home() {
  const navigate = useNavigate();
  const { user, groupData, expenses, modal } = UseDataContext();

  useEffect(() => {
    // if user is not "logged in", go to login
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const groupDisplay = groupData
    .sort((a, b) => b.ID - a.ID)
    .map((group, i) => {
      // show a max of 3 groups
      if (i <= 2) {
        return (
          <Card
            key={group.id}
            id={group.id}
            type={"group"}
            icon={"fa-user-group"}
            title={group.name}
            subtitle={group.description}
          />
        );
      }
    });

  const expenseDisplay = expenses
    .sort((a, b) => b.ID - a.ID)
    .map((expense, i) => {
      // show a max of 3 expenses
      if (i <= 2) {
        // get the group associated with this expense
        const expenseGroup = groupData.find(
          (group) => group.id === expense.groupId,
        );

        return (
          <Card
            key={expense.id}
            id={expense.id}
            type={"expense"}
            icon={"fa-money-check-dollar"}
            title={expense.name}
            subtitle={expenseGroup?.name}
            price={expense.amount}
          />
        );
      }
    });

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Welcome, {user}!</h1>
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-medium">Recent Groups</h2>
          {groupData.length > 0 ? (
            <>{groupDisplay}</>
          ) : (
            <>
              <div className="mb-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-accent/50 p-4 py-12">
                <p className="font-semibold">There are no groups to display</p>
                <p className="text-sm">Get started by creating a group.</p>
                <Button className="mt-4 w-full bg-primary md:w-auto">
                  Create a Group
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-medium">Recent Expenses</h2>
          {expenses.length > 0 ? (
            <>{expenseDisplay}</>
          ) : (
            <>
              <div className="mb-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-accent/50 p-4 py-12">
                <p className="font-semibold">
                  There are no expenses to display
                </p>
                <p className="text-sm">Get started by creating an expense.</p>
                <Button className="mt-4 w-full bg-primary md:w-auto">
                  Create an Expense
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}
