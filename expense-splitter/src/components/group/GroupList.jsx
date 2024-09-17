import { useState } from "react";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";
import EditGroup from "./EditGroup";

export default function GroupList() {
  const [displayDetails, setDisplayDetails] = useState("");
  const [editGroup, setEditGroup] = useState(false);
  //get group edit info
  const [editGroupData, setEditGroupData] = useState({});
  const { groupData, setGroupData, friends } = UseDataContext();

  //change arrow icon when info displays
  const [ icon, setIcon ] = useState("up");

  const handleDisplayDetails = (id) => {
    if (displayDetails === id) {
      setDisplayDetails("");
    } else {
      setDisplayDetails(id);
    }
  };

  const handleEditGroup = (currentGroupData) => {
    if (editGroup) {
      setEditGroup(false);
    } else {
      setEditGroup(true);
      setEditGroupData(currentGroupData);
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

  const groupList = groupData.map((group) => (
    <div
      onClick={() => {handleDisplayDetails(group.id); if(icon === "up") {setIcon("down")} else {setIcon("up")}}}
      key={group.id}
      className="mb-1 flex cursor-pointer flex-col rounded-lg bg-slate-100 px-4 py-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="">{group.name}</h2>
        { icon === "up" ? <i className="fa-solid fa-chevron-up text-3xl text-accent"></i> : null }
        { icon === "down" ? <i className="fa-solid fa-chevron-down text-3xl text-accent"></i> : null }
      </div>
      <div>
        {displayDetails === group.id && (
          <>
          <div className="font-roboto text-sm font-light mt-2 mb-4">
            <p>{group.description}</p>
            <p> Budget remaining this month: $25 / ${group.budget}</p>
            <h3 className="text-decoration-line mt-2 text-base font-bold">
              In this group:
            </h3>
            {/* call a function to display friends list */}
            {retrieveFriendsName(friends, group.friendIDs)}
          </div>
          <div className="flex justify-between">
          
          <div className="flex gap-2">
            <Button 
              variant={"small"} 
              onClick={() => handleEditGroup(group)}
              className={'bg-accent'}
              >
              Edit
            </Button>
            <Button 
              variant={"small"} 
              onClick={() => handleDelete(group.id)}
              className={'bg-accent'}
              >
              Delete
            </Button>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="mb-4">{groupList}</div>
      {editGroup && (
        <EditGroup
          currentGroupData={editGroupData}
          displayEditGroupForm={handleEditGroup}
        />
      )}
    </div>
  );
}
