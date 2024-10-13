import { UseDataContext } from "../../context/SiteContext";

export default function GroupExpenseList({ expenseList }) {
  const { handleSetModal } = UseDataContext();

  return (
    <>
      <h3 className="text-decoration-line mt-2 text-base font-bold">
        Group Expenses:
      </h3>
      {expenseList.map((expense) => {
        return (
          <div key={expense.id} className="flex flex-row justify-between">
            <p>
              {expense.name}
              {expense.receipt_URL && (
                <span
                  onClick={() =>
                    handleSetModal(
                      "ReceiptImage",
                      null,
                      expense.receipt_URL,
                      expense.name,
                    )
                  }
                  className="ml-2 text-sm text-blue-700 underline"
                >
                  receipt
                </span>
              )}
            </p>
            <p>${expense.amount}</p>
          </div>
        );
      })}
    </>
  );
}
