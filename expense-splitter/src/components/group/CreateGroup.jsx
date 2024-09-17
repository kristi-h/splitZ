import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";

export default function CreateGroup() {
  const { friends, setGroupData, handleSetModal } = UseDataContext();
  //form properties
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  //onSubmit
  const onSubmit = (values) => {
    console.log("This is form submit", values);
    setGroupData((prev) => [...prev, { ...values, id: nanoid() }]);
    //close form after submit
    handleSetModal();
  };


  return (
    <div className="mb-5">
      <h1 className="text-center">Create a Group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label className="mb-1">Group Name</label>
          <input
            placeholder="Name your group"
            {...register("name", { required: "name is required" })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="flex flex-col mb-5">
          <label className="mb-1">Group Description</label>
          <input
            placeholder="Tell us a little bit about your group"
            {...register("description", {
              required: "description is required",
            })}
          />
          <div className="error-text">
            {errors.description && errors.description.message}
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <label className="mb-1">Budget</label>
          <input
            placeholder="Enter a value"
            {...register("budget", {
              required: "budget is required",
              pattern: {
                value: /^[0-9]*$/i,
                message: "invalid type, only numbers allowed",
              },
            })}
          />
          <div className="error-text">
            {errors.budget && errors.budget.message}
          </div>
        </div>

        <div className="flex flex-col mb-5">
            <label htmlFor="friends" className="mr-2">
              Friends
            </label>
            <MultiSelectDropdown friends={friends} control={control} />
          </div>

        <div className="flex gap-8">
          <Button onClick={handleSetModal} className="w-full md:w-auto">
            Cancel
          </Button>
          <Button className="w-full md:w-auto bg-primary">Submit</Button>
        </div>
      </form>
    </div>
  );
}
