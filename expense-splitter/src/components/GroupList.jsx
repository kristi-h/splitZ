import { useState } from 'react'
import Button from './Button'
import { UseDataContext } from './context/SiteContext'

export default function GroupList({ groupData, setGroupData }) {
  const [displayDetails, setDisplayDetails] = useState('')
  const { expense } = UseDataContext()

  const handleDisplayDetails = (id) => {
    console.log(id)
    if (displayDetails === id) {
      setDisplayDetails('')
    } else {
      setDisplayDetails(id)
    }
  }

  const handleDelete = (id) => {
    console.log('hello')
    const updatedGroupData = groupData.filter((item) => item.id !== id)
    setGroupData(updatedGroupData)
  }

  const groupList = groupData.map((group) => (
    <div
      onClick={() => handleDisplayDetails(group.id)}
      key={group.id}
      className="flex flex-col bg-slate-100 rounded-md py-4 px-4 mb-1 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="text-lg">{group.name}</div>
        <div className="flex gap-2">
          <Button variant={'small'}>Edit</Button>
          <Button variant={'small'} onClick={() => handleDelete(group.id)}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        {displayDetails === group.id ? (
          <div className="text-sm font-light font-roboto">
            <p>Description: {group.description}</p>
            <p> Budget: {group.budget}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  ))

  return <div className="mb-4">{groupList}</div>
}
