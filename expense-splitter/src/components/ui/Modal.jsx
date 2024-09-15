import React from 'react'
import EditGroup from '../group/EditGroup'

export default function Modal() {
  return (
    <div className="absolute flex bg-black/50 h-full w-full">
      <div className="m-auto w-96  bg-white rounded-lg p-6">
          <EditGroup />
      </div>
    </div>
  )
}
