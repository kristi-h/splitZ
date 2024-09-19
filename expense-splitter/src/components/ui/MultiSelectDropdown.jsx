import { useState } from "react";
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

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref}>
      <div
        className="flex justify-between items-center cursor-pointer bg-accent/10 rounded-lg px-4 py-3 font-roboto font-light"
        onClick={toggleDropdown}
      >
        <div className="text-accent">Select Friends</div>
        <i className="fa-solid fa-chevron-down text-3xl text-accent"></i>
      </div>
      {isOpen && (
          <div className="w-full z-10 mt-1 max-h-60 cursor-pointer rounded-md border bg-white">
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
