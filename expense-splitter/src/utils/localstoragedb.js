import localStorageDB from "localstoragedb";
import {
  dummyExpenses,
  dummyFriends,
  dummyGroups,
  expensesSchema,
  friendsSchema,
  groupSchema,
} from "./dummyData";

// Create db in local storage if none exists
const db = new localStorageDB("database", localStorage);

// Initialize the database if empty
if (db.isNew()) {
  db.createTable("friends", friendsSchema);
  db.createTable("expenses", expensesSchema);
  db.createTable("group", groupSchema);

  //Populate the tables
  dummyFriends.forEach((friend) => {
    db.insert("friends", friend);
  });
  dummyExpenses.forEach((expense) => {
    db.insert("expenses", expense);
  });
  dummyGroups.forEach((group) => {
    db.insert("groups", group);
  });

  // Write db to localstorage
  db.commit();
}
