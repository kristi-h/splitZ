import { useState } from "react";
import { nanoid } from "nanoid";
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

  const handleSetExpense = (values) => {
    setExpense((prev) => [
      ...prev,
      { ...values, id: nanoid(), date: new Date() },
    ]);
  };
  //   console.log(expense)

  return (
    <SiteContext.Provider
      value={{
        groupData,
        setGroupData,
        friends,
        expense,
        setExpense,
        handleSetExpense,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
