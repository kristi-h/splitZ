import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import FriendList from "./FriendList";

const Friend = () => {
  const { modal, handleSetModal } = UseDataContext();

  return (
    !modal.show && (
      <>
        <h1 className="text-center">Friends</h1>
        <FriendList />
        <Button
          className="over absolute bottom-6 left-1/2 z-10 h-14 w-[200px] -translate-x-1/2 rounded-md bg-primary text-lg"
          onClick={() => {
            handleSetModal("CreateFriend");
          }}
        >
          Add Friend
        </Button>
      </>
    )
  );
};

export default Friend;
