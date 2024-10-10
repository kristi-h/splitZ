import db from "../../utils/localstoragedb";
import Dialog from "../ui/Dialog";
import { useRef } from "react";
import deleteReceiptFromStorage from "../../utils/deleteReceipt";

const DisplayReceipt = ({ expense, setExpenses }) => {
  const deleteReceiptRef = useRef(null);

  const deleteReceiptURL = () => {
    // Remove url form local storage
    db.update("expenses", { id: expense.id }, (expense) => {
      expense.receipt_URL = null;
      return expense;
    });
    db.commit();

    // Update state
    setExpenses(db.queryAll("expenses"));
  };

  return (
    <>
      <div className="relative" data-html2canvas-ignore>
        <img src={expense.receipt_URL} alt={`Receipt for ${expense.name}`} />
        <button
          className="absolute right-1 top-1"
          onClick={() => {
            deleteReceiptRef.current.showModal();
          }}
        >
          <i className="fa-solid fa-circle-xmark fa-3x text-secondary opacity-70 transition-all hover:scale-110 hover:opacity-95 hover:drop-shadow-2xl"></i>
        </button>
      </div>

      <Dialog
        dialogRef={deleteReceiptRef}
        confirmOnClick={() => {
          deleteReceiptFromStorage(expense.receipt_URL, deleteReceiptURL);
        }}
      >
        <p>Are you sure you want to delete this receipt?</p>
      </Dialog>
    </>
  );
};

export default DisplayReceipt;
