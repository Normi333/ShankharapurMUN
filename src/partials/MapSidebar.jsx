// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/NepalGovernment.png";
// import { id } from "date-fns/locale/id";

// // Assuming SidebarLinkGroup component exists and is correctly imported
// // import SidebarLinkGroup from "./SidebarLinkGroup";

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

//   // State for controlling accordion open/close for EACH category
//   const [openAccordions, setOpenAccordions] = useState({
//     baseLayers: false,
//     buildingLayers: false,
//     transportationLayers: false,
//     naturalResourcesLayers: false,
//     publicLayers: false,
//   });

//   // Updated Layers structure - grouped by categories with sub-types
//   // REMOVED 'buildings-all', 'roads-all', 'roads-Internal', 'roads-External'
//   const layerCategories = {
//     baseLayers: {
//       title: "Base",
//       layers: [
//         { id: "border", name: "Border" },
//         { id: "napi", name: "Napi Border" },
//       ],
//     },
//     buildingLayers: {
//       title: "Infrastructure",
//       layers: [
//         // Removed { id: "buildings-all", name: "All Buildings" }
//         { id: "buildings-Residential", name: "Residential" },
//         { id: "buildings-School", name: "School" },
//         { id: "buildings-Government", name: "Government Office" },
//         { id: "buildings-Hotel", name: "Hotel" },
//         { id: "buildings-HealthPost", name: "Health Post" },
//         { id: "buildings-Temple", name: "Temple" },
//         { id: "buildings-Stupa", name: "Stupa" },
//       ],
//     },
//     transportationLayers: {
//       title: "Transportation",
//       layers: [
//         // Replaced 'roads-all', 'roads-Internal', 'roads-External' with a single 'roads' option
//         { id: "roads", name: "Roads" },
//       ],
//     },
//     publicLayers: {
//       title: "Public Place",
//       layers: [
//         { id: "paragliding", name: "Paragliding" },
//         { id: "sarbajanik-jagga", name: "Sarbajanik Jagga" },
//         { id: "sarbajanik-bhawan", name: "Sarbajanik Bhawan" },
//         { id: "football-ground", name: "Football Ground" },
//       ],
//     },
//     naturalResourcesLayers: {
//       title: "Natural Resources",
//       layers: [
//         { id: "forest", name: "Forest" },
//         { id: "river", name: "River" },
//       ],
//     },
//   };

//   // Toggle accordion visibility for a specific category
//   const toggleAccordion = (category) => {
//     setOpenAccordions((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   // close on click outside (mobile only)
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
//   }, [sidebarOpen]);

//   // close if the esc key is pressed (mobile only)
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen]);

//   // Handler for checkbox toggle (remains unchanged as it's generic)
//   const toggleLayer = (layerId) => {
//     setSelectedLayers((prevSelectedLayers) => {
//       if (prevSelectedLayers.includes(layerId)) {
//         return prevSelectedLayers.filter((id) => id !== layerId);
//       } else {
//         return [...prevSelectedLayers, layerId];
//       }
//     });
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
//         className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${
//           variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "shadow-xs"
//         }`}
//       >
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
//           {/* Close button (mobile only) */}
//           <button
//             ref={trigger}
//             className="lg:hidden text-gray-300 hover:text-gray-100"
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
//             <img src={logo} alt="नेपाल सरकार" className="w-15 h-13" />
//           </NavLink>
//         </div>

