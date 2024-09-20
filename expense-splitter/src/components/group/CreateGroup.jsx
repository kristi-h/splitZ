import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";
import db from "../../utils/localstoragedb";

export default function CreateGroup() {
  const { friends, setGroupData, handleSetModal } = UseDataContext();

  // Define validation schema and error messages
  const schema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, { message: "Must be at least 2 characters" }),
    description: z
      .string({ required_error: "Description is required" })
      .trim()
      .min(1, { message: "Please add description" }),
    budget: z
      .string()
      .min(1, { message: "Enter the amount please" })
      .regex(new RegExp(/^[0-9]*(.[0-9]{2})?$/, "i"), {
        message: "Please enter an valid amount (100, 100.99)",
      }),
  });
  //form properties
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    // Used to check form data against validation schema
    resolver: zodResolver(schema),
  });

  //onSubmit
  const onSubmit = (values) => {
    //// console.log("This is form submit", values);
    //// setGroupData((prev) => [...prev, { ...values, id: nanoid() }]);
    //insert the new group data into the group database

    db.insert("groups", { ...values, id: nanoid() });
    db.commit();
    //call setState to render the component
    setGroupData(db.queryAll("groups"));
    //close form after submit
    handleSetModal();
  };

  return (
    <div className="mb-5">
      <h1 className="text-center">Create a Group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col">
          <label className="mb-1">Name</label>
          <input
            placeholder="Name your group"
            {...register("name", {
              required: "description is required",
            })}
          />
          {errors.name && (
            <span className="ml-2 text-sm text-red-400">
              {errors.name.message}
            </span>
          )}
          {/* <div className="error-text">{errors.name && errors.name.message}</div> */}
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1">Group Description</label>
          <input
            placeholder="Tell us a little bit about your group"
            {...register("description")}
          />
          {errors.description && (
            <span className="ml-2 text-sm text-red-400">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1">Budget</label>
          <input placeholder="Enter a value" {...register("budget")} />
          {errors.budget && (
            <span className="ml-2 text-sm text-red-400">
              {errors.budget.message}
            </span>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="friends" className="mr-2">
            Friends
          </label>
          <MultiSelectDropdown friends={friends} control={control} />
        </div>

        <div className="flex gap-8">
          <Button
            type="button"
            onClick={handleSetModal}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
          <Button className="w-full bg-primary md:w-auto">Submit</Button>
        </div>
      </form>
    </div>
  );
}
