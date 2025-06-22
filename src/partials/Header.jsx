import React, { useState } from "react";

import SearchModal from "../components/ModalSearch";
// import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";
import DropdownReports from "../components/DropdownReport";
import DropdownWardSelection from "../components/DropdownWardSelection";

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  onSelectReport,
  onSelectWard,
}) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 before:absolute before:inset-0 before:bg-[#234a83] before:-z-10 z-30
      ${
        variant === "v2" || variant === "v3"
          ? "" // Removed 'after:' pseudo-element here in the previous step
          : "max-lg:shadow-xs"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${
            variant === "v2" || variant === "v3" ? "" : "" // Removed "lg:border-b border-gray-200 dark:border-gray-700/60" from here
          }`}
        >
          {/* Header: Left side */}
          <div className="flex items-center">
            {/* Hamburger button */}
            <button
              className="text-white hover:text-gray-200 lg:hidden mr-4"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            {/* New Heading */}
            <h1 className="text-white text-xl font-bold tracking-wide font-sans">
              Shankharapur Municipality Digital Profile
            </h1>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <DropdownWardSelection align={"left"} onSelectWard={onSelectWard} />
            {/* ... other commented out components ... */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
