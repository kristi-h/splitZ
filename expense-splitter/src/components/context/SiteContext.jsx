import React, { useState } from "react";
import { nanoid } from "nanoid";
import { createContext, useContext } from "react";

const SiteContext = createContext(null);

export const UseDataContext = () => useContext(SiteContext);

export const DataProvider = ({ children }) => {
	const [expense, setExpense] = useState([]);

	const handleSetExpense = (values) => {
		setExpense((prev) => [
			...prev,
			{ ...values, id: nanoid(), date: new Date() },
		]);
	};

	//participation / friends

	const [friends, setFriends] = useState([
		{
			id: 1,
			name: "Abel",
			email: "abel@hotlikehell.com",
		},
		{
			id: 2,
			name: "Kristin",
			email: "kristin@hotlikehell.com",
		},
		{
			id: 3,
			name: "Carlos",
			email: "carlos@hotlikehell.com",
		},
	]);

	return (
		<SiteContext.Provider
			value={{ expense, setExpense, handleSetExpense, friends }}>
			{children}
		</SiteContext.Provider>
	);
};