//         {/* Links */}
//         <div className="space-y-1">
//           {/* Pages group */}
//           <div>
//             <ul className="mt-3">
//               {/* Dashboard */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
//                   pathname === "/"
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname === "/" ? "" : "hover:text-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-current ${
//                         pathname === "/" ? "text-violet-200" : "text-gray-100"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                       <rect x="4" y="5" width="6" height="5" rx="1" />
//                       <rect x="4" y="14" width="6" height="5" rx="1" />
//                       <rect x="14" y="5" width="6" height="5" rx="1" />
//                       <rect x="14" y="14" width="6" height="5" rx="1" />
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       Dashboard
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//               {/* नक्सा */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
//                   pathname.includes("maps")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/maps"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("maps") ? "" : "hover:text-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-current ${
//                         pathname.includes("maps")
//                           ? "text-violet-200"
//                           : "text-gray-100"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 512 512"
//                       width="16"
//                       height="16"
//                     >
//                       <path d="M416 0L320 32 192 0 96 32 0 0v480l96 32 128-32 128 32 96-32V0zM192 32l96 32v416l-96-32V32zm-96 0l64-21.3V416l-64 21.3V32zm320 448l-64 21.3V96l64-21.3V480z" />
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       नक्सा
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//               {/* घरधुरी रिपोर्ट */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
//                   pathname.includes("householdreport")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/householdreport"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("householdreport")
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         pathname.includes("householdreport")
//                           ? "text-violet-200"
//                           : "text-gray-300"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M12 3L2 12h3v7h6v-4h2v4h6v-7h3z" />
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       घरधुरी रिपोर्ट
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//               {/* संस्थागत विवरण - REMOVED border-b here */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 ${
//                   pathname.includes("statisticsreport")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/statisticsreport"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("statisticsreport")
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         pathname.includes("statisticsreport")
//                           ? "text-violet-200"
//                           : "text-gray-300"
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polygon points="12 3 2 9 22 9 12 3" /> {/* Roof */}
//                       <line x1="4" y1="9" x2="4" y2="20" /> {/* Column 1 */}
//                       <line x1="10" y1="9" x2="10" y2="20" /> {/* Column 2 */}
//                       <line x1="14" y1="9" x2="14" y2="20" /> {/* Column 3 */}
//                       <line x1="20" y1="9" x2="20" y2="20" /> {/* Column 4 */}
//                       <line x1="2" y1="20" x2="22" y2="20" /> {/* Base */}
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       संस्थागत विवरण
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//           {/* --- Map Layers Section (with accordion sub-sections) --- */}
//           <div className="mt-8 pt-8 border-t border-white/[0.2]">
//             <h3 className="text-xs uppercase text-gray-100 font-semibold pl-3">
//               <span className="opacity-100">नक्शा तहहरू</span>
//             </h3>
//             <ul className="mt-3">
//               {Object.entries(layerCategories).map(([key, categoryData]) => (
//                 <li key={key} className="mb-0.5 last:mb-0">
//                   {/* Accordion header for the category */}
//                   <div
//                     className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1] border-b border-white/[0.2]"
//                     onClick={() => toggleAccordion(key)}
//                   >
//                     <span className="text-sm font-medium text-white">
//                       {categoryData.title}
//                     </span>
//                     {/* Accordion arrow icon */}
//                     <svg
//                       className={`w-3 h-3 fill-current text-gray-100 transform transition-transform duration-200 ${
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
//                           <label className="inline-flex items-center cursor-pointer text-sm text-gray-200">
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

// MapSidebar.jsx (formerly Sidebar.jsx)

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";
// import { id } from "date-fns/locale/id"; // This import seems unused and can be removed

function MapSidebar({
  // Changed function name to match import in MapPage.jsx
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  selectedLayers,
  setSelectedLayers,
  layerCategories, // <-- NEW PROP: Receive layerCategories from parent
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // State for controlling accordion open/close for EACH category
  const [openAccordions, setOpenAccordions] = useState({
    // Initialize based on the keys from the passed-in layerCategories
    // This ensures consistency
    ...Object.fromEntries(
      Object.keys(layerCategories).map((key) => [key, false])
    ),
  });

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
  }, [sidebarOpen]);

  // close if the esc key is pressed (mobile only)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  // Handler for checkbox toggle (remains unchanged as it's generic)
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
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
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
                        pathname === "/" ? "text-violet-200" : "text-gray-100"
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
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
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
                          : "text-gray-100"
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
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 border-b border-white/[0.2] ${
                  pathname.includes("householdreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/householdReport"
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
                      <path d="M12 3L2 12h3v7h6v-4h2v4h6v-7h3z" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      घरधुरी रिपोर्ट
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* संस्थागत विवरण - REMOVED border-b here */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 ${
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
                      <polygon points="12 3 2 9 22 9 12 3" /> {/* Roof */}
                      <line x1="4" y1="9" x2="4" y2="20" /> {/* Column 1 */}
                      <line x1="10" y1="9" x2="10" y2="20" /> {/* Column 2 */}
                      <line x1="14" y1="9" x2="14" y2="20" /> {/* Column 3 */}
                      <line x1="20" y1="9" x2="20" y2="20" /> {/* Column 4 */}
                      <line x1="2" y1="20" x2="22" y2="20" /> {/* Base */}
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      संस्थागत विवरण
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          {/* --- Map Layers Section (with accordion sub-sections) --- */}
          <div className="mt-8 pt-8 border-t border-white/[0.2]">
            <h3 className="text-xs uppercase text-gray-100 font-semibold pl-3">
              <span className="opacity-100">नक्शा तहहरू</span>
            </h3>
            <ul className="mt-3">
              {/* Use the layerCategories prop here */}
              {Object.entries(layerCategories).map(([key, categoryData]) => (
                <li key={key} className="mb-0.5 last:mb-0">
                  {/* Accordion header for the category */}
                  <div
                    className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1] border-b border-white/[0.2]"
                    onClick={() => toggleAccordion(key)}
                  >
                    <span className="text-sm font-medium text-white">
                      {categoryData.title}
                    </span>
                    {/* Accordion arrow icon */}
                    <svg
                      className={`w-3 h-3 fill-current text-gray-100 transform transition-transform duration-200 ${
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

export default MapSidebar; // Exporting as MapSidebar
