import React, { useState } from 'react'

import CreateGroup from './CreateGroup'
import GroupList from './GroupList'

export default function Group() {
  const initalGroup = [
    {
      name: 'Beach Lunch',
      description: 'Saturday lunch by the beach',
      budget: '85',
      id: 't0unxnqoAwLdxsjOuxc5A',
    },
    {
      name: 'Bar Night',
      description: 'Night at the bar with co-workers',
      budget: '300',
      id: 'NoWgbblj8apsEHZ0IVMC4',
    },
    {
      name: 'Urth Cafe Brunch',
      description: 'Brunch with the baseball team',
      budget: '120',
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
