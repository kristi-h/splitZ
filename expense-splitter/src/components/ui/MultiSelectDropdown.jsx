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
        className="cursor-pointer rounded-md border bg-gray-200 p-2 text-sm font-light"
        onClick={toggleDropdown}
      >
        Select Friends
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 overflow-y-auto border bg-gray-200 bg-white">
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
