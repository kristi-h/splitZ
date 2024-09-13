import { useForm } from "react-hook-form";

// Grab object from useForm hook
const FileUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Console log form data
  const onUpload = async (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onUpload)}>
      <h1>Upload Receipt</h1>
      <label htmlFor="upload">Upload File</label>
      <input type="file" id="upload" {...register("upload")} />
      {/* Conditionally render button based on isSubmitting */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Upload"}
      </button>
      {/* Render errors */}
      {errors.upload && (
        <span className="text-red-500">{errors.upload.message}</span>
      )}
    </form>
  );
};

export default FileUpload;
