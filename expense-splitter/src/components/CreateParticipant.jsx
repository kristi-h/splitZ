import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { nanoid } from "nanoid";

// Define schema for optional email
const optionalEmail = z.union([z.string().trim().email(), z.literal("")]);
// Define validation schema and error messages
const schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Must be at least 2 characters" }),
  email: optionalEmail,
});

const CreateParticipant = () => {
  // Destructire useForm hook
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // Used to check form data against validation schema
    resolver: zodResolver(schema),
  });

  // Handle form data on submit
  const onSubmit = async (data) => {
    const participant = { id: nanoid(), ...data };
    reset();
  };

  return (
    // Pass onSubmit function to useForm submit handler
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mr-2" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          placeholder="Min 2 characters"
          // Associate name input with useForm
          {...register("name")}
        />
        {/* Render errors if validation does not pass */}
        {errors.name && (
          <span className="ml-2 text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label className="mr-2" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          placeholder="Optional"
          // Associate email imput with useForm
          {...register("email")}
        />
        {/* Render errors if validation does not pass */}
        {errors.email && (
          <span className="ml-2 text-red-500">{errors.email.message}</span>
        )}
      </div>
      {/* Disable button if waiting on async funciton */}
      <button
        className="bg-slate-700 p-2 text-white"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateParticipant;
