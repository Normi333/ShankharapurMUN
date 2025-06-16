// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// import SidebarLinkGroup from "./SidebarLinkGroup"; // Assuming this component exists

// function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   variant = "default",
//   selectedLayers,
//   setSelectedLayers,
// }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
//   const [sidebarExpanded, setSidebarExpanded] = useState(
//     storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
//   );

//   // State for controlling accordion open/close for EACH category
//   const [openAccordions, setOpenAccordions] = useState({
//     base: false, // You can set initial open states here
//     infrastructre: false,
//     transportation: false,
//     naturalResources: false,
//   });

//   // Updated Layers structure - grouped by categories
//   const layerCategories = {
//     baseLayers: {
//       title: "Base",
//       layers: [{ id: "river", name: "River" }],
//     },
//     buildingLayers: {
//       title: "Infrastucture",
//       layers: [{ id: "buildings", name: "Buildings" }],
//     },
//     transportationLayers: {
//       title: "Transportation",
//       layers: [{ id: "roads", name: "Roads" }],
//     },
//     naturalResourcesLayers: {
//       title: "Natural Resources",
//       layers: [{ id: "forest", name: "Forest" }],
//     },
//   };

//   // Toggle accordion visibility for a specific category
//   const toggleAccordion = (category) => {
//     setOpenAccordions((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (
//         !sidebarOpen ||
//         sidebar.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => document.removeEventListener("click", clickHandler);
//   });

//   // close if the esc key is pressed
//   // useEffect(() => {
//   //   const keyHandler = ({ keyCode }) => {
//   //     if (!sidebarOpen || keyCode !== 27) return;
//   //     setSidebarOpen(false);
//   //   };
//   //   document.addEventListener("keydown", keyHandler);
//   //   return () => document.removeListener("keydown", keyHandler);
//   // });

//   useEffect(() => {
//     localStorage.setItem("sidebar-expanded", sidebarExpanded);
//     if (sidebarExpanded) {
//       document.querySelector("body").classList.add("sidebar-expanded");
//     } else {
//       document.querySelector("body").classList.remove("sidebar-expanded");
//     }
//   }, [sidebarExpanded]);

//   // Handler for checkbox toggle
//   const toggleLayer = (layerId) => {
//     if (selectedLayers.includes(layerId)) {
//       setSelectedLayers(selectedLayers.filter((id) => id !== layerId));
//     } else {
//       setSelectedLayers([...selectedLayers, layerId]);
//     }
//   };

//   return (
//     <div className="min-w-fit">
//       {/* Sidebar backdrop (mobile only) */}
//       <div
//         className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
//           sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         aria-hidden="true"
//       ></div>

//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         ref={sidebar}
//         className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } ${
//           variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "rounded-r-2xl shadow-xs"
//         }`}
//       >
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
//           {/* Close button */}
//           <button
//             ref={trigger}
//             className="lg:hidden text-gray-500 hover:text-gray-400"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             aria-controls="sidebar"
//             aria-expanded={sidebarOpen}
//           >
//             <span className="sr-only">Close sidebar</span>
//             <svg
//               className="w-6 h-6 fill-current"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
//             </svg>
//           </button>
//           {/* Logo */}
//           <NavLink end to="/" className="block">
//             <svg
//               className="fill-violet-500"
//               xmlns="http://www.w3.org/2000/svg"
//               width={32}
//               height={32}
//             >
//               <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
//             </svg>
//           </NavLink>
//         </div>

//         {/* Links */}
//         <div className="space-y-8">
//           {/* Pages group */}
//           <div>
//             <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
//               <span
//                 className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
//                 aria-hidden="true"
//               >
//                 •••
//               </span>
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                 Pages
//               </span>
//             </h3>
//             <ul className="mt-3">
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
//                   pathname.includes("map") &&
//                   "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/maps"
//                   className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
//                     pathname.includes("map")
//                       ? ""
//                       : "hover:text-gray-900 dark:hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-current ${
//                         pathname.includes("map")
//                           ? "text-violet-500"
//                           : "text-gray-400 dark:text-gray-500"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
//                       <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
//                       <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
//                     </svg>
//                     <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                       Map
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
//                   pathname.includes("report") &&
//                   "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/report"
//                   className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
//                     pathname.includes("report")
//                       ? ""
//                       : "hover:text-gray-900 dark:hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-current ${
//                         pathname.includes("report")
//                           ? "text-violet-500"
//                           : "text-gray-400 dark:text-gray-500"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M6.649 1.018a1 1 0 0 1 .793 1.171L6.997 4.5h3.464l.517-2.689a1 1 0 1 1 1.964.378L12.498 4.5h2.422a1 1 0 0 1 0 2h-2.807l-.77 4h2.117a1 1 0 1 1 0 2h-2.501l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H5.46l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H1a1 1 0 1 1 0-2h2.807l.77-4H2.46a1 1 0 0 1 0-2h2.5l.518-2.689a1 1 0 0 1 1.17-.793ZM9.307 10.5l.77-4H6.612l-.77 4h3.464Z" />
//                     </svg>
//                     <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                       Report
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* --- Map Layers Section (with accordion sub-sections) --- */}
//           <div>
//             <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                 Map Layers
//               </span>
//             </h3>
//             <ul className="mt-3">
//               {Object.entries(layerCategories).map(([key, categoryData]) => (
//                 <li key={key} className="mb-0.5 last:mb-0">
//                   {/* Accordion header for the category */}
//                   <div
//                     className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => toggleAccordion(key)}
//                   >
//                     <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
//                       {categoryData.title}
//                     </span>
//                     {/* Accordion arrow icon */}
//                     <svg
//                       className={`w-3 h-3 fill-current text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${
//                         openAccordions[key] ? "rotate-90" : ""
//                       }`}
//                       viewBox="0 0 12 12"
//                     >
//                       <path d="M5.999 11.143L0 5.143 1.429 3.714 5.999 8.286 10.57 3.714 12 5.143z" />
//                     </svg>
//                   </div>
//                   {/* Accordion content for the layers within this category */}
//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                       openAccordions[key] ? "max-h-screen" : "max-h-0"
//                     }`}
//                   >
//                     <ul className="pl-6 pt-2 pb-1">
//                       {categoryData.layers.map((layer) => (
//                         <li key={layer.id} className="mb-2 last:mb-0">
//                           <label className="inline-flex items-center cursor-pointer text-sm text-gray-700 dark:text-gray-300">
//                             <input
//                               type="checkbox"
//                               className="form-checkbox"
//                               checked={selectedLayers.includes(layer.id)}
//                               onChange={() => toggleLayer(layer.id)}
//                             />
//                             <span className="ml-2">{layer.name}</span>
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Add other groups or footer here if needed */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
            <svg
              className="fill-violet-500"
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
            >
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
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
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Map
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("report") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/report"
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
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.649 1.018a1 1 0 0 1 .793 1.171L6.997 4.5h3.464l.517-2.689a1 1 0 1 1 1.964.378L12.498 4.5h2.422a1 1 0 0 1 0 2h-2.807l-.77 4h2.117a1 1 0 1 1 0 2h-2.501l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H5.46l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H1a1 1 0 1 1 0-2h2.807l.77-4H2.46a1 1 0 0 1 0-2h2.5l.518-2.689a1 1 0 0 1 1.17-.793ZM9.307 10.5l.77-4H6.612l-.77 4h3.464Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Report
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
                Map Layers
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
