import React, { useState, useEffect } from "react";

function DropdownWardSelection({ onSelectWard, initialWard = "" }) {
  const [currentSelectedWard, setCurrentSelectedWard] = useState(initialWard);

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

  useEffect(() => {
    if (currentSelectedWard) {
      onSelectWard(currentSelectedWard);
    }
  }, [currentSelectedWard, onSelectWard]);

  const handleWardChange = (event) => {
    setCurrentSelectedWard(event.target.value);
  };

  return (
    <div className="ward-select-bar-container relative inline-flex items-center">
      <label htmlFor="ward-select" className="sr-only">
        Select Ward Number
      </label>
      <select
        id="ward-select"
        value={currentSelectedWard}
        onChange={handleWardChange}
        // ADD THESE CLASSES TO HIDE NATIVE ARROW:
        className="form-select appearance-none [-webkit-appearance:none] [-moz-appearance:none] pl-3 pr-8 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
      >
        <option value="">Ward No.</option>
        {wards.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.id}
          </option>
        ))}
      </select>
      {/* Your custom arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
        </svg>
      </div>
    </div>
  );
}

export default DropdownWardSelection;
