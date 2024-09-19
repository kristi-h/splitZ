import { useState } from "react";
import { createContext, useContext } from "react";
import db from "../../utils/localstoragedb";
import { nanoid } from "nanoid";

const SiteContext = createContext(null);

export const UseDataContext = () => useContext(SiteContext);

export const DataProvider = ({ children }) => {
  // initialize data from localStorageDB
  const initialFriends = db.queryAll("friends");
  const initalGroup = db.queryAll("groups");
  const initialExpenses = db.queryAll("expenses");

  const [user, setUser] = useState(db.queryAll("user")[0]?.name || "");
  const [expense, setExpense] = useState(initialExpenses);
  const [groupData, setGroupData] = useState(initalGroup);
  const [friends, setFriends] = useState(initialFriends);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "",
    id: "",
  });

  const handleSetUser = (username) => {
    setUser(username);
  };

  const handleSetModal = (type, id) => {
    console.log(type);
    if (!type) {
      setModal({ show: false });
    } else {
      setModal((prev) => ({
        ...prev,
        show: !prev.show,
        type,
        id,
      }));
    }
  };

  console.log(modal);

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
        user,
        handleSetUser,
        groupData,
        setGroupData,
        friends,
        setFriends,
        expense,
        setExpense,
        handleSetExpense,
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
