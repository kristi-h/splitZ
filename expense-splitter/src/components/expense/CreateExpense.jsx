import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import db from "../../utils/localstoragedb";

export default function CreateExpense() {
  const {
    groupData,
    expenses,
    setExpenses,
    setGroupData,
    handleSetModal,
    friends,
  } = UseDataContext();

  const initialFriend = {
    name: "Me",
    weight: 0,
  };

  const [allFriends, setAllFriends] = useState([initialFriend]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch, // lets use this to track values
  } = useForm({
    defaultValues: {
      // default values for testing only
      name: "Binocular shopping",
      description: "Shopping for binocs",
      amount: 500,
    },
  });

  // watch all fields
  const watchedValues = watch();

  // get the group that was selected
  // const groupSelected = watch("group");

  // get the budget
  // const budget = watch("amount");

  useEffect(() => {
    // start with initialFriend aka app user
    setAllFriends([initialFriend]);
    // add the friends in the group
    setAllFriends((prev) => [...prev, ...friendsInGroup]);
  }, [watchedValues["group"]]);

  // useEffect(() => {
  //   const watchedValue = watch(friend.name);
  //   setAllFriends((prev) =>
  //     prev.map((frd) =>
  //       frd.name === friend.name ? { ...frd, weight: watchedValue } : frd,
  //     ),
  //   );
  // })

  const handleWeights = () => {};

  // get the friends in the group
  const friendIdsArr = groupData.find(
    (group) => group.id === watchedValues["group"],
  )?.friendIDs;

  const friendsInGroup = friends
    .filter((friends) => friendIdsArr?.includes(friends.id))
    .map((friend) => ({ name: friend.name, weight: 0 }));

  // generate friend contribution fields
  const friendContributionFields = allFriends?.map((friend) => {
    const watchedValue = watch(friend.name);
    return (
      <div
        key={friend.name}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <label className="mr-2">{friend.name}</label>
        <input
          className="ml-auto w-20 text-center"
          name={friend.name}
          placeholder="0"
          {...register(`${friend.name}`, {
            pattern: {
              value: /^[0-9]{1,2}$/i,
              message: "invalid type, please enter a number between 1-100%",
            },
          })}
        />
        <div className="field w-20 text-center">
          {/* display dollar amount based on percentage */}$
          {(parseFloat(watchedValues["amount"]) * watchedValue) / 100 || 0}
        </div>
      </div>
    );
  });

  console.log(allFriends);

  const id = nanoid();

  const onSubmit = (values) => {
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
          />
          {errors.amount && (
            <p style={{ color: "red" }}> {errors.amount.message} </p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="group" className="mb-2" aria-required="true">
            Group Name:*
          </label>

          <select
            name="group"
            {...register("group", {
              required: "select a group to apply this expense to",
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

        <div className="mb-8">
          {watchedValues["group"] && (
            <>
              <h2 className="mb-4">Weight Contribution:*</h2>
              {friendContributionFields}
            </>
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

// db.update("groups", { ID: values.group }, (row) => ({
//   ...row,
//   ...row.expenseIDs.map((id) => [...id, values.id]),
// }));
