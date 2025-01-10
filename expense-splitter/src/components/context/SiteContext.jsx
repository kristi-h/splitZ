import { useState } from "react";
import { createContext, useContext } from "react";
import db from "../../utils/localstoragedb";
import "../../utils/dummyData";

const SiteContext = createContext(null);

export const UseDataContext = () => useContext(SiteContext);

export const DataProvider = ({ children }) => {
  // initialize data from localStorageDB
  const initialFriends = db.queryAll("friends");
  const initialGroup = db.queryAll("groups");
  const initialExpenses = db.queryAll("expenses");

  const [user, setUser] = useState(db.queryAll("user")[0]?.name || "");
  const [expenses, setExpenses] = useState(initialExpenses);
  const [groupData, setGroupData] = useState(initialGroup);
  const [friends, setFriends] = useState(initialFriends);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "",
    id: "",
    image_url: "",
    image_alt: "",
  });

  const handleSetUser = (username) => {
    setUser(username);
  };

  const handleSetModal = (type, id, image_url, image_alt) => {
      setModal((prev) => {
          if (!type) {
              return { show: false, type: "", id: "", image_url: "", image_alt: "" };
          }
          return {
              ...prev,
              show: prev.type !== type || !prev.show,
              type,
              id,
              image_url,
              image_alt,
          };
      });
  };

  const handleCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
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
