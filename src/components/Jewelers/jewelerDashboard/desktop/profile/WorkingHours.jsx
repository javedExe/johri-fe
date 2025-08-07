import React, { useState } from "react";
import Switch from "../../../../ui/Switch";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WorkingHours = () => {
  const [timezone, setTimezone] = useState("(GMT+5:30)");
  const [useSameTime, setUseSameTime] = useState(true);
  const [sameTime, setSameTime] = useState({ from: "09:00 AM", to: "05:00 PM" });
  const [workingHours, setWorkingHours] = useState(
    daysOfWeek.map((day, index) => ({
      day,
      enabled: index < 5, // Enable Monday to Friday
      from: "09:00 AM",
      to: "05:00 PM",
    }))
  );

  const handleToggle = (index) => {
    const updated = [...workingHours];
    updated[index].enabled = !updated[index].enabled;
    setWorkingHours(updated);
  };

  const handleSameTimeChange = (field, value) => {
    const updated = { ...sameTime, [field]: value };
    setSameTime(updated);
    if (useSameTime) {
      setWorkingHours(
        workingHours.map((entry) => ({
          ...entry,
          from: updated.from,
          to: updated.to,
        }))
      );
    }
  };

  return (
    <div className="mr-3">
    <div className="p-6 rounded-xl border border-gray-300 bg-white max-w-3xl mx-auto pr-20">
      <h2 className="text-xl font-semibold mb-2">Working Hours</h2>
      <p className="text-sm text-gray-600 mb-6">
        Set your daily business operating hours.
      </p>

      <div className="mb-4 flex gap-2">
        <div className="w-2/6">
            <p className="block text-sm font-medium mb-1">Time zone</p>
            <p className="text-xs text-gray-600">Set your time zone</p>
        </div>
        <div className="w-4/6">
            <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border border-[#D9D9D9] text-[#1f1e1e] rounded px-3 py-2"
            >
            <option>(GMT+5:30)</option>
            <option>(GMT+1:00)</option>
            <option>(GMT+0:00)</option>
            </select>
        </div>
      </div>

      <div className="flex items-center justify-between border border-[#D9D9D9] p-4 rounded mb-6">
        <div>
            <p className="text-md font-medium">Set same time for each day.</p>
            <p className="text-xs text-gray-600">Quikly set time for each day.</p>
        </div>


        <Switch 
            className="ms-2" 
            checked={useSameTime} 
            onChange={(e) => setUseSameTime(e.target.checked)}
                
        />


        <div className="flex gap-2 items-center ml-auto rounded-md border border-[#D9D9D9] mr-3">
            <span className="mx-2 text-[#D9D9D9]">From</span>
          <input
            type="text"
            value={sameTime.from}
            onChange={(e) => handleSameTimeChange("from", e.target.value)}
            className="rounded px-2 py-1 w-24 "
          />
          </div>
          <div className="flex gap-2 items-center rounded-md border border-[#D9D9D9]">
          <span className="mx-2 text-[#D9D9D9]">To</span>
          <input
            type="text"
            value={sameTime.to}
            onChange={(e) => handleSameTimeChange("to", e.target.value)}
            className="rounded px-2 py-1 w-24"
          />
        </div>
      </div>

      {workingHours.map((entry, index) => (
        <div key={entry.day} className="flex justify-between gap-3 items-center mb-3">
        <div className="w-3/9">
        <Switch 
           checked={entry.enabled}
            onChange={() => handleToggle(index)}
            className="mr-3 border border-[#D9D9D9]" 
        />
          <label className="w-24 text-sm font-medium">{entry.day}</label>
        </div>



          <div className="border border-[#D9D9D9] rounded-lg p-1 w-3/10 flex justify-between items-center">
            <span className="mx-2 text-[#D9D9D9]">From</span>
          <input
            type="text"
            value={entry.from}
            disabled={!entry.enabled || useSameTime}
            onChange={(e) => {
              const updated = [...workingHours];
              updated[index].from = e.target.value;
              setWorkingHours(updated);
            }}
            className="border-0 rounded px-2 py-1 w-24 ml-2"
          />
          </div>

          
          <div className="border border-[#D9D9D9] rounded-lg p-1 w-3/10 flex justify-between items-center">
            <span className="mx-2 text-[#D9D9D9]">To</span>
            <input
                type="text"
                value={entry.to}
                disabled={!entry.enabled || useSameTime}
                onChange={(e) => {
                    const updated = [...workingHours];
                    updated[index].to = e.target.value;
                    setWorkingHours(updated);
                }}
                className="border-0 rounded px-2 py-1 w-24"
                />
            </div>
        </div>
      ))}

      
    </div>

      <div className="flex justify-end space-x-2 text-sm mt-5">
        <button
          type="button"
          className="w-1/4 px-4 py-2 border border-[#323267] text-[#323267] rounded-md hover:bg-gray-100 hover:cursor-pointer"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="w-1/4 px-4 py-2 bg-[#1C1C3A] text-white rounded-md hover:cursor-pointer"
        >
          Save Changes
        </button>
   
    </div>
    </div>
  );
};

export default WorkingHours;
