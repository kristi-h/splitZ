import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../ui/Button";
import db from "../../utils/localstoragedb";

const MAX_FILE_SIZE = 6000000; //6MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

// Grab objects from useForm hook
const ReceiptUpload = ({ expenseDetails, setExpenses }) => {
  // Define validation schema
  const schema = z
    .object({
      upload: z
        .any()
        .refine((file) => file[0]?.size < MAX_FILE_SIZE, {
          message: "File size exceeded",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file[0]?.type), {
          message: "File type not supported",
        }),
    })
    .passthrough();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onUpload = async (data) => {
    // Define where to store with filepath
    const uploadRef = ref(
      storage,
      `${expenseDetails.id}-${data.upload[0].name}`,
    );
    // Upload to storage
    const snapshot = await uploadBytes(uploadRef, data.upload[0]);
    // Get url
    const url = await getDownloadURL(snapshot.ref);
    // save to DB
    db.update("expenses", { id: expenseDetails.id }, (expense) => {
      expense.receipt_URL = url;
      return expense;
    });
    db.commit();
    // Update state
    setExpenses(db.queryAll("expenses"));
  };

  return (
    <>
      <form
        data-html2canvas-ignore
        className="flex flex-col py-1"
        onSubmit={handleSubmit(onUpload)}
      >
        <p className="text-lg font-bold">
          Upload Receipt
          <span className="ml-2 text-sm font-light">
            (File size must be less than 6MB)
          </span>
        </p>
        <div className="flex items-center gap-4 py-2">
          <label
            htmlFor="upload"
            className="flex h-12 w-36 cursor-pointer items-center justify-center rounded-xl bg-accent transition-colors hover:bg-secondary hover:text-white"
          >
            <i className="fa-solid fa-paperclip mr-2"></i>Select File
          </label>
          <input
            className="absolute h-[0.1px] w-[0.1px] p-2 opacity-0"
            type="file"
            id="upload"
            {...register("upload")}
          />
          {/* Conditionally render button based on isSubmitting */}
          <Button
            type={"submit"}
            disabled={isSubmitting || !isValid}
            className={`bg-primary ${isValid ? "" : "cursor-auto bg-slate-400 hover:bg-slate-400"}`}
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {/* Render errors */}
        {errors.upload?.message && (
          <span className="text-red-500">{errors.upload.message}</span>
        )}
      </form>
    </>
  );
};

export default ReceiptUpload;
