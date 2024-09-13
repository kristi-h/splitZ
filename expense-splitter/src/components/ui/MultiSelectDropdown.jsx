import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import useOutsideClick from '../../hooks/useOutsideClick'

export default function MultiSelectDropdown({ friends, control }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = () => {
    setIsOpen(false)
  }

  useEffect(() => {}, [isOpen])
  const ref = useOutsideClick(handleClickOutside)

  return (
    <div ref={ref}>
      <div
        className="border p-1 cursor-pointer text-sm font-light bg-gray-200 rounded-md"
        onClick={toggleDropdown}
      >
        Select Friends
      </div>
      {isOpen && (
        <div className="absolute mt-1 border bg-white z-10 max-h-60 overflow-y-auto rounded-md cursor-pointer">
          {friends.map((friend) => (
            <label key={friend.id} className="flex items-center p-2">
              <Controller
                name="friends"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    value={friend.id}
                    onChange={(e) => {
                      const isChecked = e.target.checked
                      const valueArray = field.value || []
                      const newValue = isChecked
                        ? [...valueArray, friend.id]
                        : valueArray.filter((id) => id !== friend.id)
                      field.onChange(newValue)
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
  )
}
