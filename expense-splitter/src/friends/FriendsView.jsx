import { UseDataContext } from "../components/context/SiteContext";
import Button from "../components/ui/Button";
import FriendsList from "./FriendsList";

const FriendsView = () => {
  const { modal, handleSetModal } = UseDataContext();

  return (
    !modal.show && (
      <>
        <h1 className="text-center">FRIENDS</h1>
        <FriendsList />
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

export default FriendsView;
