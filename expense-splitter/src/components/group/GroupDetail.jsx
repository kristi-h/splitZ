import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Dialog from "../ui/Dialog";
import PieGraph from "../widgets/PieGraph";

function GroupDetail() {
  const [deleteID, setDeleteID] = useState(null);
  const { groupData, setGroupData, friends, expenses, handleSetModal, modal } =
    UseDataContext();

  // Create reference to dom elements
  const deleteDialogRef = useRef(null);

  const { groupId } = useParams();
  const navigate = useNavigate();

  const singleGroup = groupData.find((group) => group.id === groupId);

  // get all the group expenses
  const groupExpenses = expenses.filter((expense) =>
    singleGroup.expenseIDs.includes(expense.id),
  );

  // get the total group expense amount
  const totalExpenseAmount = groupExpenses
    .map((expense) => parseFloat(expense.amount))
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  console.log(totalExpenseAmount);

  //////////////////////// ----  pie chart stuff ---- ////////////////////////
  const groupCategories = groupExpenses.map((expense) => expense.category);

  // test cats with broader range
  //   const groupCategories = [
  //     "trip",
  //     "trip",
  //     "trip",
  //     "restaurant",
  //     "shopping",
  //     "bar",
  //   ];

  // get unique categories sorted alphabetically
  const sortedCategories = [...new Set(groupCategories)].sort();

  function calculateCategoryPercentages(categories) {
    // count the occurrences of each category
    const categoryCount = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    // console.log(categoryCount);

    // calculate the total number of categories
    const total = categories.length;

    // calculate the percentages for each category
    const percentages = sortedCategories.map((category) => {
      //   console.log(Math.round((categoryCount[category] / total) * 100));
      return Math.round((categoryCount[category] / total) * 100);
    });

    return percentages;
  }

  const pieSlices = calculateCategoryPercentages(groupCategories);

  //////////////////////// ----  pie chart stuff ---- ////////////////////////

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
    .map((friend) => friend.name)
    .join(", ");

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
            {friendsList}
          </p>
          <div className="relative mb-2 flex">
            <div className="absolute h-8 w-[20%] rounded-lg bg-primary"></div>
            <div className="h-8 w-full rounded-lg bg-accent"></div>
          </div>
          <p className="text-center font-normal">
            <span className="font-bold">Budget remaining this month:</span> $
            {totalExpenseAmount} / ${singleGroup.budget}
          </p>
        </div>

        <PieGraph
          labels={sortedCategories}
          label={"Categories"}
          data={pieSlices}
        />

        <div>
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
