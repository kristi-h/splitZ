import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import ExpenseList from "./ExpenseList";

export default function Expense() {
  const navigate = useNavigate();
  const { user, handleSetModal, modal } = UseDataContext();

  useEffect(() => {
    // if user is not "logged in", go to login
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    !modal.show && (
      <>
        <h1 className="text-center">Expenses</h1>
        <div>
          <ExpenseList />
        </div>
        <Button
          className="over absolute bottom-6 left-1/2 z-10 h-14 w-[200px] -translate-x-1/2 bg-primary"
          onClick={() => handleSetModal("CreateExpense")}
        >
          Create Expense
        </Button>
      </>
    )
  );
}
