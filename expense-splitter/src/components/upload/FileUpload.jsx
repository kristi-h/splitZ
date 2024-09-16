import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { nanoid } from "nanoid";

// Define validation schema
const schema = z.object({
  upload: z.object({
    0: z.object({
      arrayBuffer: z.any(),
      lastModifiedDate: z.date(),
      name: z.string(),
      size: z.number().refine(
        (size) => {
          return size < 6000000; // 6MB
        },
        { message: "File size exceeds 6MB" },
      ),
      type: z.string().refine(
        (val) =>
          // File types to accept
          val === "image/jpeg" ||
          val === "image/png" ||
          val === "application/pdf",
        { message: "File type not supported" },
      ),
    }),
  }),
});

// Grab objects from useForm hook
const FileUpload = () => {
  // Store url of uploaded image
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: zodResolver(schema),
  });

  const onUpload = async (data) => {
    // console.log("THIS IS THE FILE INFO");
    // console.log(typeof data.upload[0].lastModifiedDate);

    // Define where to store with filepath
    // TODO - Add unique identifier to filename //
    const uploadRef = ref(storage, `${data.upload[0].name} - ${nanoid()}`);
    // Upload to storage
    const snapshot = await uploadBytes(uploadRef, data.upload[0]);
    // Get url
    const url = await getDownloadURL(snapshot.ref);
    setImageUrl(url);
    reset();
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onUpload)}>
        <h1>Upload Receipt</h1>
        <div className="flex items-center gap-4">
          <label htmlFor="upload">Upload File</label>
          <p className="text-sm font-light">
            (File size must be less than 6MB)
          </p>
        </div>
        <input
          className="p-2"
          type="file"
          id="upload"
          {...register("upload")}
        />
        {/* Conditionally render button based on isSubmitting */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
        {/* Render size error */}
        {errors.upload?.[0].size && (
          <span className="text-red-500">{errors.upload[0].size.message}</span>
        )}
        {/* Render type error */}
        {errors.upload?.[0].type && (
          <span className="text-red-500">{errors.upload[0].type.message}</span>
        )}
      </form>
      {/* Display uploaded img NOT WORKING! */}
      <img src={imageUrl} alt="" />
      {imageUrl && <a href={imageUrl}>Download</a>}
    </>
  );
};

export default FileUpload;
