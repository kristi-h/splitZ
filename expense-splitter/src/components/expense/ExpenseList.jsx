import { useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import IconButton from "../ui/IconButton";

export default function ExpenseList(props) {
  const { expenses, setExpenses, handleSetModal } = UseDataContext();

  const navigate = useNavigate();

  // Filter out id match, delete from local storage
  const handleDeleteExpense = (id) => {
    const updatedExpense = expenses.filter((exp) => exp.id !== id);
    console.log("expenses", updatedExpense);
    db.deleteRows("expenses", { id });
    db.commit();
    setExpenses(db.queryAll("expenses"));
  };

  // filter expenses for search bar
  const filteredData = expenses.filter((search) => {
    if (props.input === "") {
      return search;
    } else {
      return (
        search.name.toLowerCase().includes(props.input) ||
        search.amount.toLowerCase().includes(props.input)
      );
    }
  });

  const expenseItems = filteredData.map((expense) => (
    <div
      key={expense.id}
      className="mb-1 flex flex-col rounded-lg bg-slate-100 px-4 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="content-start">{expense.name}</div>
        <div className="justify-center">{expense.amount}</div>
        <div className="flex justify-center gap-2">
          <IconButton
            icon="fa-regular fa-circle-info"
            onClick={() => {
              navigate(`${expense.id}`);
            }}
            variant={"small"}
            className="font-normal"
            style="blue"
          ></IconButton>

          <IconButton
            icon="fa-regular fa-pen-to-square"
            onClick={() => handleSetModal("EditExpense", expense.ID)}
            variant={"small"}
            className="font-normal"
            style="blue"
          ></IconButton>

          <IconButton
            icon="fa-regular fa-trash-can"
            onClick={() => {
              handleDeleteExpense(expense.id);
            }}
            variant={"small"}
            className="font-normal"
          ></IconButton>
        </div>
      </div>
    </div>
  ));

  return <div className="mb-4 flex flex-col-reverse">{expenseItems}</div>;
}
