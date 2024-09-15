import { useEffect } from "react"
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";

export default function EditGroup({
  currentGroupData,
  displayCreateGroupForm,
}) {
  const { friends, setGroupData } = UseDataContext();
  //form properties
  const editFriends = currentGroupData.friendIDs;
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // if another group is selected for edit, reset the form
  useEffect(() => {
    if(currentGroupData){
      reset({
        name: currentGroupData.name || '',
        description: currentGroupData.description || '',
        budget: currentGroupData.budget || '',
        friendIDs: currentGroupData.friendIDs || '',
      })
    }
  }, [currentGroupData])


  //onSubmit
  const onSubmit = (values) => {
    console.log(values);
    setGroupData((prev) => [...prev, { ...values, id: nanoid() }]);
  };

  return (
    <div className="mb-5">
      <h1>Edit a group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name</label>
          <input
            placeholder="Name"
            {...register("name", { required: "name is required" })}
            // value={currentGroupData.name}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-2">
          <label className="mr-2">Description</label>
          <input
            placeholder="What is this group about"
            {...register("description", {
              required: "description is required",
            })}
          />
          <div className="error-text">
            {errors.description && errors.description.message}
          </div>
        </div>

        <div className="mb-4">
          <label className="mr-2">Budget</label>
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

          <div className="my-2 flex flex-row items-center">
            <label htmlFor="friends" className="mr-2">
              Friends
            </label>
            <MultiSelectDropdown
              friends={friends}
              control={control}
              editFriends={editFriends}
            />
          </div>
        </div>

        <Button>Submit</Button>
        <Button onClick={displayCreateGroupForm} className="ml-4">
          Cancel
        </Button>
      </form>
    </div>
  );
}
