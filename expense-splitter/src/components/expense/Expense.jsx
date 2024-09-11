import {useState} from 'react'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'

export default function Expense(){
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm()

    const [expense, setExpense] = useState([])
    console.log(expense)

    const onSubmit = (values) => {
        setExpense(prev => [...prev, { ...values, id: nanoid(), date: new Date() }])
      }

    return(
        <>
      <h1 className="text-2xl">Create an Expense </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name: </label>
          <input
            placeholder="Name of expense"
            {...register('name', { required: 'Required' })}
          />
          {/* {errors.name && errors.name.message} */}
        </div>

        <div className="mb-2">
          <label className="mr-2">Description: </label>
          <input
            placeholder="Describe the expense"
            {...register('description', { required: 'Required' })}
          />
          {/* {errors.description && errors.description.message} */}
        </div>

        {/* <div className="mb-2">
            <label htmlFor="category" className="mr-2">
                Category:
            </label>

            <select 
                name="category" 
                {...register(category, {
                required: "select a category"
                })}>
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

            {errors.func && <p style={{color:'red'}}> {errors.func.message}</p> }
        </div> */}


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
          <label className="mr-2">Participant: </label>
          <input
            placeholder="Add person or group to link"
            {...register('participant', { required: 'Required' })}
          />
          {/* {errors.description && errors.description.message} */}
        </div>

        {/* <div className="mb-2">
          <label className="mr-2">Date:</label>
          <input
            placeholder="Date created"
            {...register('date', { required: 'Required' })}
          />
          {errors.description && errors.description.message}
        </div> */}


        <button type="submit">Submit</button>
      </form>
    </>
    )
}