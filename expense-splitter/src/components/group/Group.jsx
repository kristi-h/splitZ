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
    <div>
      <h1 className="text-center">Groups</h1>
      <div>
        <GroupList />
        {showCreateGroupForm ? (
          <CreateGroup displayCreateGroupForm={displayCreateGroupForm} />
        ) : (
          ""
        )}
      </div>
      <div className="absolute over left-1/2 bottom-6 -translate-x-1/2 z-10">
        <Button 
          onClick={displayCreateGroupForm} 
          className={'bg-primary h-14 w-[200px] text-[18px] rounded-[10px]'}
        >Create Group</Button>
      </div>
    </div>
  );
}
