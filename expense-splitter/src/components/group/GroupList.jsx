import { useState } from "react";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";

export default function GroupList() {
  const [displayDetails, setDisplayDetails] = useState("");
  const { groupData, setGroupData, expense, friends } = UseDataContext();

  const handleDisplayDetails = (id) => {
    // console.log(id)
    if (displayDetails === id) {
      setDisplayDetails("");
    } else {
      setDisplayDetails(id);
    }
  };

  //delete a group
  const handleDelete = (id) => {
    const updatedGroupData = groupData.filter((item) => item.id !== id);
    setGroupData(updatedGroupData);
  };

  //retrieve Friends name with in the Group Details
  //input : the object friends from Global; the Current Viewed Group Friends Array
  const retrieveFriendsName = (friendsObject, friendId) => {
    //filter thru the friends object to return related friends in the group
    const retrieveFriendsId = friendsObject.filter((friendsObjectId) =>
      friendId.includes(friendsObjectId.id),
    );
    //display the names of the friends
    return retrieveFriendsId.map((friend) => (
      <p key={friend.id}>{friend.name}</p>
    ));
  };

  console.log("groupData", groupData);

  const groupList = groupData.map((group) => (
    <div
      onClick={() => handleDisplayDetails(group.id)}
      key={group.id}
      className="mb-1 flex cursor-pointer flex-col rounded-md bg-slate-100 px-4 py-4"
    >
      <div className="flex justify-between">
        <div className="text-lg">{group.name}</div>
        <div className="flex gap-2">
          <Button variant={"small"}>Edit</Button>
          <Button variant={"small"} onClick={() => handleDelete(group.id)}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        {displayDetails === group.id ? (
          <div className="font-roboto text-sm font-light">
            <p>Description: {group.description}</p>
            <p> Budget: {group.budget}</p>
            <h3 className="text-decoration-line mt-2 text-base font-bold">
              Friends:
            </h3>
            {/* call a function to display friends list */}
            {retrieveFriendsName(friends, group.friendIDs)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

  return <div className="mb-4">{groupList}</div>;
}
