import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import db from "../../utils/localstoragedb";
import { categories } from "../../utils/dummyData";
import { useNavigate } from "react-router-dom";

export default function CreateExpense() {
  const { groupData, setExpenses, setGroupData, handleSetModal, friends } =
    UseDataContext();

  const navigate = useNavigate();

  const [allFriends, setAllFriends] = useState([]);
  const [weightLimitExceeded, setWeightLimitExceeded] = useState(false);

  const {
    handleSubmit,
    register,
    watch, // lets use this to track values
    formState: { errors },
  } = useForm({
    defaultValues: {
      // default values for testing only
      name: "Munchies",
      description: "Junky stuff for the trip in",
      amount: 500,
    },
  });

  // watch all fields
  const watchedValues = watch();
  console.log(watchedValues);

  useEffect(() => {
    // reset all friends in group
    setAllFriends([]);
    // spread in friends in group
    setAllFriends((prev) => [...prev, ...friendsInGroup]);
  }, [watchedValues["group"]]);

  // update weight/dollar on weight value/amount change
  useEffect(() => {
    // get friends with non-zeros
    const getFriendsWithNonZeros = () => {
      let results = [];
      allFriends.forEach((friend) => {
        console.log("friend", friend);
        if (watchedValues[friend.name] != "0") {
          results.push({ ...friend, weight: watchedValues[friend.name] });
        }
      });
      return results;
    };
    const friendsWithNonZeros = getFriendsWithNonZeros();
    console.log("getFriendsWithNonZeros", friendsWithNonZeros);
    // calculate non-zero percentage
    const nonZeroPercentage = friendsWithNonZeros.reduce(
      (acc, curr) => acc + parseInt(curr.weight),
      0,
    );
    console.log("nonZeroPercentage", nonZeroPercentage);

    // update weight/dollar on weight value change
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
          : (parseFloat(watchedValues[friend.name]) * watchedValues["amount"]) /
            100;
      const newZeroWeight =
        (100 - nonZeroPercentage) /
        (allFriends.length - friendsWithNonZeros.length);
      console.log(newWeight, nonZeroPercentage);
      const weightLimit = nonZeroPercentage - parseInt(newWeight);
      console.log("weightLimit", weightLimit);
      const acceptedWeight =
        parseInt(newWeight) <= weightLimit ? newWeight : "0";

      // if a new weight has been inputted
      return newWeight !== "0"
        ? {
            ...friend,
            weight: acceptedWeight.toString(),
            dollar: !newWeight ? 0 : `$${newDollar.toFixed(2)}`,
          }
        : {
            ...friend,
            weight: newZeroWeight,
            dollar: !newZeroWeight
              ? 0
              : `$${((newZeroWeight * watchedValues["amount"]) / 100).toFixed(2)}`,
          };
    });
    // check for exceeded weight
    const exceededWeight = updatedFriends.some(
      (friend) => parseInt(friend.weight) < 0,
    );
    console.log("exceededWeight", exceededWeight);
    setWeightLimitExceeded(nonZeroPercentage > 100);
    setAllFriends(updatedFriends);
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
        className="mb-2 grid grid-cols-3 items-center justify-between gap-2"
      >
        <label className="mr-2">{friend.name}</label>
        <div className="relative ml-auto flex w-[68px] items-center">
          <input
            className="w-full pr-4"
            name={friend.name}
            required
            placeholder="0"
            defaultValue={0}
            {...register(`${friend.name}`, {
              pattern: {
                value: /^\d{1,2}$/,
                message:
                  "Invalid input. Please enter a number between 0 and 99.",
              },
            })}
            // restrict to a max of 2 digits
            onInput={(e) => {
              const input = e.target;
              if (input.value.length > 2) {
                input.value = input.value.slice(0, 2);
              }
            }}
          />
          <span className="absolute right-4 font-roboto font-light text-gray-800">
            %
          </span>
        </div>
        <div className="rounded-lg bg-accent/50 p-5 text-center font-semibold">
          {friend.dollar}
        </div>
      </div>
    );
  });

  console.log("allFriends", allFriends);

  const onSubmit = (values) => {
    // get friends with non-zeros
    const friendsWithNonZeros = allFriends.filter(
      (friend) => friend.weight != "0" && friend.name,
    );
    // console.log(friendsWithNonZeros);

    // calculate non-zero percentage
    const nonZeroPercentage = friendsWithNonZeros.reduce(
      (acc, curr) => acc + parseInt(curr.weight),
      0,
    );
    // console.log(nonZeroPercentage);
    const id = nanoid();
    const weightObj = allFriends.map((friend) => {
      const finalWeight =
        friend.weight === "0"
          ? // subtract non-zero percentage and divide by remaining friends
            (
              (100 - nonZeroPercentage) /
              (allFriends.length - friendsWithNonZeros.length)
            ).toFixed()
          : parseInt(friend.weight);
      return { friendId: friend.id, percentage: finalWeight };
    });
    console.log("weightObj", weightObj);
    const newExpense = {
      id,
      ...values,
      date: new Date(),
      weight: weightObj,
      groupId: values.group,
    };

    db.insert("expenses", { ...newExpense });
    // update groups state with new expense id
    setGroupData((prev) =>
      prev.map((group) =>
        group.id === values.group
          ? { ...group, expenseIDs: [...group.expenseIDs, id] }
          : group,
      ),
    );
    // update groups with new expense id
    db.update("groups", { id: values.group }, (row) => ({
      ...row,
      expenseIDs: [...row.expenseIDs, id],
    }));
    db.commit();
    // update expenses state with new db values
    setExpenses(db.queryAll("expenses"));
    handleSetModal();
    navigate(`/expenses/${id}`);
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
            {...register("name", { required: "A name is required" })}
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
              required: "A description is required",
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
              required: "Please select a category",
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
            <p className="error-text"> {errors.category.message}</p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1" aria-required="true">
            Amount:*{" "}
          </label>
          <input
            placeholder="Enter a value"
            {...register("amount", {
              required: "Please enter an amount",
              pattern: {
                value: /^[0-9]*(.[0-9]{2})?$/i,
                message: "invalid type, please enter a number from 0-100",
              },
            })}
          />
          {errors.amount && (
            <p className="error-text"> {errors.amount.message} </p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="group" className="mb-2" aria-required="true">
            Group Name:*
          </label>

          <select
            name="group"
            {...register("group", {
              required: "Pleaes select a group to apply this expense to",
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
            <p className="error-text"> {errors.group.message}</p>
          )}
        </div>

        <div className="mb-8">
          {watchedValues["group"] && (
            <>
              <h2 className="mb-4">Weight Contribution:*</h2>
              {weightLimitExceeded && (
                <p className="error-text mb-2">
                  Combined weights exceed 100%. Please adjust the amounts.
                </p>
              )}
              {friendContributionFields}
            </>
          )}
        </div>

        <div className="flex gap-8">
          <Button onClick={handleSetModal} className="w-full md:w-auto">
            Cancel
          </Button>
          {weightLimitExceeded ? (
            <Button
              disabled={true}
              className="w-full cursor-not-allowed bg-primary opacity-25 md:w-auto"
            >
              Submit
            </Button>
          ) : (
            <Button className="w-full bg-primary md:w-auto">Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
}
