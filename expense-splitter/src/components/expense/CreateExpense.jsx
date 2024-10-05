import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import db from "../../utils/localstoragedb";
import { categories } from "../../utils/dummyData";

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
    id: "1",
    name: "Me",
    weight: 0,
    dollar: 0,
  };

  const [allFriends, setAllFriends] = useState([]);

  const {
    handleSubmit,
    register,
    watch, // lets use this to track values
    formState: { errors },
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
  console.log(watchedValues);

  useEffect(() => {
    // reset to initial friend
    setAllFriends([initialFriend]);
    // spread in friends in group
    setAllFriends((prev) => [...prev, ...friendsInGroup]);
  }, [watchedValues["group"]]);

  useEffect(() => {
    // only update when more than one friend to avoid 'Me' overwrite
    if (allFriends.length > 1) {
      const updatedFriends = allFriends.map((friend) => {
        const newWeight = watchedValues[friend.name];
        const zeroDefault =
          watchedValues["amount"] / parseFloat(allFriends.length);
        console.log("newWeight", newWeight);
        // console.log(newWeight);
        // generate the dollar amount based on weight
        const newDollar =
          parseInt(newWeight) === 0
            ? zeroDefault
            : (parseFloat(watchedValues[friend.name]) *
                watchedValues["amount"]) /
              100;

        return newWeight !== undefined
          ? {
              ...friend,
              weight: newWeight,
              dollar: !newWeight ? 0 : `$${newDollar.toFixed(2)}`,
            }
          : friend;
      });
      setAllFriends(updatedFriends);
    }
    // only update state when friend values change
  }, [
    allFriends.map((friend) => watchedValues[friend.name]).join(),
    watchedValues["amount"],
  ]);

  // get the friends in the group
  const friendIdsArr = groupData.find(
    (group) => group.id === watchedValues["group"],
  )?.friendIDs;

  console.log("friendIdsArr: ", friendIdsArr);

  const friendsInGroup = friends
    .filter((friends) => friendIdsArr?.includes(friends.id))
    .map((friend, i) => ({
      name: friend.name,
      weight: 0,
      id: friendIdsArr[i],
    }));

  // generate friend contribution fields
  const friendContributionFields = allFriends?.map((friend) => {
    return (
      <div
        key={friend.name}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <label className="mr-2">{friend.name}</label>
        <input
          className="ml-auto w-[60px] text-center"
          name={friend.name}
          placeholder="0"
          defaultValue={0}
          {...register(`${friend.name}`, {
            pattern: {
              value: /^[0-9]{1,2}$/i,
              message: "invalid type, please enter a number between 1-100%",
            },
          })}
        />
        <div className="field w-28 text-center">{friend.dollar}</div>
      </div>
    );
  });

  console.log("allFriends", allFriends);

  const onSubmit = (values) => {
    const weightObj = allFriends.map((friend) => ({
      friendId: friend.id,
      percentage: parseInt(friend.weight),
    }));
    const newExpense = {
      id: nanoid(),
      ...values,
      date: new Date(),
      weight: weightObj,
      groupId: values.group,
    };

    setExpenses([...expenses, newExpense]);
    db.insert("expenses", { ...newExpense });
    // update groups state with new expense id
    setGroupData((prev) =>
      prev.map((group) =>
        group.id === values.group
          ? { ...group, expenseIDs: [...group.expenseIDs] }
          : group,
      ),
    );
    // update groups with new expense id
    db.update("groups", { id: values.group }, (row) => ({
      ...row,
      expenseIDs: [...row.expenseIDs],
    }));
    db.commit();
    // console.log(values);
    // console.log(allFriends);
    handleSetModal();
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace(/^\w/, (char) => char.toUpperCase())}
              </option>
            ))}
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
