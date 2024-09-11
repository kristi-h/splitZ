import React, { useState } from 'react'

import CreateGroup from './CreateGroup'
import GroupList from './GroupList'

export default function Group() {
  const initalGroup = [
    {
      name: 'Carlos',
      description: 'Shellder',
      budget: '22',
      id: 't0unxnqoAwLdxsjOuxc5A',
    },
    {
      name: 'Abel',
      description: 'Loves Bootstrap!',
      budget: '300',
      id: 'NoWgbblj8apsEHZ0IVMC4',
    },
    {
      name: 'Kriss',
      description: 'Loves COFFEE!',
      budget: '10',
      id: 'P_PNnrbjurvmasxRtXEov',
    },
  ]
  const [groupData, setGroupData] = useState(initalGroup)

  return (
    <div>
      <GroupList groupData={groupData} />
      <CreateGroup groupData={groupData} setGroupData={setGroupData} />
    </div>
  )
}
