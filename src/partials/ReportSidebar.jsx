// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/GovermentLogo.png";
// // Import surveys from your central data file (uncomment if used)
// // import { surveys } from "../data/surveryRoutes";

// function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
//   const [sidebarExpanded, setSidebarExpanded] = useState(
//     storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
//   );

//   // If you want to import surveys from a file, uncomment the import and remove local definition below
//   const surveys = [
//     {
//       path: "/mothertongue",
//       title: "मातृभाषाको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_mothertongue",
//     },
//     {
//       path: "/religion",
//       title: "धर्मको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_religion",
//     },
//     {
//       path: "/caste",
//       title: "जातिको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_caste",
//     },
//     {
//       path: "/workdivision",
//       title: "कामको विभाजनको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_workdivision",
//     },
//     {
//       path: "/cookingfuel",
//       title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_cookingfuel",
//     },
//     {
//       path: "/noncurable",
//       title: "निको नहुने रोगको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_noncurable",
//     },
//     {
//       path: "/inv-source",
//       title: "लगानीको स्रोतको रिपोर्ट",
//       endpoint: "Inv_source_report",
//     },
//     {
//       path: "/housestatus",
//       title: "घरको स्थितिको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_housestatus",
//     },
//     {
//       path: "/rent-details",
//       title: "भाडाको विवरण रिपोर्ट",
//       endpoint: "RentDetailsReport",
//     },
//     {
//       path: "/loan-source",
//       title: "ऋणको स्रोत रिपोर्ट",
//       endpoint: "loan_source_report",
//     },
//     {
//       path: "/saving-source",
//       title: "बचतको स्रोत रिपोर्ट",
//       endpoint: "Saving_source_report",
//     },
//     {
//       path: "/incomeexpense",
//       title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_incomeexpense",
//     },
//     {
//       path: "/foreign",
//       title: "विदेशीको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_foreign",
//     },
//     {
//       path: "/service-details",
//       title: "सेवाको विवरण रिपोर्ट",
//       endpoint: "Service_details_report",
//     },
//     {
//       path: "/death-count",
//       title: "मृत्युको संख्याको आधारमा वर्गिकरण",
//       endpoint: "lg_hsurvey_death_count",
//     },
//     {
//       path: "/land-details",
//       title: "जग्गाको विवरण रिपोर्ट",
//       endpoint: "Land_details_report",
//     },
//     {
//       path: "/building-details",
//       title: "भवनको विवरण रिपोर्ट",
//       endpoint: "BuildingDetailsReport",
//     },
//     {
//       path: "/disaster-details",
//       title: "प्रकोपको विवरण रिपोर्ट",
//       endpoint: "lg_hsurvey_disaster_details",
//     },
//     {
//       path: "/lsdetails",
//       title: "लघु उद्योगको विवरण",
//       endpoint: "hsurvey_lsdetails",
//     },
//     {
//       path: "/electricitysource",
//       title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_electricitysource",
//     },
//     {
//       path: "/toiletstatus",
//       title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_toiletstatus",
//     },
//     {
//       path: "/watersource",
//       title: "पानीको स्रोतको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_watersource",
//     },
//     {
//       path: "/agegroup",
//       title: "उमेर समूहको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_agegroup",
//     },
//   ];

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
//   }, [sidebarOpen, setSidebarOpen]);

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen, setSidebarOpen]);

//   useEffect(() => {
//     localStorage.setItem("sidebar-expanded", sidebarExpanded);
//     if (sidebarExpanded) {
//       document.querySelector("body").classList.add("sidebar-expanded");
//     } else {
//       document.querySelector("body").classList.remove("sidebar-expanded");
//     }
//   }, [sidebarExpanded]);

//   // SVG icon reused in map
//   const listIcon = (
//     <svg
//       className="w-5 h-5 mt-1 text-gray-400"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
//     </svg>
//   );

//   return (
//     <div className="min-w-fit relative">
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
//         className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } ${
//           variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "rounded-r-2xl shadow-xs"
//         }`}
//       >
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
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
//           <NavLink end to="/" className="block">
//             <img src={logo} alt="Your Company Logo" className="w-15 h-15" />
//           </NavLink>
//         </div>
//         <div className="space-y-8">
//           <div>
//             <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                 Pages
//               </span>
//             </h3>
//             <ul>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
//                   pathname.includes("map")
//                     ? "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
//                     : ""
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
//                   pathname.includes("report")
//                     ? "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
//                     : ""
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

//           {/* Survey Reports List */}
//           <div>
//             <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
//               सर्वेक्षण रिपोर्टहरू
//             </h3>
//             <ul className="space-y-1 max-h-[60vh] overflow-y-auto px-2">
//               {surveys.map(({ path, title, endpoint }, index) => (
//                 <li key={index}>
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       `flex items-start gap-3 px-4 py-3 rounded hover:bg-gray-700 transition ${
//                         isActive
//                           ? "bg-gray-800 text-white font-bold"
//                           : "text-gray-300"
//                       }`
//                     }
//                   >
//                     {listIcon}
//                     <div className="flex flex-col">
//                       <span className="text-sm">{title}</span>
//                       <span className="text-xs text-gray-400">{endpoint}</span>
//                     </div>
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/GovermentLogo.png";

function ReportSidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Your surveys array
  const surveys = [
    {
      path: "/mothertongue",
      title: "मातृभाषाको आधारमा वर्गिकरण",
      endpoint: "hsurvey_mothertongue",
    },
    {
      path: "/religion",
      title: "धर्मको आधारमा वर्गिकरण",
      endpoint: "hsurvey_religion",
    },
    {
      path: "/caste",
      title: "जातिको आधारमा वर्गिकरण",
      endpoint: "hsurvey_caste",
    },
    {
      path: "/workdivision",
      title: "कामको विभाजनको आधारमा वर्गिकरण",
      endpoint: "hsurvey_workdivision",
    },
    {
      path: "/cookingfuel",
      title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
      endpoint: "hsurvey_cookingfuel",
    },
    {
      path: "/noncurable",
      title: "निको नहुने रोगको आधारमा वर्गिकरण",
      endpoint: "hsurvey_noncurable",
    },
    {
      path: "/inv-source",
      title: "लगानीको स्रोतको रिपोर्ट",
      endpoint: "Inv_source_report",
    },
    {
      path: "/housestatus",
      title: "घरको स्थितिको आधारमा वर्गिकरण",
      endpoint: "hsurvey_housestatus",
    },
    {
      path: "/rent-details",
      title: "भाडाको विवरण रिपोर्ट",
      endpoint: "RentDetailsReport",
    },
    {
      path: "/loan-source",
      title: "ऋणको स्रोत रिपोर्ट",
      endpoint: "loan_source_report",
    },
    {
      path: "/saving-source",
      title: "बचतको स्रोत रिपोर्ट",
      endpoint: "Saving_source_report",
    },
    {
      path: "/incomeexpense",
      title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
      endpoint: "hsurvey_incomeexpense",
    },
    {
      path: "/foreign",
      title: "विदेशीको आधारमा वर्गिकरण",
      endpoint: "hsurvey_foreign",
    },
    {
      path: "/service-details",
      title: "सेवाको विवरण रिपोर्ट",
      endpoint: "Service_details_report",
    },
    {
      path: "/death-count",
      title: "मृत्युको संख्याको आधारमा वर्गिकरण",
      endpoint: "lg_hsurvey_death_count",
    },
    {
      path: "/land-details",
      title: "जग्गाको विवरण रिपोर्ट",
      endpoint: "Land_details_report",
    },
    {
      path: "/building-details",
      title: "भवनको विवरण रिपोर्ट",
      endpoint: "BuildingDetailsReport",
    },
    {
      path: "/disaster-details",
      title: "प्रकोपको विवरण रिपोर्ट",
      endpoint: "lg_hsurvey_disaster_details",
    },
    {
      path: "/lsdetails",
      title: "लघु उद्योगको विवरण",
      endpoint: "hsurvey_lsdetails",
    },
    {
      path: "/electricitysource",
      title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
      endpoint: "hsurvey_electricitysource",
    },
    {
      path: "/toiletstatus",
      title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
      endpoint: "hsurvey_toiletstatus",
    },
    {
      path: "/watersource",
      title: "पानीको स्रोतको आधारमा वर्गिकरण",
      endpoint: "hsurvey_watersource",
    },
    {
      path: "/agegroup",
      title: "उमेर समूहको आधारमा वर्गिकरण",
      endpoint: "hsurvey_agegroup",
    },
  ];
  // SVG icon reused in list
  const listIcon = (
    <svg
      className="w-5 h-5 mt-1 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );

  // ... your existing useEffect for clicks and keys etc. remain unchanged

  return (
    <div className="min-w-fit relative">
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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
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
          <NavLink end to="/" className="block">
            <img src={logo} alt="Your Company Logo" className="w-15 h-15" />
          </NavLink>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("map")
                    ? "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                    : ""
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
                  pathname.includes("report")
                    ? "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                    : ""
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

          {/* Survey Reports List */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
              सर्वेक्षण रिपोर्टहरू
            </h3>
            <ul className="space-y-1 max-h-[60vh] overflow-y-auto px-2">
              {surveys.map(({ path, title, endpoint }, index) => (
                <li key={index}>
                  <NavLink
                    to={`/ReportView${path}`}
                    className={({ isActive }) =>
                      `flex items-start gap-3 px-4 py-3 rounded hover:bg-gray-700 transition ${
                        isActive
                          ? "bg-gray-800 text-white font-bold"
                          : "text-gray-300"
                      }`
                    }
                  >
                    {listIcon}
                    <div className="flex flex-col">
                      <span className="text-sm">{title}</span>
                      <span className="text-xs text-gray-400">{endpoint}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportSidebar;
