import React from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import db from "../../utils/localstoragedb";

export default function CreateExpense() {
  const { groupData, expenses, setExpenses, handleSetModal } = UseDataContext();
  const [groupFriendsList, setGroupFriendsList] = React.useState([]);
  const [totalWeight, setTotalWeight] = React.useState(100);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [customError, setCustomError] = React.useState("");

  //an array to hold the weight object array
  const [weights, setWeights] = React.useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    getFieldState,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "Kris",
      description: "Matt",
      amount: 500,
      weight: 0,
    },
  });
  getFieldState("test");

  React.useEffect(() => {
    console.log("useEffect", groupFriendsList);
    //function to set up the weight array
    //creat a weight object array to be store in db
    setWeights(convertWeightToArray(groupFriendsList));
    console.log("This is the weight object", weights);
  }, [groupFriendsList]);

  React.useEffect(() => {
    assignWeightedAmounts();
  }, [totalAmount]);

  const id = nanoid();

  const onSubmit = (values) => {
    console.log("submittedValues", values, values.weight);
    // setWeights(convertWeightToArray(groupFriendsList));
    // console.log("weights", weights);
    //store the weight object from the saved state
    // const retrieveWeight = [...weights];
    // console.log("This is the retrieve weight object", retrieveWeight);
    const addBackWeight = values.weight.map((percentage, i) => {
      //discard the user info
      if (i === 0) {
        null;
      }
      console.log("Show me the weights", typeof percentage, percentage);
      //update the percentage in weight
      weights[i].percentage = percentage;
      console.log("percentage", percentage);
      //update the contribution in weight
      // weights[i - 1].contribution = values.contribution[i];
      // console.log("contribution", values.contribution)

      return weights;
    });
    // console.log("addBackWeight", addBackWeight);
    // console.log("weights", weights);
    // createExpense({ ...values, id });

    handleSetModal();
  };

  // console.log("addBackWeight", addBackWeight);
  console.log("weights", weights);

  // const createExpense = (values) => {
  //   const newExpense = { ...values, date: new Date(), id };
  //   setExpenses([...expenses, newExpense]);
  //   // db.insert("expenses", newExpense);
  //   // db.commit();
  // };

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

    // for (let i = 0; i < friendsArr.length + 1; i++) {
    //   console.log(" Iam setting up defaults", i);
    //   setValue(`weight.${i}`, 0);
    //   setValue(`contribution.${i}`, 0);
    // }
  };

  //do on button click or on EditExpense load
  // const convertWeightToAmount = (e, i, x = 0) => {
  //   //retrieve the amount from the amount input
  //   //setTotalAmount(getValues("amount"));
  //   const amount = getValues("amount");
  //   //calculate the contribution
  //   const toConvert = x ? Number(e.target.value) : x;
  //   // setTotalAmount(totalAmount * (toConvert / 100));
  //   const amountConverted = amount * (toConvert / 100);
  //   //console.log(amountConverted);
  //   setValue(`contribution.${i}`, amountConverted);
  //   setTotalAmount(amountConverted);
  //   return amountConverted;
  // };

  const assignWeightedAmounts = (e) => {
    console.log("getFieldState(`weight`)", getFieldState("weight"));
    let numOfDefault = groupFriendsList.length + 1;

    if (getFieldState("weight").isDirty) {
      setTotalWeight(totalWeight - e.target.value);
    } else {
      return numOfDefault--;
    }
    console.log("numOfDefault", numOfDefault);
    console.log("weight", getValues("weight"));
    let defaultAmount = totalWeight / numOfDefault;
  };

  const convertedToDollars = () => {
    console.log("printingDollars");
  };

  // const assignWeightedAmounts = () => {
  //   // const retrieveWeight = [...weight];
  //   let percentageRemaining = 100;
  //   let numberZeroFields = 0;
  //   let whateverRemaining = 0;
  //   const arr = getValues("weight");
  //   const arr2 = Object.values(arr);
  //   //check for zeros
  //   console.log("These are getValues", getValues("weight"));
  //   console.log("and this is the arr", arr2, typeof arr2);
  //   for (let i = 0; i < weight.length; i++) {
  //     console.log(
  //       "Let's get the values",
  //       typeof arr2.i,
  //       typeof arr2[i],
  //       arr2[i],
  //     );
  //     if (arr2[i] === "" || arr2[i] === "0" || arr2[i] === 0) {
  //       numberZeroFields++;
  //     } else {
  //       percentageRemaining -= arr[i];
  //     }
  //   }
  //   console.log("These are getValues", getValues("weight"));
  //   console.log(numberZeroFields);

  //   for (let i = 0; i < weight.length; i++) {
  //     whateverRemaining = percentageRemaining / numberZeroFields;
  //     console.log("first", percentageRemaining, whateverRemaining);
  //     if (arr2[i] === "" || arr2[i] === "0" || arr2[i] === 0) {
  //       convertWeightToAmount("", i, whateverRemaining);
  //       console.log(percentageRemaining, whateverRemaining);
  //     }
  //   }

  // for (let i = 0; i < weight.length + 1; i++) {
  //   const retrieveInput = getValues(`weight.${i}`);
  //   console.log("Hello", retrieveInput, i);
  //   // if (retrieveInput.value === 0) {
  //     retrieveWeight[i - 1].percentage =  percentageRemainging / numberZeroFields ;
  //     retrieveWeight[i - 1].contribution = values.contribution[i];
  //   // }
  // }
  // }

  const clearNames = () => {
    setGroupFriendsList([]);
  };

  //set up the weight object
  const convertWeightToArray = (friendsListArray) => {
    console.log("These are ids", friendsListArray);
    //clear the array
    setWeights([]);
    //array to insert data into the weight State
    const arrObj = [];
    // setUp the structure for the weight object
    const weightStructure = { id: "", percentage: 0, contribution: 0 };
    // map the friends ids into id object
    friendsListArray.map((friend) => {
      arrObj.push({ ...weightStructure, id: friend.id });
    });
    console.log("This is console", arrObj);
    return arrObj;
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
          {/* user contribution */}
          <div>
            <label className="mr-2">Me</label>

            <input
              placeholder="0"
              {...register(`weight.0`, {
                pattern: {
                  defaultValue: 0,
                  value: /^[0-9]{2}$/i,
                  message: "invalid type, please enter a number between 1-100%",
                },
              })}
              onChange={(e) => {
                // convertWeightToAmount(e, 0);
                assignWeightedAmounts(e);
              }}
            />
            <label>Amount Due: {convertedToDollars}</label>
          </div>
          {groupFriendsList.map((f, i) => {
            return (
              <div key={f.id}>
                <label className="mr-2">{f.name}</label>

                <input
                  placeholder="0"
                  {...register(`weight.${i + 1}`, {
                    pattern: {
                      value: /^[0-9]{2}$/i,
                      message:
                        "invalid type, please enter a number between 1-100%",
                    },
                  })}
                  onChange={(e) => {
                    // convertWeightToAmount(e, i + 1);
                    assignWeightedAmounts(e);
                  }}
                />
                <label>Amount Due: {convertedToDollars}</label>
              </div>
            );
          })}
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
