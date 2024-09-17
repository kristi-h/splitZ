import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext"

export default function Friend() {
  const {handleSetModal, modal} = UseDataContext()
  console.log(modal)

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Friends</h1>
        <div>
          Friends List here
        </div>
        <div className="absolute over left-1/2 bottom-6 -translate-x-1/2 z-10">
          <Button 
            onClick={() => handleSetModal('CreateFriend')} 
            className={'bg-primary'}
          >Create Friend</Button>
        </div>
      </div>
    )
  );
}
