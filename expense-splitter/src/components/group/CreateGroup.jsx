import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { UseDataContext } from '../context/SiteContext'

export default function CreateGroup({
  DisplayCreateGroupForm,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const { groupData, setGroupData } = UseDataContext()

  const onSubmit = (values) => {
    setGroupData((prev) => [...prev, { ...values, id: nanoid() }])
  }
  // console.log(groupData)

  return (
    <div className="mb-5">
      <h1>Create a group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="mr-2">Name</label>
          <input
            placeholder="Name"
            {...register('name', { required: 'name is required' })}
          />
          <div className="error-text">{errors.name && errors.name.message}</div>
        </div>

        <div className="mb-2">
          <label className="mr-2">Description</label>
          <input
            placeholder="What is this group about"
            {...register('description', {
              required: 'description is required',
            })}
          />
          <div className="error-text">
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
          <div className="error-text">
            {errors.budget && errors.budget.message}
          </div>
        </div>

        <Button>Submit</Button>
        <Button onClick={DisplayCreateGroupForm} className="ml-4">
          Cancel
        </Button>
      </form>
    </div>
  )
}
