import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";

import SidebarLinkGroup from "./SidebarLinkGroup"; // Assuming this component exists

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  selectedLayers,
  setSelectedLayers,
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Removed sidebarExpanded state and its localStorage handling
  // const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  // );

  // State for controlling accordion open/close for EACH category
  const [openAccordions, setOpenAccordions] = useState({
    baseLayers: false, // Renamed from 'base' to 'baseLayers' for consistency with keys
    buildingLayers: false, // Renamed from 'infrastructure' to 'buildingLayers'
    transportationLayers: false, // Renamed from 'transportation'
    naturalResourcesLayers: false, // Renamed from 'naturalResources'
  });

  // Updated Layers structure - grouped by categories with sub-types (remains unchanged)
  const layerCategories = {
    baseLayers: {
      title: "Base",
      layers: [{ id: "river", name: "River" }],
    },
    buildingLayers: {
      title: "Infrastructure",
      layers: [
        { id: "buildings-all", name: "All Buildings" }, // Option to toggle all buildings
        { id: "buildings-Residential", name: "Residential" },
        {
          id: "buildings-Government-Agro Office",
          name: "Government-Agro Office",
        },
        { id: "buildings-Government", name: "Government Office" },
        { id: "buildings-Hotel", name: "Hotel" },
        { id: "buildings-Finance", name: "Finance Company" },
      ],
    },
    transportationLayers: {
      title: "Transportation",
      layers: [
        { id: "roads-all", name: "All Roads" }, // Option to toggle all roads
        { id: "roads-Internal", name: "Internal Roads" },
        { id: "roads-External", name: "External Roads" },
      ],
    },
    naturalResourcesLayers: {
      title: "Natural Resources",
      layers: [{ id: "forest", name: "Forest" }],
    },
  };

  // Toggle accordion visibility for a specific category
  const toggleAccordion = (category) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // close on click outside (mobile only)
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
  }, [sidebarOpen]); // Added sidebarOpen as dependency

  // close if the esc key is pressed (mobile only)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]); // Added sidebarOpen as dependency

  // Removed useEffect for sidebarExpanded (no longer needed)
  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded);
  //   if (sidebarExpanded) {
  //     document.querySelector("body").classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body").classList.remove("sidebar-expanded");
  //   }
  // }, [sidebarExpanded]);

  // Handler for checkbox toggle (remains unchanged)
  const toggleLayer = (layerId) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layerId)) {
        return prevSelectedLayers.filter((id) => id !== layerId);
      } else {
        return [...prevSelectedLayers, layerId];
      }
    });
  };

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
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
          // Changed bg-white dark:bg-gray-800 to bg-[#003893]
          // Simplified width classes for fixed open on desktop: removed lg:w-20, lg:sidebar-expanded:!w-64, 2xl:w-64!
          sidebarOpen ? "translate-x-0" : "-translate-x-full" // Changed from -translate-x-64 to -translate-x-full for full hide
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "shadow-xs" // Removed 'rounded-r-2xl'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button (mobile only) */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-300 hover:text-gray-100" // Adjusted color for dark background
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
            <img src={logo} alt="Your Company Logo" className="w-18 h-16" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* Removed commented-out 'Pages' heading related to expand/collapse */}
            <ul className="mt-3">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("report")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent" // Adjusted gradient for dark bg
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-white truncate transition duration-150 ${
                    // Changed text-gray-800 dark:text-gray-100 to text-white
                    pathname.includes("report") ? "" : "hover:text-gray-200" // Adjusted hover color for dark bg
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("report")
                          ? "text-violet-200" // Adjusted active icon color
                          : "text-gray-300" // Adjusted inactive icon color
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
                      {/* Removed lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 */}
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("map")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("map") ? "" : "hover:text-gray-200" // Adjusted hover color
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("map")
                          ? "text-violet-200" // Adjusted active icon color
                          : "text-gray-300" // Adjusted inactive icon color
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="16"
                      height="16"
                    >
                      <path d="M416 0L320 32 192 0 96 32 0 0v480l96 32 128-32 128 32 96-32V0zM192 32l96 32v416l-96-32V32zm-96 0l64-21.3V416l-64 21.3V32zm320 448l-64 21.3V96l64-21.3V480z" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      {/* Removed lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 */}
                      नक्सा
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Campaigns */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
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
                      : "hover:text-gray-200" // Adjusted hover color
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("householdreport")
                          ? "text-violet-200" // Adjusted active icon color
                          : "text-gray-300" // Adjusted inactive icon color
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
                      {/* Removed lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 */}
                      घरधुरी रिपोर्ट
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
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
                      : "hover:text-gray-200" // Adjusted hover color
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("statisticsreport")
                          ? "text-violet-200" // Adjusted active icon color
                          : "text-gray-300" // Adjusted inactive icon color
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
                      {/* Removed lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 */}
                      संस्थागत विवरण
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* --- Map Layers Section (with accordion sub-sections) --- */}
          <div>
            <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3">
              {/* Changed text-gray-400 dark:text-gray-500 to text-gray-300 */}
              <span className="opacity-100">
                {/* Removed lg:hidden lg:sidebar-expanded:block 2xl:block */}
                नक्शा तहहरू
              </span>
            </h3>
            <ul className="mt-3">
              {Object.entries(layerCategories).map(([key, categoryData]) => (
                <li key={key} className="mb-0.5 last:mb-0">
                  {/* Accordion header for the category */}
                  <div
                    className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1]" // Adjusted hover background
                    onClick={() => toggleAccordion(key)}
                  >
                    <span className="text-sm font-medium text-white">
                      {/* Changed text-gray-800 dark:text-gray-100 to text-white */}
                      {categoryData.title}
                    </span>
                    {/* Accordion arrow icon */}
                    <svg
                      className={`w-3 h-3 fill-current text-gray-300 transform transition-transform duration-200 ${
                        // Changed text-gray-400 dark:text-gray-500 to text-gray-300
                        openAccordions[key] ? "rotate-90" : ""
                      }`}
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.999 11.143L0 5.143 1.429 3.714 5.999 8.286 10.57 3.714 12 5.143z" />
                    </svg>
                  </div>
                  {/* Accordion content for the layers within this category */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openAccordions[key] ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-6 pt-2 pb-1">
                      {categoryData.layers.map((layer) => (
                        <li key={layer.id} className="mb-2 last:mb-0">
                          <label className="inline-flex items-center cursor-pointer text-sm text-gray-200">
                            {/* Changed text-gray-700 dark:text-gray-300 to text-gray-200 */}
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={selectedLayers.includes(layer.id)}
                              onChange={() => toggleLayer(layer.id)}
                            />
                            <span className="ml-2">{layer.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Add other groups or footer here if needed */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
