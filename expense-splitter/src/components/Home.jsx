import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "./context/SiteContext";

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
    <div
      key={group.id}
      className="mb-2 flex cursor-pointer items-center rounded-2xl bg-accent p-4 text-white"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 rounded-xl bg-primary/50 p-3">
            <i className="fa-solid fa-user-group text-3xl text-white"></i>
          </div>
          <div>
            <h2 className="leading-5">{group.name}</h2>
            <p>{group.description}</p>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-chevron-right mr-2 text-3xl text-white"></i>
        </div>
      </div>
    </div>
  ));

  const expenseDisplay = expenses.map((expense) => {
    // get the group associated with this expense
    const expenseGroup = groupData.find(
      (group) => group.id === expense.groupId,
    );

    return (
      <div
        key={expense.id}
        className="mb-2 flex cursor-pointer items-center rounded-2xl bg-accent p-4 text-white"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 rounded-xl bg-primary/50 p-3">
              <i className="fa-solid fa-money-check-dollar text-3xl text-white"></i>
            </div>
            <div>
              <h2 className="leading-5">{expense.name}</h2>
              <p>{expenseGroup.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mx-4 text-lg">{expense.amount}</div>
            <div>
              <i className="fa-solid fa-chevron-right mr-2 text-3xl text-white"></i>
            </div>
          </div>
        </div>
      </div>
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
