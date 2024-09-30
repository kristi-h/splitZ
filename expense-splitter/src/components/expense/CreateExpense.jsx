import React from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import db from "../../utils/localstoragedb";

export default function CreateExpense() {
  const { groupData, setGroupData, expenses, setExpenses, handleSetModal } =
    UseDataContext();
  const [groupFriendsList, setGroupFriendsList] = React.useState([]);
  const [totalWeight, setTotalWeight] = React.useState(100);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [customError, setCustomError] = React.useState("");
  const [cont, setCont] = React.useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Kris",
      description: "Matt",
      amount: 500,
    },
  });

  const id = nanoid();

  const onSubmit = (values) => {
    console.log("values", values, { ...values.weight });
    createExpense({ ...values, id });
    handleSetModal();
  };

  const createExpense = (values) => {
    const newExpense = { ...values, date: new Date() };
    console.log(newExpense);
    setExpenses([...expenses, newExpense]);
    db.insert("expenses", { ...newExpense, groupId: values.group });
    // // update groups state with new expense id
    setGroupData((prev) =>
      prev.map((group) =>
        group.id === values.group
          ? { ...group, expenseIDs: [...group.expenseIDs, values.id] }
          : group,
      ),
    );
    // update groups with new expense id
    db.update("groups", { id: values.group }, (row) => ({
      ...row,
      expenseIDs: [...row.expenseIDs, values.id],
    }));
    db.commit();
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

  const convertWeightToAmount = (e) => {
    const toConvert = Number(e.target.value);
    const amountConverted = totalAmount * (toConvert / 100);
    console.log(amountConverted);
    return amountConverted;
  };

  const clearNames = () => {
    setGroupFriendsList([]);
  };

  return (
    <div className="mb-5">
      <h1 className="text-center">Create an Expense </h1>
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
            onChange={(e) => setTotalAmount(Number(e.target.value))}
          />
          {errors.amount && (
            <p style={{ color: "red" }}> {errors.amount.message} </p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="groupId" className="mb-2" aria-required="true">
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
          <h1 className="mr-2">Weight Adjustment: </h1>
          {groupFriendsList.map((f, i) => {
            setCont((prev) => [...prev, 0]);
            return (
              <div key={f.id}>
                <label className="mr-2">{f.name}</label>
                <input
                  placeholder="0"
                  onChange={(e) => {
                    setCont((prev) => (prev[i] = convertWeightToAmount(e)));
                  }}
                />
                <input
                  placeholder="0"
                  value={cont[i]}
                  {...register(
                    `weight.id.${f.id}`,
                    `weight.contribution.${cont[i]}`,
                    {
                      pattern: {
                        value: { cont },
                        message:
                          "invalid type, please enter a number between 1-100%",
                      },
                    },
                  )}
                  onChange={(e) => {
                    console.log("Amount Changing", e.target.value);
                    setValue(`weight.contribution.${cont}`, cont);
                  }}
                />
              </div>
            );
          })}
          ;
          {errors.weight && (
            <p style={{ color: "red" }}> {errors.weight.message} </p>
          )}
        </div>

        <div className="flex gap-8">
          <Button onClick={handleSetModal} className="w-full md:w-auto">
            Cancel
          </Button>
          <Button className="w-full bg-primary md:w-auto">Submit</Button>
        </div>
      </form>
    </div>
  );
}
