import db from "../../utils/localstoragedb";
import Dialog from "../ui/Dialog";
import { useRef } from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../utils/firebase";

const DisplayReceipt = ({ expense, setExpenses }) => {
  const deleteReceiptRef = useRef(null);

  const receiptRef = ref(storage, expense.receipt_URL);
  const handleDeleteReceipt = () => {
    // Delete file from firebase
    deleteObject(receiptRef)
      .then(() => {
        // Remove url form local storage
        db.update("expenses", { id: expense.id }, (expense) => {
          expense.receipt_URL = null;
          return expense;
        });
        db.commit();

        // Update state
        setExpenses(db.queryAll("expenses"));
      })
      .catch((error) => {
        console.log(error);
      });
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
          console.log("DELETED!");
          handleDeleteReceipt();
        }}
      >
        <p>Are you sure you want to delete this receipt?</p>
      </Dialog>
    </>
  );
};

export default DisplayReceipt;
