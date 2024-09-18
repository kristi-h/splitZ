import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import db from "../../utils/localstoragedb";

const FriendList = () => {
  const { friends, setFriends } = UseDataContext();

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
          className="mb-1 flex items-center rounded-md bg-slate-100 px-2 py-4"
        >
          <i className="fa-solid fa-user mr-4 text-2xl"></i>
          <div className="flex flex-col">
            <div>{friend.name}</div>
            <div className="text-sm font-light text-gray-500">
              <a href={`mailto: ${friend.email}`}>{friend.email}</a>
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            <Button
              className="w-20"
              onClick={() => {
                // TODO - Implement Friend Edit Funcitonality
                console.log(`Editing this friend: ${friend.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              className="w-20"
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
