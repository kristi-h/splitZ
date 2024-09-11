import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'

export default function CreateGroup({ groupData, setGroupData }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (values) => {
    setGroupData((prev) => [...prev, { ...values, id: nanoid() }])
  }
  console.log(groupData)

  return (
    <>
      <h1 className="text-2xl">Create a group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name</label>
          <input
            placeholder="Name"
            {...register('name', { required: 'Required' })}
          />
          {/* {errors.name && errors.name.message} */}
        </div>

        <div className="mb-2">
          <label className="mr-2">Description</label>
          <input
            placeholder="What is this group about"
            {...register('description', { required: 'Required' })}
          />
          {/* {errors.description && errors.description.message} */}
        </div>

        <div className="mb-2">
          <label className="mr-2">Budget</label>
          <input
            placeholder="Enter a value"
            {...register('budget', {
              required: 'Required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'invalid type, please enter a number',
              },
            })}
          />
          <div>{errors.budget && errors.budget.message}</div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}
