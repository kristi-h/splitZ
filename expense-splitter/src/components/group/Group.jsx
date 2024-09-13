import React, { useState } from "react";
import Button from "../ui/Button";
import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";
import { UseDataContext } from "../context/SiteContext";

export default function Group() {
  const { groupData, setGroupData } = UseDataContext();
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  const DisplayCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-4">
        <h1 className="text-3xl">Groups</h1>
        <span>
          <Button variant={"small"} onClick={DisplayCreateGroupForm}>
            Create Group +
          </Button>
        </span>
      </div>
      <div>
        <GroupList />
        {showCreateGroupForm ? (
          <CreateGroup DisplayCreateGroupForm={DisplayCreateGroupForm} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
