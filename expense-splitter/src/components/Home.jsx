import { UseDataContext } from "./context/SiteContext"
import ExpenseList from "./expense/ExpenseList"
import GroupList from "./group/GroupList"
import FriendList from "./friend/FriendList"

export default function Home() {
  const {handleSetModal, modal} = UseDataContext()
  console.log(modal)

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Welcome, Cornelius!</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-normal mb-2">Groups</h2>
          <GroupList />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-normal mb-2">Expenses</h2>
          <ExpenseList />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-normal mb-2">Friends</h2>
          <FriendList />
        </div>
      </div>
    )
  );
}
