import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Dialog from "../ui/Dialog";
import PieChart from "../widgets/PieChart";
import NoDataPlaceholder from "../ui/NoDataPlaceholder";

function GroupDetail() {
  const [deleteID, setDeleteID] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [progressBarStyle, setProgressBarStyle] = useState({
    width: 0,
    color: "#05299e",
  });
  const { groupData, setGroupData, friends, expenses, handleSetModal, modal } =
    UseDataContext();

  // Create reference to dom elements
  const deleteDialogRef = useRef(null);

  const { groupId } = useParams();
  const navigate = useNavigate();

  const singleGroup = groupData.find((group) => group.id === groupId);

  // get all the group expenses
  const groupExpenses = expenses.filter((expense) =>
    singleGroup.expenseIDs?.includes(expense.id),
  );
  console.log(groupExpenses);

  // get the total group expense amount
  const totalExpenseAmount = groupExpenses
    .map((expense) => parseFloat(expense.amount))
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  // figure out the width of the expense percentage bar
  // max it out at 100 to avoid growing outside the div
  const expensePercentage =
    ((totalExpenseAmount / singleGroup.budget) * 100).toFixed() >= 100
      ? 100
      : ((totalExpenseAmount / singleGroup.budget) * 100).toFixed();

  // set the percentage and color to state and disply as style
  // tailwind is bad at rendering dynamically
  useEffect(() => {
    // if budget is over 75%, bar is red
    const barColor = expensePercentage > 75 ? "#d20000" : "#05299e";
    setProgressBarStyle((prev) => ({
      ...prev,
      width: expensePercentage,
      color: barColor,
    }));
  }, [expensePercentage]);

  const groupCategories = groupExpenses.map((expense) => expense.category);

  // Closes or opens the dialog
  const toggleDialog = (ref) => {
    if (!ref.current) {
      return;
    }
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  };

  //delete a group
  const handleDelete = (id) => {
    db.deleteRows("groups", { ID: id });
    db.commit();
    //call setState to render the component
    setGroupData(db.queryAll("groups"));
    // after deleting, navigate to groups
    navigate("/groups");
  };

  const friendsList = friends
    .filter((friend) => singleGroup.friendIDs.includes(friend.id))
    .map((friend) => friend.name.split(" ")[0]);

  const friendsDisplay =
    friendsList.length > 3 ? (
      seeMore ? (
        <>
          {friendsList.join(", ")}{" "}
          <span
            onClick={() => setSeeMore(false)}
            className="cursor-pointer font-semibold hover:underline"
          >
            see less
          </span>
        </>
      ) : (
        <>
          {friendsList.slice(0, 3).join(", ")}
          ...{" "}
          <span
            onClick={() => setSeeMore(true)}
            className="cursor-pointer font-semibold hover:underline"
          >
            see more
          </span>
        </>
      )
    ) : (
      friendsList.join(", ")
    );

  const expenseDisplay = groupExpenses
    .sort((a, b) => b.ID - a.ID) // show latest expense up top
    .map((expense, i) => {
      return (
        <Card
          key={expense.id}
          id={expense.id}
          type={"expense"}
          icon={"fa-money-check-dollar"}
          title={expense.name}
          price={expense.amount}
        />
      );
    });
  console.log(expenses);

  return (
    !modal.show && (
      <>
        <div>
          <div className="mb-4 flex items-center">
            <i
              onClick={() => navigate("/groups")}
              className="fa-solid fa-chevron-left cursor-pointer text-3xl text-accent"
            ></i>
            <h1 className="mx-auto mb-0">{singleGroup.name}</h1>
            <i className="fa-solid fa-chevron-right text-3xl text-accent opacity-0"></i>
          </div>
          <p className="mb-2">{singleGroup.description}</p>
          <p className="mb-4">
            <span className="font-bold">Group Members: </span>
            {friendsDisplay}
          </p>
          {groupExpenses.length < 1 ? (
            <p className="text-center font-normal">
              <span className="font-bold">Budget this month:</span> $
              {singleGroup.budget}
            </p>
          ) : (
            <>
              <div className="relative mb-2 flex">
                <div
                  className={`absolute h-8 rounded-lg transition-all duration-500 ease-out`}
                  style={{
                    width: `${progressBarStyle.width}%`,
                    background: `${progressBarStyle.color}`,
                  }}
                ></div>
                <div className="h-8 w-full rounded-lg bg-accent"></div>
              </div>
              <p className="text-center font-normal">
                <span className="font-bold">Budget remaining this month:</span>{" "}
                ${totalExpenseAmount} / ${singleGroup.budget}
              </p>
              <PieChart label={"Categories"} slices={groupCategories} />
            </>
          )}
        </div>

        <div className="mt-8">
          {groupExpenses.length > 0 ? (
            <>{expenseDisplay}</>
          ) : (
            <NoDataPlaceholder
              title="There are no expenses to display"
              subtitle="Get started by creating an expense."
              btnText="Create a Expense"
              onClick={() => handleSetModal("CreateExpense")}
            />
          )}
        </div>

        <div className="over absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 bg-gradient-to-t from-white to-white/0 pb-5 pt-20">
          <div className="mx-auto flex gap-2">
            <Button
              className="h-14 bg-red-700"
              onClick={() => {
                setDeleteID(singleGroup.ID);
                toggleDialog(deleteDialogRef);
              }}
            >
              Delete
            </Button>
            <Button
              className="h-14 bg-primary"
              onClick={() => handleSetModal("EditGroup", singleGroup.ID)}
            >
              Edit
            </Button>
            <Button
              className="h-14 bg-primary"
              onClick={() => handleSetModal("CreateExpense")}
            >
              Create Expense
            </Button>
          </div>
        </div>
        <Dialog
          dialogRef={deleteDialogRef}
          cancelOnClick={() => toggleDialog(deleteDialogRef)}
          confirmOnClick={() => handleDelete(deleteID)}
        >
          <p>Are you sure you want to delete this group?</p>
        </Dialog>
      </>
    )
  );
}

export default GroupDetail;
