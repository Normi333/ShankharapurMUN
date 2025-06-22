import React, { useState } from "react";

function DropdownWardSelection({ onSelectWard, initialWard = "2" }) {
  const [currentSelectedWard, setCurrentSelectedWard] = useState(initialWard);

  // Mapping English numerals to Nepali numerals
  const nepaliNumerals = {
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
    10: "१०",
  };

  const wards = [
    { id: "1", name: "Ward 1" },
    { id: "2", name: "Ward 2" },
    { id: "3", name: "Ward 3" },
    { id: "4", name: "Ward 4" },
    { id: "5", name: "Ward 5" },
    { id: "6", name: "Ward 6" },
    { id: "7", name: "Ward 7" },
    { id: "8", name: "Ward 8" },
    { id: "9", name: "Ward 9" },
    { id: "10", name: "Ward 10" },
  ];

  const handleWardChange = (event) => {
    setCurrentSelectedWard(event.target.value);
    // You might want to call onSelectWard here if you're not using useEffect
    // onSelectWard(event.target.value);
  };

  return (
    <div className="ward-select-bar-container relative inline-flex items-center">
      <label htmlFor="ward-select" className="sr-only">
        वडा संख्या चयन गर्नुहोस्
      </label>
      <select
        id="ward-select"
        value={currentSelectedWard}
        onChange={handleWardChange}
        className="form-select appearance-none [-webkit-appearance:none] [-moz-appearance:none] pl-3 pr-8 py-2 text-sm font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
      >
        <option value="">वडा न.</option>
        {wards.map((ward) => (
          <option key={ward.id} value={ward.id}>
            वडा न. {nepaliNumerals[ward.id]} {/* Use the mapping here */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownWardSelection;
