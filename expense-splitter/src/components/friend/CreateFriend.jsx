import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { nanoid } from "nanoid";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";

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

// Grab data from context
const CreateFriend = () => {
  const { handleSetModal, friends, setFriends } = UseDataContext();

  // Destructure useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // Used to check form data against validation schema
    resolver: zodResolver(schema),
  });

  // Add friend to state and save to local storage
  const onSubmit = (data) => {
    const newFriend = { ...data, id: nanoid() };
    setFriends([...friends, newFriend]);
    db.insert("friends", newFriend);
    db.commit();
    handleSetModal();
  };

  return (
    // Pass onSubmit function to useForm submit handler
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        Name
        {/* Render errors if name validation does not pass */}
        {errors.name && (
          <span className="ml-2 text-sm text-red-400">
            {errors.name.message}
          </span>
        )}
      </label>
      <input
        id="name"
        placeholder="Min 2 characters"
        // Associate name input with useForm
        {...register("name")}
      />

      <label htmlFor="email">
        Email
        {/* Render errors if email validation does not pass */}
        {errors.email && (
          <span className="ml-2 text-sm text-red-400">
            {errors.email.message}
          </span>
        )}
      </label>
      <input
        id="email"
        placeholder="Optional"
        // Associate email imput with useForm
        {...register("email")}
      />
      {/* Disable button if waiting on async funciton */}
      <div className="mt-3 flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button type="button" onClick={handleSetModal} className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateFriend;
