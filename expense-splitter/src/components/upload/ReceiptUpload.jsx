import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { nanoid } from "nanoid";
import Button from "../ui/Button";

const MAX_FILE_SIZE = 6000000; //6MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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

// Grab objects from useForm hook
const ReceiptUpload = () => {
  // Store url of uploaded image
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const fileDetails = watch("upload");

  const onUpload = async (data) => {
    // Define where to store with filepath
    const uploadRef = ref(storage, `${nanoid()}-${data.upload[0].name}`);
    // Upload to storage
    const snapshot = await uploadBytes(uploadRef, data.upload[0]);
    // Get url
    const url = await getDownloadURL(snapshot.ref);
    setImageUrl(url);

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onUpload)} className="flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-lg">Would you like to upload a receipt?</p>
          <p className="text-sm font-light">
            (File size must be less than 6MB)
          </p>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="upload"
            className="mr-2 cursor-pointer rounded-md bg-accent px-4 py-2 text-white hover:bg-secondary focus:bg-secondary"
            tabIndex={0}
          >
            <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
            Select File
          </label>
          {fileDetails?.[0] && (
            <>
              <span>{fileDetails?.[0].name}</span>
              <span className="ml-auto font-light">
                {(fileDetails?.[0].size / (1000 * 1000)).toFixed(2)} MB
              </span>
            </>
          )}
        </div>

        <input
          className="hidden"
          type="file"
          id="upload"
          {...register("upload")}
        />

        {/* Conditionally render button based on isSubmitting */}
        <Button
          type={"submit"}
          disabled={isSubmitting || !isValid}
          className={"my-4 disabled:hover:bg-accent"}
        >
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>

        {/* Render errors */}
        {errors.upload?.message && (
          <span className="text-red-500">{errors.upload.message}</span>
        )}
      </form>
      {/* Display uploaded img */}
      <img src={imageUrl} alt="" />
      {imageUrl && <a href={imageUrl}>Download</a>}
    </>
  );
};

export default ReceiptUpload;
