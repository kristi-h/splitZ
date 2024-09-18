import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";

export default function ExpenseList() {
  const { groupData, setGroupData, expenses, setExpenses } = UseDataContext();
  // console.log('expenses', expenses)

  // Filter out id match, delete from local storage
  const handleDeleteExpense = (id) => {
    const updatedExpense = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpense);
    console.log("expenses", updatedExpense);
    db.deleteRows("expenses", { id });
    db.commit();
  };

  const expenseItems = expenses.map((expense) => (
    <div
      key={expense.id}
      className="mb-1 flex cursor-pointer flex-col rounded-md bg-slate-100 px-2 py-4"
    >
      <div className="flex justify-between">
        <div>{expense.name}</div>
        <div>{expense.amount}</div>
        <div className="flex gap-2">
          <button className="rounded-sm bg-slate-500 px-2 text-slate-100 hover:bg-slate-600">
            edit
          </button>
          <button
            className="rounded-sm bg-slate-500 px-2 text-slate-100 hover:bg-slate-600"
            onClick={() => {
              handleDeleteExpense(expense.id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  ));
  //    console.log('expenses'. expenses)

  return <div className="mb-4 flex flex-col-reverse">{expenseItems}</div>;
}
