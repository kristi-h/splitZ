import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function MultiSelectDropdown({ friends, control, editFriends }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useEffect(() => {}, [isOpen]);
  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref}>
      <div
        className="cursor-pointer rounded-md border bg-gray-200 p-1 text-sm font-light"
        onClick={toggleDropdown}
      >
        Select Friends
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 cursor-pointer overflow-y-auto rounded-md border bg-white">
          {friends.map((friend) => (
            <label key={friend.id} className="flex items-center p-2">
              <Controller
                name="friendIDs"
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
