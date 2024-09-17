import EditGroup from '../group/EditGroup'
import CreateGroup from '../group/CreateGroup'
import { UseDataContext } from '../context/SiteContext'

// map component names to actual components
const components = {
  CreateGroup,
  EditGroup
}

export default function Modal() {
  const { modal } = UseDataContext();
  const Component = components[modal.type];

  return (
    modal.show && (
      // <div className="absolute top-[200px] h-full flex bg-black/50 w-full z-20">
      <div className="h-full flex bg-black/50 w-full z-20">
        <div className="w-full bg-white p-6">
        {Component ? <Component /> : null}
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