import { useState } from "react";
import Button from "../ui/Button";
import { UseDataContext } from "../context/SiteContext";

export default function GroupList() {
  const [displayDetails, setDisplayDetails] = useState("");
  const { groupData, setGroupData, expense } = UseDataContext();

  const handleDisplayDetails = (id) => {
    // console.log(id)
    if (displayDetails === id) {
      setDisplayDetails("");
    } else {
      setDisplayDetails(id);
    }
  };

  const handleDelete = (id) => {
    const updatedGroupData = groupData.filter((item) => item.id !== id);
    setGroupData(updatedGroupData);
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
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

  return <div className="mb-4">{groupList}</div>;
}
