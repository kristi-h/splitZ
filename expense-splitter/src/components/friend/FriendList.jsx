import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import db from "../../utils/localstoragedb";

const FriendList = () => {
  const { friends, setFriends, handleSetModal } = UseDataContext();

  // Delete friend if matches id
  const handleDeleteFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
    // Delete friend from local storage
    db.deleteRows("friends", { id });
    db.commit();
  };

  return (
    <>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="mb-1 flex items-center rounded-lg bg-slate-100 px-4 py-4"
        >
          <i className="fa-solid fa-user mr-4 text-2xl"></i>
          <div className="flex flex-col">
            <div>{friend.name}</div>
            <div>{friend.weight}</div>
            <div className="text-sm font-light text-gray-500">
              <a href={`mailto: ${friend.email}`}>{friend.email}</a>
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            <Button
              variant={"small"}
              className="font-normal"
              onClick={() => {
                handleSetModal("CreateFriend", friend.id);
              }}
            >
              Edit
            </Button>
            <Button
              variant={"small"}
              className="font-normal"
              onClick={() => handleDeleteFriend(friend.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendList;
