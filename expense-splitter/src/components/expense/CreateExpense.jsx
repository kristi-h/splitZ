import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { UseDataContext } from '../context/SiteContext'

export default function CreateExpense() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const { groupData, expense, handleSetExpense } = UseDataContext()

  const onSubmit = (values) => {
    handleSetExpense(values)
  }

  // console.log(expense)

  return (
    <div className="mb-5">
      <h1>Create an Expense </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name: </label>
          <input
            placeholder="Name of expense"
            {...register('name', { required: 'name is equired' })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-2">
          <label className="mr-2">Description: </label>
          <input
            placeholder="Describe the expense"
            {...register('description', {
              required: 'description is required',
            })}
          />
          <div className="error-text">
            {errors.description && errors.description.message}
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>

          <select
            name="category"
            {...register('category', {
              required: 'select a category',
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

          {/* {errors.func && <p style={{color:'red'}}> {errors.func.message}</p> } */}
        </div>

        <div className="mb-2">
          <label className="mr-2">Amount: </label>
          <input
            placeholder="Enter a value"
            {...register('amount', {
              required: 'Required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'invalid type, please enter a number',
              },
            })}
          />
          <div>{errors.budget && errors.budget.message}</div>
        </div>

        <div className="mb-2">
          <label htmlFor="group" className="mr-2">
            Group Name:
          </label>

          <select
            name="group"
            {...register('group', {
              required: 'select a group',
            })}
          >
            {groupData.map(group=> (
               <option key={group.id} value="{group.id}">{group.name}</option>
            ))}
           
          </select>

          {/* {errors.func && <p style={{color:'red'}}> {errors.func.message}</p> } */}
        </div>

       <div className="mb-2">
            <label className="mr-2">Weight: </label>
            <input
              defaultValue="0"
              placeholder=""
              {...register('weight', {
                pattern: {
                  value: /^[0-9]*$/i,
                  message: 'invalid type, please enter a number between 1-100%',
                },
              })}
            />
            <div>{errors.budget && errors.budget.message}</div>
          </div>
        
        
        <div className="mb-2">
          <label className="mr-2">Add Receipt: </label>
          <input
            placeholder="Upload your receipt"
            {...register('receipt', {
              required: 'receipt is required',
            })}
          />
          <div className="error-text">
            {errors.description && errors.description.message}
          </div>
        </div>


        <Button>Submit</Button>
      </form>
    </div>
  )
}
