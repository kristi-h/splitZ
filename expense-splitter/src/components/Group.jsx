import React, { useState } from "react";
import Button from "./Button";
import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";


export default function Group() {
	const initalGroup = [
		{
			name: "Beach Lunch",
			description: "Saturday lunch by the beach",
			budget: "85",
			id: "t0unxnqoAwLdxsjOuxc5A",
		},
		{
			name: "Bar Night",
			description: "Night at the bar with co-workers",
			budget: "300",
			id: "NoWgbblj8apsEHZ0IVMC4",
		},
		{
			name: "Urth Cafe Brunch",
			description: "Brunch with the baseball team",
			budget: "120",
			id: "P_PNnrbjurvmasxRtXEov",
		},
	];
	const [groupData, setGroupData] = useState(initalGroup);
	const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

	const DisplayCreateGroupForm = () => {
		setShowCreateGroupForm(!showCreateGroupForm);
	};

	return (
		<>
			<div className="flex flex-row justify-between p-4">
				<h1 className="text-3xl">Groups</h1>
				<span>
					<Button variant={"small"} onClick={DisplayCreateGroupForm}>
						Create Group +
					</Button>
				</span>
			</div>
			<div>
				<GroupList groupData={groupData} setGroupData={setGroupData} />
				{showCreateGroupForm ? (
					<CreateGroup
						groupData={groupData}
						setGroupData={setGroupData}
						DisplayCreateGroupForm={DisplayCreateGroupForm}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
}
