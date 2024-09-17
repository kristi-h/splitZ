import React, { useEffect } from 'react'
// import EditGroup from '../group/EditGroup'
import CreateGroup from '../group/CreateGroup'
import { UseDataContext } from '../context/SiteContext'

export default function Modal() {
  const {showModal} = UseDataContext();

  return (
    showModal && (
      <div className="absolute top-[200px] h-full flex bg-black/50 w-full z-20">
      <div className="w-full bg-white p-6">
          <CreateGroup />
      </div>
    </div>
    )
  )
}

// popup style modal
// export default function Modal() {
//   return (
//     <div className="absolute flex bg-black/50 h-full w-full z-20">
//       <div className="m-auto w-96  bg-white rounded-lg p-6">
//           {/* <EditGroup /> */}Modal
//       </div>
//     </div>
//   )
// }