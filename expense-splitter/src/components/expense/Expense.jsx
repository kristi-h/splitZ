import React, { useState } from "react";
import CreateExpense from "./CreateExpense";
import Button from "../ui/Button";
import ExpenseList from "./ExpenseList";

export default function Expense() {
  const [expenseForm, setExpenseForm] = useState(false);

  const DisplayExpenseForm = () => {
    setExpenseForm(!expenseForm);
  };

  return (
    <div>
      <span>
        <Button variant={"small"} onClick={DisplayExpenseForm}>
          Create Expense +
        </Button>
      </span>
      {expenseForm ? <CreateExpense /> : ""}
      <ExpenseList />
    </div>
  );
}
