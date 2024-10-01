import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import ExpenseList from "./ExpenseList";
import ButtonFooter from "../ui/ButtonFooter";

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
        <div>
          <ExpenseList />
        </div>
        <ButtonFooter>
          <Button
            className="bg-primary"
            onClick={() => handleSetModal("CreateExpense")}
          >
            Create Expense
          </Button>
        </ButtonFooter>
      </>
    )
  );
}
