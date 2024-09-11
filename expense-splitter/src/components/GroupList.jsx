import { useState } from 'react'
import Button from './Button'

export default function GroupList({ groupData }) {
  const [displayDetails, setDisplayDetails] = useState('')

  const handleDisplayDetails = (id) => {
    console.log(id)
    if (displayDetails === id) {
      setDisplayDetails('')
    } else {
      setDisplayDetails(id)
    }
  }

  const groupList = groupData.map((group) => (
    <div
      onClick={() => handleDisplayDetails(group.id)}
      key={group.id}
      className="flex flex-col bg-slate-100 rounded-md py-4 px-4 mb-1 cursor-pointer"
    >
      <div className="flex justify-between">
        <div>{group.name}</div>
        <div className="flex gap-2">
          <Button variant={'small'}>Edit</Button>
          <Button variant={'small'}>Delete</Button>
        </div>
      </div>
      <div>
        {displayDetails === group.id ? (
          <>
            <p className="text-sm font-light">
              Description: {group.description}
            </p>
            <p className="text-sm font-light"> Budget: {group.budget}</p>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  ))

  return <div className="mb-4">{groupList}</div>
}
