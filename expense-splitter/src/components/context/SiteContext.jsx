import { useState } from "react";
import { createContext, useContext } from "react";
import db from "../../utils/localstoragedb";
import { nanoid } from "nanoid";
import "../../utils/dummyData";

const SiteContext = createContext(null);

export const UseDataContext = () => useContext(SiteContext);

export const DataProvider = ({ children }) => {
  // initialize data from localStorageDB
  const initialFriends = db.queryAll("friends");
  const initalGroup = db.queryAll("groups");
  const initialExpenses = db.queryAll("expenses");

  const [expenses, setExpenses] = useState(initialExpenses);
  const [groupData, setGroupData] = useState(initalGroup);
  const [friends, setFriends] = useState(initialFriends);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "",
    id: "",
  });

  const handleSetModal = (type, id) => {
    setModal((prev) => ({
      ...prev,
      show: !prev.show,
      type,
      id,
    }));
  };

  const handleCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  return (
    <SiteContext.Provider
      value={{
        groupData,
        setGroupData,
        friends,
        setFriends,
        expenses,
        setExpenses,
        showCreateGroupForm,
        handleCreateGroupForm,
        modal,
        setModal,
        handleSetModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
