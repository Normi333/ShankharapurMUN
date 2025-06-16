// src/components/DropdownReports.jsx
import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

function DropdownReports({ align, onSelectReport }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // --- IMPORTANT: Update this 'reports' array ---
  const reports = [
    // Example: Your supervisor's HTML file, placed in the public folder
    { name: "Price Table", url: "../../public/table.html" },
    // Example: Other reports from an API (if applicable)
    {
      name: "Sales Report from API",
      url: "https://api.yourdomain.com/reports/sales",
    },
    { name: "Price Table 2 ", url: "../../public/table2.html" },
  ];

  // ... rest of your DropdownReports component code (no changes needed) ...

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  const handleReportClick = (reportUrl) => {
    setDropdownOpen(false); // Close dropdown
    onSelectReport(reportUrl); // Pass the URL to the parent component
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Reports</span>
        <DocumentChartBarIcon className="w-5 h-5 text-gray-500/80 dark:text-gray-400/80" />
      </button>

      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-md shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">
            Reports
          </div>
          <ul>
            {reports.map((report, index) => (
              <li key={index}>
                <button
                  className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center py-1 px-3 w-full text-left"
                  onClick={() => handleReportClick(report.url)}
                >
                  <span>{report.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownReports;
