import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";
import SidebarLinkGroup from "./SidebarLinkGroup"; // Assuming this component is used elsewhere if not directly in this snippet

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside (only for mobile overlay sidebar)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed (only for mobile overlay sidebar)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "shadow-xs"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button (mobile only) */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-300 hover:text-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={logo} alt="नेपाल सरकार" className="w-15 h-13" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-1">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
                  // Added border-b
                  pathname === "/"
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-white truncate transition duration-150 ${
                    pathname === "/" ? "" : "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/" ? "text-violet-200" : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="4" y="5" width="6" height="5" rx="1" />
                      <rect x="4" y="14" width="6" height="5" rx="1" />
                      <rect x="14" y="5" width="6" height="5" rx="1" />
                      <rect x="14" y="14" width="6" height="5" rx="1" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* नक्सा */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
                  // Added border-b
                  pathname.includes("maps")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("maps") ? "" : "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("maps")
                          ? "text-violet-200"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="16"
                      height="16"
                    >
                      <path d="M416 0L320 32 192 0 96 32 0 0v480l96 32 128-32 128 32 96-32V0zM192 32l96 32v416l-96-32V32zm-96 0l64-21.3V416l-64 21.3V32zm320 448l-64 21.3V96l64-21.3V480z" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      नक्सा
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* घरधुरी रिपोर्ट */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
                  // Added border-b
                  pathname.includes("householdreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/householdreport"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("householdreport")
                      ? ""
                      : "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("householdreport")
                          ? "text-violet-200"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <path d="M14 3v6h6" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                      <line x1="10" y1="18" x2="14" y2="18" />
                      <circle cx="17" cy="17" r="3" />
                      <line x1="19.5" y1="19.5" x2="21" y2="21" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      घरधुरी रिपोर्ट
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* संस्थागत विवरण - This is the last item, so no border-b on it */}
              <li
                className={`pl-4 pr-3 pt-2 pb-2 rounded-lg mb-0.5 last:mb-0 ${
                  // Removed border-b here
                  pathname.includes("statisticsreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/statisticsreport"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("statisticsreport")
                      ? ""
                      : "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("statisticsreport")
                          ? "text-violet-200"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <path d="M14 3v6h6" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                      <line x1="10" y1="18" x2="14" y2="18" />
                      <circle cx="17" cy="17" r="3" />
                      <line x1="19.5" y1="19.5" x2="21" y2="21" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      संस्थागत विवरण
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
