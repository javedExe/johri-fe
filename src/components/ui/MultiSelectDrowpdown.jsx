import React, { useState, useRef, useEffect } from "react";

const options = ["All", "Gold", "Silver", "Diamond", "Platinum"];

const MultiselectDropdown = ({ selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select Type"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full z-50 bg-white border rounded shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center px-3 py-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="text-purple-500 form-checkbox rounded mr-2"
              />
              <label className="text-gray-800">{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiselectDropdown;
