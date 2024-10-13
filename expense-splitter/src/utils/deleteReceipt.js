import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

const deleteReceiptFromStorage = (url, onDelete) => {
  const receiptRef = ref(storage, url);
  deleteObject(receiptRef)
    .then(() => {
      onDelete();
    })
    .catch((error) => {
      console.log(error);
    });
};

export default deleteReceiptFromStorage;
