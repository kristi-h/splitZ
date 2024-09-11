import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import Button from './Button'

export default function CreateGroup({ groupData, setGroupData }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (values) => {
    setGroupData((prev) => [...prev, { ...values, id: nanoid() }])
  }
  // console.log(groupData)

  return (
    <>
      <h1 className="text-2xl mb-4">Create a group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name</label>
          <input
            placeholder="Name"
            {...register('name', { required: 'name is required' })}
          />
          <div className="text-xs font-light text-red-500">
            {errors.name && errors.name.message}
          </div>
        </div>

        <div className="mb-2">
          <label className="mr-2">Description</label>
          <input
            placeholder="What is this group about"
            {...register('description', {
              required: 'description is required',
            })}
          />
          <div className="text-xs font-light text-red-500">
            {errors.description && errors.description.message}
          </div>
        </div>

        <div className="mb-4">
          <label className="mr-2">Budget</label>
          <input
            placeholder="Enter a value"
            {...register('budget', {
              required: 'budget is required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'invalid type, only numbers allowed',
              },
            })}
          />
          <div className="text-xs font-light text-red-500">
            {errors.budget && errors.budget.message}
          </div>
        </div>

        <Button>Submit</Button>
      </form>
    </>
  )
}
