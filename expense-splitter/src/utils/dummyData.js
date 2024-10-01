//-- Feel free to edit the dummy data to fit your need --//
export const friendsSchema = ["id", "name", "email"];
export const dummyFriends = [
  {
    id: "9641947f-6b00-4db7-9c7e-9e479b438bd8",
    name: "Lloyd Kneman",
    email: "lloydk@email.com",
  },
  {
    id: "d5923f14-bc79-44ea-8388-d354c72c2253",
    name: "Joz Freedle",
    email: "jfree@email.com",
  },
  {
    id: "8217468b-ec4e-4340-9c90-665dff5d22d2",
    name: "Nunya",
    email: "buzzzz@off.com",
  },
];

export const userSchema = ["name", "email"];
export const dummyUser = [{ id: "1", name: "Cornelius", email: "c@c.com" }];

export const expensesSchema = [
  "id",
  "name",
  "description",
  "category",
  "amount",
  "groupId",
  "weight",
  "receipt_URL",
];
export const dummyExpenses = [
  {
    id: "testing1-0ff6-463a-zk0s-a5lke3nta91",
    name: "Testing1",
    description: "testing1",
    category: "restaurant",
    amount: "1000",
    groupId: "fbkj3Bgb-jkw3t-23h9g-sKlfh43ntnMi",
    weight: [
      { id: "d5923f14-bc79-44ea-8388-d354c72c2253", contribution: 50 },
      { id: "9641947f-6b00-4db7-9c7e-9e479b438bd8", contribution: 25 },
      { id: "8217468b-ec4e-4340-9c90-665dff5d22d2", contribution: 25 },
    ],
  },
  {
    id: "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
    name: "Dinner",
    description: "Omakase",
    category: "restaurant",
    amount: "489.32",
    groupId: "2d638ad6-2dde-44a9-b8d6-2e58a380b78c",
    receipt_URL: "https://firebasestorage.googleapis.com/v0/b/expense-splitter-399e6.appspot.com/o/3dGxTrD_ItpNRB-36nqd--dinner-receipt.jpg?alt=media&token=9f273f03-7f99-4f0c-a4aa-802d8f04297b",
    weight: [{ id: "9641947f-6b00-4db7-9c7e-9e479b438bd8", contribution: 25 }],
  },
  {
    id: "2c0ce368-7a0c-4b72-ad30-8c03a8d7318a",
    name: "Road Trip",
    description: "Grand Canyon",
    category: "trip",
    amount: "343.11",
    groupId: "47dd1683-bcbf-4a20-9e10-d8596474bc5c",
    receipt_URL: "https://firebasestorage.googleapis.com/v0/b/expense-splitter-399e6.appspot.com/o/OdrXleNjeXec-tqmLuJcj-fake-receipt-expense-splitter.jpg?alt=media&token=9857d611-9a94-4c7e-b37b-0da78befdd3d",
    weight: [
      { id: "d5923f14-bc79-44ea-8388-d354c72c2253", contribution: 50 },
      { id: "9641947f-6b00-4db7-9c7e-9e479b438bd8", contribution: 25 },
      { id: "8217468b-ec4e-4340-9c90-665dff5d22d2", contribution: 25 },
    ],
  },
  {
    id: "ecd43989-b611-49d1-9093-0f8bc2378a11",
    name: "Imported Peruvian Peanuts",
    description: "The finest goobers",
    category: "gift",
    amount: "49.99",
    groupId: "c35a55d7-1b2d-4185-98b4-f536f5ea25f6",
    weight: [
      { id: "d5923f14-bc79-44ea-8388-d354c72c2253", contribution: 50 },
      { id: "9641947f-6b00-4db7-9c7e-9e479b438bd8", contribution: 20 },
      { id: "8217468b-ec4e-4340-9c90-665dff5d22d2", contribution: 30 },
    ],
  },
];

export const groupSchema = [
  "id",
  "name",
  "description",
  "budget",
  "friendIDs",
  "expenseIDs",
];
export const dummyGroups = [
  {
    id: "fbkj3Bgb-jkw3t-23h9g-sKlfh43ntnMi",
    name: "Test Group",
    description: "Test Group",
    budget: "5000",
    friendIDs: [
      "9641947f-6b00-4db7-9c7e-9e479b438bd8",
      "d5923f14-bc79-44ea-8388-d354c72c2253",
      "8217468b-ec4e-4340-9c90-665dff5d22d2",
    ],
    expenseIDs: [
      "testing1-0ff6-463a-zk0s-a5lke3nta91",
      "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
      "2c0ce368-7a0c-4b72-ad30-8c03a8d7318a",
      "ecd43989-b611-49d1-9093-0f8bc2378a11",
    ],
  },
  {
    id: "2d638ad6-2dde-44a9-b8d6-2e58a380b78c",
    name: "The Brat Pack",
    description: "School friends",
    budget: "550",
    friendIDs: ["9641947f-6b00-4db7-9c7e-9e479b438bd8"],
    expenseIDs: [
      "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
      "2c0ce368-7a0c-4b72-ad30-8c03a8d7318a",
    ],
  },
  {
    id: "47dd1683-bcbf-4a20-9e10-d8596474bc5c",
    name: "CoWorkers",
    description: "Work gift exchange",
    budget: "60",
    friendIDs: ["d5923f14-bc79-44ea-8388-d354c72c2253"],
    expenseIDs: [
      "ecd43989-b611-49d1-9093-0f8bc2378a11",
      "8217468b-ec4e-4340-9c90-665dff5d22d2",
      "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
    ],
  },
  {
    id: "c35a55d7-1b2d-4185-98b4-f536f5ea25f6",
    name: "Day Trippers",
    description: "Explorer group",
    budget: "1000",
    friendIDs: ["d5923f14-bc79-44ea-8388-d354c72c2253"],
    expenseIDs: [
      "2c0ce368-7a0c-4b72-ad30-8c03a8d7318a",
      "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
    ],
  },
  {
    id: "j35r55d7-7n6d-4566-54l6-f536f5ea56g8",
    name: "Bird Watchers",
    description: "Tweety Fans",
    budget: "500",
    friendIDs: ["d5923f14-bc79-44ea-8388-d354c72c2253"],
    expenseIDs: [
      "2c0ce368-7a0c-4b72-ad30-8c03a8d7318a",
      "fb5669e1-caf6-463a-a9b9-a57af90a0a66",
    ],
  },
];

export const categories = [
  "gift",
  "groceries",
  "restaurant",
  "shopping",
  "trip",
  "utilities",
  "other",
];
