import React, { useState } from "react";
import Button from "../ui/Button";
import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";

export default function Group() {
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  const displayCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-4">
        <h1 className="text-3xl">Groups</h1>
        <span>
          <Button variant={"small"} onClick={displayCreateGroupForm}>
            Create Group +
          </Button>
        </span>
      </div>
      <div>
        <GroupList />
        {showCreateGroupForm ? (
          <CreateGroup displayCreateGroupForm={displayCreateGroupForm} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
