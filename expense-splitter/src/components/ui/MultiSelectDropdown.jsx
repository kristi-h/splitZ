import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function MultiSelectDropdown({ options, control }) {
	const [isOpen, setIsOpen] = useState(false);

	// Function to toggle dropdown
	const toggleDropdown = ({ options, control }) => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<div
				className="border p-2 cursor-pointer border p-2 cursor-pointer text-sm font-light bg-gray-200 rounded-md"
				onClick={toggleDropdown}>
				Select Friends
			</div>
			{isOpen && (
				<div className="absolute mt-1 border bg-white z-10 max-h-60 overflow-y-auto bg-gray-200">
					{options.map((friend) => (
						<label key={friend.id} className="flex items-center p-2">
							<Controller
								name="friends"
								control={control}
								render={({ field }) => (
									<input
										type="checkbox"
										value={friend.id}
										onChange={(e) => {
											const isChecked = e.target.checked;
											const valueArray = field.value || [];
											const newValue = isChecked
												? [...valueArray, friend.id]
												: valueArray.filter((id) => id !== friend.id);
											field.onChange(newValue);
										}}
										checked={field.value?.includes(friend.id) || false}
									/>
								)}
							/>
							<span className="ml-2">{friend.name}</span>
						</label>
					))}
				</div>
			)}
		</div>
	);
}
