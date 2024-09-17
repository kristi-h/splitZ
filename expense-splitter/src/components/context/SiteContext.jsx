import { useState } from "react";
import { createContext, useContext } from "react";
import db from "../../utils/localstoragedb";

const SiteContext = createContext(null);

export const UseDataContext = () => useContext(SiteContext);

export const DataProvider = ({ children }) => {
  // initialize data from localStorageDB
  const initialFriends = db.queryAll("friends");
  const initalGroup = db.queryAll("groups");

  const [expense, setExpense] = useState([]);
  const [groupData, setGroupData] = useState(initalGroup);
  const [friends, setFriends] = useState(initialFriends);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSetShowModal = () => {
    setShowModal(!showModal)
  };

  const handleCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  const handleSetExpense = (values) => {
    setExpense((prev) => [
      ...prev,
      { ...values, id: nanoid(), date: new Date() },
    ]);
  };

  return (
    <SiteContext.Provider
      value={{
        groupData,
        setGroupData,
        friends,
        expense,
        setExpense,
        handleSetExpense,
        showCreateGroupForm,
        handleCreateGroupForm,
        showModal,
        handleSetShowModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
