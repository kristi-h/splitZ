import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "./context/SiteContext";
import Card from "./ui/Card";
import FooterHome from "./layout/FooterHome";
import NoDataPlaceholder from "./ui/NoDataPlaceholder";
import Dialog from "./ui/Dialog";
import Button from "./ui/Button";

export default function Home() {
  const navigate = useNavigate();
  const { user, friends, groupData, expenses, modal, handleSetModal } =
    UseDataContext();

  // Create reference to dom elements
  const deleteDialogRef = useRef(null);

  console.log("friends", friends);

  useEffect(() => {
    // if user is not "logged in", go to login
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (friends.length < 2) {
      console.log("Get started by adding a friend to split expenses with.");
      toggleDialog(deleteDialogRef);
    }
  }, []);

  // Closes or opens the dialog
  const toggleDialog = (ref) => {
    if (!ref.current) {
      return;
    }
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  };

  const groupDisplay = groupData
    .sort((a, b) => b.ID - a.ID) // show latest expense up top
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
    .sort((a, b) => b.ID - a.ID) // show latest expense up top
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
            <NoDataPlaceholder
              title="There are no groups to display"
              subtitle="Get started by creating a group."
              btnText="Create a Group"
              onClick={() => {
                handleSetModal("CreateGroup");
              }}
            />
          )}
        </div>

        <>
          <h2 className="mb-4 text-2xl font-medium">Recent Expenses</h2>
          {expenses.length > 0 ? (
            <>{expenseDisplay}</>
          ) : (
            <NoDataPlaceholder
              title="There are no expenses to display"
              subtitle="Get started by creating an expense."
              btnText="Create Expense"
              onClick={() => handleSetModal("CreateExpense")}
            />
          )}
        </>
        <Dialog isCustom={true} dialogRef={deleteDialogRef}>
          <div className="flex flex-col items-center justify-center">
            <p className="mb-6 text-center">
              Get started by adding a friend to split expenses with.
            </p>
            <Button
              className="w-full sm:w-48"
              onClick={() => handleSetModal("FriendForm")}
              // className={"grow"}
            >
              Add Friend
            </Button>
          </div>
        </Dialog>
        {/* <FooterHome /> // remove footer from home until we establish outlets*/}
      </div>
    )
  );
}
