import { useState } from "react";
import { UseDataContext } from "../context/SiteContext";

export default function ExpenseList() {
  const { groupData, setGroupData, expense } = UseDataContext();
  console.log("expense", expense);
  const expenseItems = expense.map((item) => (
    <div
      key={item.id}
      className="mb-1 flex cursor-pointer flex-col rounded-md bg-slate-100 px-2 py-4"
    >
      <div className="flex justify-between">
        <div>{item.name}</div>
        <div>{item.amount}</div>
        <div className="flex gap-2">
          <button className="rounded-sm bg-slate-500 px-2 text-slate-100 hover:bg-slate-600">
            edit
          </button>
          <button className="rounded-sm bg-slate-500 px-2 text-slate-100 hover:bg-slate-600">
            delete
          </button>
        </div>
      </div>
    </div>
  ));
  //    console.log('expense'. expense)

  return <div className="mb-4">{expenseItems}</div>;
}
