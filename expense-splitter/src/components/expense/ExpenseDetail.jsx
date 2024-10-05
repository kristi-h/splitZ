import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";

function ExpenseDetail() {
  const { expenses } = UseDataContext();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const singleExpense = expenses.find((expense) => expense.id === expenseId);

  // Redirect to 404 page if expense not found
  if (!singleExpense) {
    return <Navigate to={"404"} />;
  }

  return (
    <div>
      <h1>{singleExpense.name}</h1>
      <p>{singleExpense.category}</p>
      <p>{singleExpense.description}</p>
      <p>{singleExpense.amount}</p>
      <Button
        variant={"small"}
        onClick={() => navigate("/expenses")}
        className={"bg-accent"}
      >
        Back
      </Button>
    </div>
  );
}

export default ExpenseDetail;
