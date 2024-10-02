import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import ExpenseList from "./ExpenseList";
import ButtonFooter from "../ui/ButtonFooter";

export default function Expense() {
  const navigate = useNavigate();
  const { user, handleSetModal, modal } = UseDataContext();

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
  };

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
        <div className="mb-2">
          <SearchBar input={inputText} inputHandler={inputHandler}/>
        </div>
        <div>
          <ExpenseList input={inputText}/>
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
