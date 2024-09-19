import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import { nanoid } from "nanoid";
import ReceiptUpload from "../upload/ReceiptUpload";
import db from "../../utils/localstoragedb";

export default function CreateExpense() {
  const { groupData, expenses, setExpenses, handleSetModal } = UseDataContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const id = nanoid();

  const onSubmit = (values) => {
    createExpense({ ...values, id });
    handleSetModal();
  };

  const createExpense = (values) => {
    const newExpense = { ...values, date: new Date() };
    setExpenses([...expenses, newExpense]);
    db.insert("expenses", newExpense);
    db.commit();
  };

  // console.log(expenses)

  return (
    <div className="mb-5">
      <h1 className="text-center">Create an Expense </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col">
          <label className="mb-1">Name: </label>
          <input
            placeholder="Name of expense"
            {...register("name", { required: "name is required" })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-5 flex flex-col">
          <label className="mb-1">Description: </label>
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
          <label htmlFor="category" className="mb-1">
            Category:
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
          <label className="mb-1">Amount: </label>
          <input
            placeholder="Enter a value"
            {...register("amount", {
              required: "amount required",
              pattern: {
                value: /^[0-9]*$/i,
                message: "invalid type, please enter a number from 0-100",
              },
            })}
          />
          {errors.amount && (
            <p style={{ color: "red" }}> {errors.amount.message} </p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="group" className="mb-2">
            Group Name:
          </label>

          <select
            name="group"
            {...register("group", {
              required: "select a group to apply this expense",
            })}
          >
            <option value=""></option>
            {groupData.map((group) => (
              <option key={group.id} value="{group.id}">
                {group.name}
              </option>
            ))}
          </select>

          {errors.group && (
            <p style={{ color: "red" }}> {errors.group.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="mr-2">Weight: </label>
          <input
            defaultValue="0"
            placeholder=""
            {...register("weight", {
              pattern: {
                value: /^[0-9]*$/i,
                message: "invalid type, please enter a number between 1-100%",
              },
            })}
          />
          <div>{errors.budget && errors.budget.message}</div>
        </div>

        <ReceiptUpload />

        <div className="flex gap-8">
          <Button className="w-full md:w-auto">Submit</Button>
          <Button onClick={handleSetModal} className="w-full md:w-auto">
            Cancel
          </Button>
          <Button className="w-full bg-primary md:w-auto">Submit</Button>
        </div>
      </form>
    </div>
  );
}
