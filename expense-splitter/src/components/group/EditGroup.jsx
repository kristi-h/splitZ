import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";

export default function EditGroup() {
  const { friends, setGroupData, groupData, modal, handleSetModal } =
    UseDataContext();

  //form properties
  const currentGroupData = groupData.find((group) => group.id === modal.id);
  console.log(currentGroupData);
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
    if (currentGroupData) {
      reset({
        name: currentGroupData.name || "",
        description: currentGroupData.description || "",
        budget: currentGroupData.budget || "",
        friendIDs: currentGroupData.friendIDs || "",
      });
    }
  }, [currentGroupData]);

  //onSubmit
  const onSubmit = (values) => {
    //check see if current edit Object id match the id of the group object
    //then replace that object with current edit data
    //else return group object
    setGroupData((prevState) =>
      prevState.map((currentStateObject) =>
        currentStateObject.id === currentGroupData.id
          ? { ...currentStateObject, ...values }
          : currentStateObject,
      ),
    );
    handleSetModal();
  };

  return (
    <div className="mb-5">
      <h1 className="text-center">Edit a group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col">
          <label className="mb-1">Group Name</label>
          <input
            placeholder="Name"
            {...register("name", { required: "name is required" })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1">Group Description</label>
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

        <div className="mb-5 flex flex-col">
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

        <div className="mb-5 flex flex-col">
          <label htmlFor="friends" className="mr-2">
            Friends
          </label>
          <MultiSelectDropdown
            friends={friends}
            control={control}
            editFriends={editFriends}
          />
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
