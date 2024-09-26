import React from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
// import PropTypes from "prop-types";

export default function CreateExpense() {
  const { groupData, expenses, setExpenses, modal, handleSetModal } =
    UseDataContext();
  const currentExpense = expenses.find((expense) => expense.ID === modal.id);
  const [groupFriendsList, setGroupFriendsList] = React.useState([]);

  const weightTransformed = Object.keys(currentExpense.weight).map((key) => ({
    // return an object instead
    [currentExpense.groupId]: currentExpense.weight[key],
  }));

  // console.log("currentExpenseWeight", currentExpense.weight);
  // console.log("weightTransformed", weightTransformed);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: currentExpense?.name,
      description: currentExpense?.description,
      category: currentExpense?.category,
      amount: currentExpense?.amount,
      groupId: currentExpense?.groupId,
      weight: currentExpense?.weight,
    },
  });

  // console.log("currentExpense", currentExpense);
  // console.log("weightTransformed", weightTransformed);

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
      handleSelectedGroup();
    }
  }, [currentExpense]);

  const onSubmit = (values) => {
    weightCalc(values);
    // editExpense({ ...values });
    db.update("expenses", { groupId: currentExpense.groupId }, function (row) {
      row.weight = { ...values.weight };
      return row;
    });
    db.commit();
    // console.log("viewAll", { ...values, ...values.weight });
    setExpenses(db.queryAll("expenses"));
    // console.log("These are the values: ", ...values);
    handleSetModal();
  };

  // const weightTransformed = Object.values(currentExpense.weight);
  console.log("currentExpense.weight", currentExpense.weight);
  console.log("weightTransformed", weightTransformed);

  const weightCalc = () => {
    return weightTransformed.reduce((acc, weightObj) => {
      const key = Object.keys(weightObj)[0];
      parseInt(weightObj[key]);
      acc += parseInt(weightObj[key]);
      console.log("acc", acc);
      if (acc > 100) {
        console.log("total weights cannot be more than 100");
      } else {
        console.log("you're all goood");
      }
      return acc;
    }, 0);
  };

  const handleSelectedGroup = () => {
    //clear slate of names every time new group is chosen
    clearNames();
    //query db for match with chosen id, grab nested friend objects
    console.log("currentExpense.groupId", currentExpense.groupId);
    const friendsArr = db.queryAll("groups", {
      query: { id: currentExpense.groupId },
    })[0].friendIDs;
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
            autoComplete="name"
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
            autoComplete="description"
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
            autoComplete="category"
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
            autoComplete="amount"
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
            autoComplete="groupId"
            disabled
            {...register("groupId", {
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

        {currentExpense.groupId.length > 0 && (
          <div className="mb-2">
            <label className="mr-2">Weight Adjustment: </label>
            {groupFriendsList.map((f) => (
              <div key={f.id}>
                <label className="mr-2">{f.name} </label>
                <input
                  autoComplete={`weight.${f.id}`}
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
        )}

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
