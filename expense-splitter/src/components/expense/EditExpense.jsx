import React from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";

export default function CreateExpense() {
  const { groupData, expenses, setExpenses, modal, handleSetModal } =
    UseDataContext();
  const [groupFriendsList, setGroupFriendsList] = React.useState([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const currentExpense = expenses.find((expense) => expense.ID === modal.id);
  //   const involvedFriends = currentExpense[groupId][friendIDs];

  React.useEffect(() => {
    if (currentExpense) {
      reset({
        name: currentExpense.name || "",
        description: currentExpense.description || "",
        category: currentExpense.category || "",
        amount: currentExpense.amount || "",
        groupId: currentExpense.groupId || "",
        weight: currentExpense.weight || "",
      });
    }
  }, [currentExpense]);

  const onSubmit = (values) => {
    // editExpense({ ...values });
    db.insertOrUpdate("expenses", { ID: currentExpense.ID }, { ...values });
    db.commit();
    setExpenses(db.queryAll("expenses"));
    console.log("These are the values: ", values);
    handleSetModal();
  };

  const handleSelectedGroup = (event) => {
    //clear slate of names every time new group is chosen
    clearNames();
    const selectedId = event.target.value;
    //query db for match with chosen id, grab nested friend objects
    const friendsArr = db.queryAll("groups", { query: { id: selectedId } })[0]
      .friendIDs;
    //grab each friend obj and set state
    friendsArr.map((f) => {
      const friendObj = db.queryAll("friends", { query: { id: f } })[0];
      setGroupFriendsList((groupFriendsList) => [
        ...groupFriendsList,
        friendObj,
      ]);
    });
  };

  const clearNames = () => {
    setGroupFriendsList([]);
  };

  console.log("currentExpense", currentExpense);

  return (
    <div className="mb-5">
      <h1 className="text-center">Edit Expense </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col">
          <label className="mb-1" aria-required="true">
            Name:*{" "}
          </label>
          <input
            placeholder="Name of expense"
            {...register("name", { required: "name is required" })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1" aria-required="true">
            Description:*{" "}
          </label>
          <input
            placeholder="Describe the expense"
            defaultValue={currentExpense.description}
            {...register("description", {
              required: "description is required",
            })}
          />
          <div className="error-text">
            {errors.description && errors.description.message}
          </div>
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="category" className="mb-1" aria-required="true">
            Category:*
          </label>
          <select
            name="category"
            {...register("category", {
              required: "select a category",
            })}
          >
            <option value=""></option>
            <option value="entertainment">Entertainment</option>
            <option value="gift">Gift</option>
            <option value="groceries">Groceries</option>
            <option value="restaurant">Restaurant</option>
            <option value="shopping">Shopping</option>
            <option value="trip">Trip</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>

          {errors.category && (
            <p style={{ color: "red" }}> {errors.category.message}</p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1" aria-required="true">
            Amount:*{" "}
          </label>
          <input
            placeholder="Enter a value"
            {...register("amount", {
              required: "amount required",
              pattern: {
                value: /^[0-9]*(.[0-9]{2})?$/i,
                message: "invalid type, please enter a number from 0-100",
              },
            })}
          />
          {errors.amount && (
            <p style={{ color: "red" }}> {errors.amount.message} </p>
          )}
        </div>

        <div className="mb-5 flex flex-col" aria-required="true">
          <label htmlFor="groupId" className="mb-2">
            Group Name:*
          </label>

          <select
            name="groupId"
            {...register("groupId", {
              onChange: (event) => {
                handleSelectedGroup(event);
              },
              required: "select a group to apply this expense",
            })}
          >
            <option value=""></option>
            {groupData.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          {errors.group && (
            <p style={{ color: "red" }}> {errors.group.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="mr-2">Weight Adjustment: </label>
          {groupFriendsList.map((f) => (
            <div key={f.id}>
              <label className="mr-2">{f.name} </label>
              <input
                placeholder="0"
                {...register(`weight.${f.id}`, {
                  pattern: {
                    value: /^[0-9]{1,2}$/i,
                    message:
                      "invalid type, please enter a number between 1-100%",
                  },
                })}
              />
            </div>
          ))}

          {errors.weight && (
            <p style={{ color: "red" }}> {errors.weight.message} </p>
          )}
        </div>

        <div className="flex">
          <Button className="w-full md:w-auto">Submit</Button>
          <Button onClick={handleSetModal} className="ml-4 w-full md:w-auto">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
