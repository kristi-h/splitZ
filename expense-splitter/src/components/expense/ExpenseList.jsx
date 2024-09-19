import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import Button from '../ui/Button'

export default function ExpenseList() {
  const { groupData, setGroupData, expenses, setExpenses, handleSetModal } = UseDataContext();
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
      className="flex flex-col bg-slate-100 rounded-lg py-4 px-4 mb-1"
    >
      <div className="flex justify-between items-center">
        <div>{expense.name}</div>
        <div>{expense.amount}</div>
        <div className="flex gap-2">
           <Button
                    onClick={() => handleSetModal("EditExpense", expense.id)}
                    variant={'small'}
                    className="font-normal"
                    >
                    Edit
                    </Button>
                    <Button
                    onClick={() => {
              handleDeleteExpense(expense.id);
            }}
                    variant={'small'}
                    className="font-normal"
                    >
                    Delete
                </Button>
   
        </div>
      </div>
    </div>
  ));

  return( <div className="flex flex-col-reverse mb-4">{expenseItems}</div>;
)}
