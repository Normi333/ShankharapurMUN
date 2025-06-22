import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/GovermentLogo.png";

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

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // State for controlling accordion open/close for EACH category
  const [openAccordions, setOpenAccordions] = useState({
    base: false,
    infrastructure: false,
    transportation: false,
    naturalResources: false,
  });

  // Updated Layers structure - grouped by categories with sub-types
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

  // close on click outside
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
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // Handler for checkbox toggle
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
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
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
            <img src={logo} alt="Your Company Logo" className="w-15 h-15" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3> */}
            <ul className="mt-3">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("report") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("report")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("report")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="4" y="5" width="6" height="5" rx="1" />
                      <rect x="4" y="14" width="6" height="5" rx="1" />
                      <rect x="14" y="5" width="6" height="5" rx="1" />
                      <rect x="14" y="14" width="6" height="5" rx="1" />
                    </svg>
                    <span className="text-sm font-bold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("map") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("map")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("map")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v13l-6 3z" />
                      <path d="M12 18.5v-13" />
                      <path d="M18 9l0 7.5" />
                    </svg>
                    <span className="text-sm font-bold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      नक्सा
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Campaigns */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("householdreport") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/householdreport"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("householdreport")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("householdreport")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
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
                    <span className="text-sm font-bold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      घरधुरी रिपोर्ट
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("statisticsreport") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/statisticsreport"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("statisticsreport")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        pathname.includes("statisticsreport")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
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
                    <span className="text-sm font-bold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      संस्थागत विवरण
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* --- Map Layers Section (with accordion sub-sections) --- */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                नक्शा तहहरू
              </span>
            </h3>
            <ul className="mt-3">
              {Object.entries(layerCategories).map(([key, categoryData]) => (
                <li key={key} className="mb-0.5 last:mb-0">
                  {/* Accordion header for the category */}
                  <div
                    className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => toggleAccordion(key)}
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {categoryData.title}
                    </span>
                    {/* Accordion arrow icon */}
                    <svg
                      className={`w-3 h-3 fill-current text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${
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
                          <label className="inline-flex items-center cursor-pointer text-sm text-gray-700 dark:text-gray-300">
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
