import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import Button from "../ui/Button";

export default function ExpenseList() {
  const { expenses, setExpenses, handleSetModal } = UseDataContext();
  // console.log('expenses', expenses)

  // Filter out id match, delete from local storage
  const handleDeleteExpense = (id) => {
    const updatedExpense = expenses.filter((exp) => exp.id !== id);
    console.log("expenses", updatedExpense);
    db.deleteRows("expenses", { id });
    db.commit();
    setExpenses(db.queryAll("expenses"));
  };

  const expenseItems = expenses.map((expense) => (
    <div
      key={expense.ID}
      className="mb-1 flex flex-col rounded-lg bg-slate-100 px-4 py-4"
    >
      <div className="flex items-center justify-between">
        <div>{expense.name}</div>
        <div>{expense.amount}</div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleSetModal("EditExpense", expense.ID)}
            variant={"small"}
            className="font-normal"
          >
            Edit
          </Button>

          <Button
            onClick={() => {
              handleDeleteExpense(expense.id);
            }}
            variant={"small"}
            className="font-normal"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  ));

  return <div className="mb-4 flex flex-col-reverse">{expenseItems}</div>;
}
