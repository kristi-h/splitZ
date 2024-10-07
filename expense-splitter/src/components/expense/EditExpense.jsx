import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import db from "../../utils/localstoragedb";
import { categories } from "../../utils/dummyData";

export default function CreateExpense() {
  const { groupData, friends, expenses, setExpenses, modal, handleSetModal } =
    UseDataContext();
  const [currentExpense, setCurrentExpense] = useState({});
  const [allFriends, setAllFriends] = useState([]);

  const {
    handleSubmit,
    register,
    reset,
    watch, // lets use this to track values
    formState: { errors },
  } = useForm();

  // watch all fields
  const watchedValues = watch();
  console.log(watchedValues);

  // load current expense and friends in state on initial render
  useEffect(() => {
    const initialExpense = expenses.find((expense) => expense.ID === modal.id);
    setCurrentExpense(initialExpense);

    const friendIdsArr = initialExpense.weight?.map(
      (friend) => friend.friendId,
    );

    const friendsInGroup = friends.filter((friend) =>
      friendIdsArr.includes(friend.id),
    );
    console.log("initialExpense", initialExpense);

    const friendObjs = initialExpense.weight.map((item) => {
      if (friendIdsArr.includes(item.friendId)) {
        const friendName = friendsInGroup?.filter(
          (friend) => friend.id === item.friendId,
        );
        console.log(item.percentage);
        const dollarValue =
          (parseFloat(item.percentage) * initialExpense.amount) / 100;
        return {
          id: item.friendId,
          weight: item.percentage.toString(),
          name: friendName[0]?.name,
          dollar: dollarValue.toString(),
        };
      }
    });

    setAllFriends(friendObjs);

    // get the friend values for weights
    // populate the initial form values
    const friendValues = friendObjs.reduce((acc, friend) => {
      acc[friend.name] = friend.weight;
      return acc;
    }, {});
    // console.log("friendValues", friendValues);

    const valuesObj = {
      name: currentExpense.name || "",
      description: currentExpense.description || "",
      category: currentExpense.category || "",
      amount: currentExpense.amount || "",
      group: currentExpense.groupId || "",
      receipt_URL: currentExpense.receipt_URL || "",
      ...friendValues,
    };
    // console.log("valuesObj", valuesObj);
    reset(valuesObj);

    // const friendIdsArr = groupData.find(
    //   (group) => group.id === watchedValues["group"],
    // )?.friendIDs;

    // const friendsInGroup = friends
    //   .filter((friends) => friendIdsArr?.includes(friends.id))
    //   .map((friend, i) => {
    //     console.log(friend);
    //     return {
    //       name: friend.name,
    //       weight: "5",
    //       id: friendIdsArr[i],
    //       dollar: "0",
    //     };
    //   });
    // setAllFriends(friendsInGroup);
  }, [currentExpense]);

  console.log("allFriends", allFriends);
  // populate the initial form values
  // useEffect(() => {
  //   if (currentExpense) {
  //     // get the friend values for weights
  //     const friendValues = allFriends.reduce((acc, friend) => {
  //       acc[friend.name] = friend.weight;
  //       return acc;
  //     }, {});
  //     console.log("friendValues", friendValues);

  //     const valuesObj = {
  //       name: currentExpense.name || "",
  //       description: currentExpense.description || "",
  //       category: currentExpense.category || "",
  //       amount: currentExpense.amount || "",
  //       group: currentExpense.groupId || "",
  //       receipt_URL: currentExpense.receipt_URL || "",
  //       ...friendValues,
  //       // weight: currentExpense.weight || "",
  //     };
  //     console.log("valuesObj", valuesObj);
  //     reset(valuesObj);
  //   }
  // }, [currentExpense]);

  // generate the dollar amount based on weight
  useEffect(() => {
    // only update when more than one friend to avoid 'Me' overwrite
    if (allFriends.length > 1) {
      const updatedFriends = allFriends.map((friend) => {
        const newWeight = watchedValues[friend.name];
        const zeroDefault =
          watchedValues["amount"] / parseFloat(allFriends.length);
        // console.log("newWeight", newWeight);
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

  // if group is changed, get new friends
  useEffect(() => {
    // reset to initial friend
    // setAllFriends([initialFriend]);
    // spread in friends in group
    // get the friends in the group

    const friendIdsArr = groupData.find(
      (group) => group.id === watchedValues["group"],
    )?.friendIDs;

    const friendsInGroup = friends
      .filter((friends) => friendIdsArr?.includes(friends.id))
      .map((friend, i) => ({
        name: friend.name,
        weight: 0,
        id: friendIdsArr[i],
      }));
    // console.log("friendsInGroup", friendsInGroup);
    setAllFriends(friendsInGroup);
    // setAllFriends((prev) => [...prev, ...friendsInGroup]);
  }, [watchedValues["group"]]);

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
          {...register(friend.name, {
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

  const onSubmit = (values) => {
    const { ID } = expenses.find((expense) => expense.id === currentExpense.id);
    const weightObj = allFriends.map((friend) => ({
      friendId: friend.id,
      percentage: parseInt(friend.weight),
    }));
    const updatedExpense = {
      amount: values.amount,
      category: values.category,
      name: values.name,
      description: values.description,
      weight: weightObj,
      groupId: values.group,
    };
    console.log("updatedExpense", updatedExpense);
    db.insertOrUpdate("expenses", { ID: ID }, { ...updatedExpense });
    db.commit();
    // update expenses state with new db values
    setExpenses(db.queryAll("expenses"));
    handleSetModal();
  };

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

        <div className="mb-5 flex flex-col" aria-required="true">
          <label htmlFor="group" className="mb-2">
            Group Name:*
          </label>

          <select
            name="group"
            {...register("group", {
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

// const friendsInGroup = initialExpense?.weight
//       .filter((friends) => friendIdsArr?.includes(friends.id))
//       .map((friend, i) => ({
//         name: friend.name,
//         weight: 0,
//         id: friendIdsArr[i],
//       }));
//     console.log("friendsInGroup", friendsInGroup);

// useEffect(() => {
//   const initialExpense = expenses.find((expense) => expense.ID === modal.id);
//   setCurrentExpense(initialExpense);

//   const friendIdsArr = initialExpense.weight?.map(
//     (friend) => friend.friendId,
//   );

//   console.log("initialExpense", initialExpense);

//   const friendsInGroup = friends
//     .filter((friends) => friendIdsArr?.includes(friends.id))
//     .map((friend, i) => ({
//       name: friend.name,
//       weight: 0,
//       id: friendIdsArr[i],
//     }));
//   console.log("friendsInGroup", friendsInGroup);
//   setAllFriends(friendsInGroup);
// }, []);
