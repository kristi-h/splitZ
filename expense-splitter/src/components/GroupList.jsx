import { useState } from 'react'

export default function GroupList({ groupData }) {
  const [displayDetails, setDisplayDetails] = useState(false)
  const handleDisplayDetails = () => setDisplayDetails(!displayDetails)

  const groupList = groupData.map((group) => (
    <div
      onClick={handleDisplayDetails}
      key={group.id}
      className="flex flex-col bg-slate-100 rounded-md py-4 px-2 mb-1 cursor-pointer"
    >
      <div className="flex justify-between">
        <div>{group.name}</div>
        <div className="flex gap-2">
          <button className="bg-slate-500 text-slate-100 px-2 rounded-sm hover:bg-slate-600">
            edit
          </button>
          <button className="bg-slate-500 text-slate-100 px-2 rounded-sm hover:bg-slate-600">
            delete
          </button>
        </div>
      </div>
      <div>
        {displayDetails ? (
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
