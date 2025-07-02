// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/NepalGovernment.png";
// import { fetchParameterOptions } from "../components/chartSidebar";
// import { useAuth } from "../context/AuthContext";

// // Define all household survey API postfixes in an array
// const API_POSTFIXES_HSURVEY = [
//   "/models/lg_hsurvey_family",
//   "/models/lg_hsurvey_land_details",
//   "/models/lg_hsurvey_building_details",
//   "/models/lg_hsurvey_income_source",
//   "/models/lg_hsurvey_expense_source",
//   "/models/lg_hsurvey_saving_source",
//   "/models/lg_hsurvey_loan_source",
//   "/models/lg_hsurvey_service_details",
//   "/models/lg_hsurvey_ag_prod",
//   "/models/lg_hsurvey_livestoke_prod",
//   "/models/lg_hsurvey_School_time",
//   "/models/lg_hsurvey_disaster_details",
//   "/models/lg_hsurvey_workdivision",
//   "/models/lg_hsurvey_death_count",
// ];

// const API_POSTFIX_OSURVEY = "/models/lg_hsurvey"; // For Institutional Reports (main endpoint for these surveys)

// const surveys = [
//   {
//     path: "/individualevent",
//     title: "व्यक्तिगत घटना विवरण",
//     endpoint: "lg_osurvey",
//   },
//   {
//     path: "/communityorg",
//     title: "सामुदायिक संस्था विवरण",
//     endpoint: "co_org_details",
//   },
//   {
//     path: "/socialsecurity",
//     title: "सामाजिक सुरक्षा कार्यक्रम विवरण",
//     endpoint: "sst_details",
//   },
//   {
//     path: "/publicpond",
//     title: "सार्वजनिक पोखरी तथा माछापालन",
//     endpoint: "pond_details",
//   },
//   {
//     path: "/irrigationsystem",
//     title: "सिंचाई सुविधाको उपलब्धता विवरण",
//     endpoint: "irrigation_details",
//   },
//   {
//     path: "/modernanimalhusbandry",
//     title: "आधुनिक पशुपालन (फार्म) सम्बन्धी विवरण",
//     endpoint: "ahs_firms",
//   },
//   {
//     path: "/agriculturehumanres",
//     title: "कृषि तथा पशु सेवासँग सम्बन्धित मानव संसाधन (संख्या)",
//     endpoint: "ag_details",
//   },
//   {
//     path: "/agriculturecommunityorg",
//     title: "कृषि तथा पशु सेवासंग सम्बन्धित सामुदायिक संस्था तथा समूह",
//     endpoint: "ag_org_details",
//   },
//   {
//     path: "/milldetails",
//     title: "घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण",
//     endpoint: "mill_details",
//   },
//   {
//     path: "/landuse",
//     title: "भू-उपयोगको अवस्था विवरण",
//     endpoint: "landuser_details",
//   },
//   {
//     path: "/festival",
//     title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्mधी विवरण",
//     endpoint: "festival_details",
//   },
//   {
//     path: "/mamagroup",
//     title: "आमा महिला समूह तथा परम्परागत समूहको विवरण",
//     endpoint: "mg_details",
//   },
//   {
//     path: "/bankfinancial",
//     title: "वैक, वित्तीय संस्था, लघुवित्त तथा सहकारी संस्था विवरण",
//     endpoint: "bank_details",
//   },
//   {
//     path: "/farmergroup",
//     title: "कृषक तथा उद्यमी तथा बचत समूहको विवरण",
//     endpoint: "fgroup_details",
//   },
//   {
//     path: "/citizenawareness",
//     title: "नागरिक सचेतना केन्द्र र टोल विकास संस्थाको विवरण",
//     endpoint: "ac_td_details",
//   },
//   {
//     path: "/hoteldetails",
//     title: "होटेल, लज, रेष्टुरेण्ट, होमस्टेको विवरण",
//     endpoint: "hotel_details",
//   },
//   {
//     path: "/naturalresourcemap",
//     title: "प्राकृतिक स्रोत साधनको नक्शांकन",
//     endpoint: "nr_map_details",
//   },
//   {
//     path: "/investment",
//     title: "लगानी विवरण",
//     endpoint: "invest_details",
//   },
//   {
//     path: "/energyaccess",
//     title: "उर्जाको किसिम तथा नागरिकको पहुँच",
//     endpoint: "energy_details",
//   },
//   {
//     path: "/irrigationstatus",
//     title: "सिंचाईको अवस्था सम्बन्धी विवरण",
//     endpoint: "irr_type_details",
//   },
//   {
//     path: "/housingdevelopment",
//     title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
//     endpoint: "housing_poor_details",
//   },
//   {
//     path: "/forestenvironment",
//     title: "वन तथा वातावरण सम्बन्धी विवरण",
//     endpoint: "fe_details",
//   },
//   {
//     path: "/forestindicator",
//     title: "वन तथा वातावरण सम्बन्धी सुचक विवरण",
//     endpoint: "f_indicator_details",
//   },
//   {
//     path: "/forestbiodiversity",
//     title: "वन तथा जैविक विविधता सूचक",
//     endpoint: "fbd_details",
//   },
//   {
//     path: "/communityforest",
//     title: "सामुदायिक वनहरुको विवरण",
//     endpoint: "cf_details",
//   },
//   {
//     path: "/forest",
//     title: "वनको विवरण",
//     endpoint: "forest_detail",
//   },
//   {
//     path: "/landwatershed",
//     title: "भूमि तथा जलाधार व्यवस्थापन विवरण",
//     endpoint: "landwatershed_details",
//   },
//   {
//     path: "/environmenthygiene",
//     title: "वातावरण तथा स्वच्छता विवरण",
//     endpoint: "eh_details",
//   },
//   {
//     path: "/airpollution",
//     title: "वायु प्रदुषणका श्रोतहरु",
//     endpoint: "air_pollution_details",
//   },
//   {
//     path: "/disastermanagement",
//     title: "प्रकोप ब्यवस्थापन सम्बन्धी विवरण",
//     endpoint: "disaster_details",
//   },
//   {
//     path: "/governance",
//     title: "सुशासन (सेवा प्रवाहबाट सन्तुष्टी)",
//     endpoint: "governance_details",
//   },
//   {
//     path: "/healthnutrition",
//     title: "स्वास्थ्य तथा पोषण सम्बन्धी",
//     endpoint: "hn_details",
//   },
//   {
//     path: "/disease",
//     title: "प्रमुख रोग तथा उपचारसम्बन्धी विवरण",
//     endpoint: "disease_details",
//   },
//   {
//     path: "/majorprojects",
//     title: "गौरवका आयोजनाहरु विवरण",
//     endpoint: "project_details",
//   },
//   {
//     path: "/mainroad",
//     title: "सडक मार्ग विवरण",
//     endpoint: "main_road_details",
//   },
//   {
//     path: "/governmentbuilding",
//     title: "सरकारी भवन",
//     endpoint: "building_details",
//   },
//   {
//     path: "/publiccommunitybuilding",
//     title: "सार्वजनिक तथा सामुदायिक भवन",
//     endpoint: "pb_details",
//   },
//   {
//     path: "/bridgedetails",
//     title: "पुल तथा पुलेसा विवरण",
//     endpoint: "bridge_details",
//   },
//   {
//     path: "/grazingarea",
//     title: "चरन क्षेत्र विवरण",
//     endpoint: "graze_details",
//   },
//   {
//     path: "/waterlandpollution",
//     title: "जल तथा जमीन प्रदुषण",
//     endpoint: "wlp_details",
//   },
//   {
//     path: "/humancasualltydisaster",
//     title: "विपदबाट मानवीय क्षती विवरण",
//     endpoint: "hdd_details",
//   },
//   {
//     path: "/disasterimpact",
//     title: "विपदको असर विवरण",
//     endpoint: "d_impact_details",
//   },
//   {
//     path: "/incomedetails",
//     title: "पालिकाको आय विवरण ",
//     endpoint: "income_details",
//   },
//   {
//     path: "/monumentdetails",
//     title: "पानीमुहान, जमीन र भौतिक संरचना क्षेत्र विवरण",
//     endpoint: "pa_details",
//   },
// ];

// function ReportSidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   variant = "default",
//   selectedLayers,
//   setSelectedLayers,
//   layerCategories,
// }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const { axiosInstance } = useAuth();
//   const [householdColumns, setHouseholdColumns] = useState([]);
//   const [institutionalColumns, setInstitutionalColumns] = useState([]);
//   const [activeReportType, setActiveReportType] = useState(null); // 'household', 'institutional', or null

//   const [openAccordions, setOpenAccordions] = useState(() => {
//     const initialOpenState = {};
//     Object.keys(layerCategories || {}).forEach((key) => {
//       initialOpenState[key] = false;
//     });
//     return initialOpenState;
//   });

//   const toggleAccordion = (category) => {
//     setOpenAccordions((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   const toggleLayer = (layerId) => {
//     setSelectedLayers((prevSelectedLayers) => {
//       if (prevSelectedLayers.includes(layerId)) {
//         return prevSelectedLayers.filter((id) => id !== layerId);
//       } else {
//         return [...prevSelectedLayers, layerId];
//       }
//     });
//   };

//   // Fetch household columns from all specified endpoints
//   useEffect(() => {
//     async function getAllHouseholdColumns() {
//       let allColumns = [];
//       for (const apiPostfix of API_POSTFIXES_HSURVEY) {
//         try {
//           const { options } = await fetchParameterOptions({
//             axiosInstance,
//             apiPostfix: apiPostfix,
//           });
//           allColumns = [...allColumns, ...options];
//         } catch (e) {
//           console.error(`Error fetching columns for ${apiPostfix}:`, e);
//         }
//       }
//       const uniqueColumns = Array.from(
//         new Map(allColumns.map((item) => [item.value, item])).values()
//       );
//       setHouseholdColumns(uniqueColumns);
//     }
//     getAllHouseholdColumns();
//   }, [axiosInstance]);

//   // Fetch institutional columns (for DetailedReport dynamic routing)
//   useEffect(() => {
//     async function getInstitutionalColumns() {
//       try {
//         const fetchedColumns = [];
//         // Fetch columns for each survey endpoint if available
//         for (const survey of surveys) {
//           const apiPostfix = `/models/${survey.endpoint}`;
//           const { options } = await fetchParameterOptions({
//             axiosInstance,
//             apiPostfix: apiPostfix,
//           });
//           fetchedColumns.push(...options);
//         }
//         // Remove duplicates and set
//         const uniqueColumns = Array.from(
//           new Map(fetchedColumns.map((item) => [item.value, item])).values()
//         );
//         setInstitutionalColumns(uniqueColumns);
//       } catch (e) {
//         console.error("Error fetching institutional columns:", e);
//         setInstitutionalColumns([]);
//       }
//     }
//     getInstitutionalColumns();
//   }, [axiosInstance]);

//   // Determine activeReportType based on pathname
//   useEffect(() => {
//     if (pathname.startsWith("/DetailedReport")) {
//       setActiveReportType("household");
//     } else if (pathname.startsWith("/statisticsreport")) {
//       setActiveReportType("institutional");
//     } else if (pathname.startsWith("/Report/")) {
//       // This is for the list of institutional surveys directly
//       setActiveReportType("institutional");
//     } else if (pathname.startsWith("/DetailedReport/")) {
//       const paramValue = pathname.split("/").pop();
//       // Check if the param matches a household column
//       if (householdColumns.some((col) => col.value === paramValue)) {
//         setActiveReportType("household");
//       }
//       // Check if the param matches an institutional column
//       else if (institutionalColumns.some((col) => col.value === paramValue)) {
//         setActiveReportType("institutional");
//       } else {
//         setActiveReportType(null);
//       }
//     } else {
//       setActiveReportType(null); // For Dashboard, Maps, etc.
//     }
//   }, [pathname, householdColumns, institutionalColumns]);

//   // close on click outside (only for mobile overlay sidebar)
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

//   // close if the esc key is pressed (only for mobile overlay sidebar)
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen, setSidebarOpen]);

//   // Close sidebar on desktop screen size change
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setSidebarOpen]);

//   // SVG icon reused in list
//   const listIcon = (
//     <svg
//       className="w-5 h-5 mt-1 text-gray-100"
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
//         className={`fixed inset-0 bg-gray-900/30 z-30 lg:hidden lg:z-auto transition-opacity duration-200 ${
//           sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         aria-hidden="true"
//         onClick={() => setSidebarOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         ref={sidebar}
//         className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${
//           variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "shadow-xs"
//         }`}
//       >
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
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
//           <NavLink end to="/" className="block">
//             <img src={logo} alt="नेपाल सरकार" className="w-15 h-13" />
//           </NavLink>
//         </div>
//         <div className="space-y-8">
//           {/* Main Navigation Links */}
//           <div>
//             <ul className="space-y-0.5">
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname === "/"
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname === "/" ? "" : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                   }}
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
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname.includes("maps")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/maps"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("maps") ? "" : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                   }}
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
//               {/* घरधुरी रिपोर्ट (Household Report) */}
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname.includes("householdreport") ||
//                   (activeReportType === "household" &&
//                     pathname.startsWith("/DetailedReport/"))
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/DetailedReport"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("householdreport") ||
//                     (activeReportType === "household" &&
//                       pathname.startsWith("/DetailedReport/"))
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                     setActiveReportType("household");
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         pathname.includes("householdreport") ||
//                         (activeReportType === "household" &&
//                           pathname.startsWith("/DetailedReport/"))
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
//               {/* संस्थागत विवरण (Institutional Details/Statistics Report) */}
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
//                   pathname.includes("statisticsreport") ||
//                   (activeReportType === "institutional" &&
//                     pathname.startsWith("/Report/")) || // For the specific survey reports
//                   (activeReportType === "institutional" &&
//                     pathname.startsWith("/DetailedReport/")) // For detailed reports derived from institutional
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/statisticsreport"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("statisticsreport") ||
//                     (activeReportType === "institutional" &&
//                       pathname.startsWith("/Report/")) ||
//                     (activeReportType === "institutional" &&
//                       pathname.startsWith("/DetailedReport/"))
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                     setActiveReportType("institutional");
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         pathname.includes("statisticsreport") ||
//                         (activeReportType === "institutional" &&
//                           pathname.startsWith("/Report/")) ||
//                         (activeReportType === "institutional" &&
//                           pathname.startsWith("/DetailedReport/"))
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
//                       <polygon points="12 3 2 9 22 9 12 3" />
//                       <line x1="4" y1="9" x2="4" y2="20" />
//                       <line x1="10" y1="9" x2="10" y2="20" />
//                       <line x1="14" y1="9" x2="14" y2="20" />
//                       <line x1="20" y1="9" x2="20" y2="20" />
//                       <line x1="2" y1="20" x2="22" y2="20" />
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       संस्थागत विवरण
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Conditional rendering for "संस्थागत रिपोर्ट" (Institutional Survey List) */}
//           {activeReportType === "institutional" && (
//             <div className="mt-8 pt-8 border-t border-white/[0.2]">
//               <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
//                 संस्थागत रिपोर्ट
//               </h3>
//               <div className="mt-3">
//                 <ul className="mt-3">
//                   {surveys.map(({ path, title, endpoint }, index) => (
//                     <li
//                       key={index}
//                       className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
//                     >
//                       <NavLink
//                         to={`/Report${path}`}
//                         className={({ isActive }) =>
//                           `block text-white transition duration-150 ${
//                             isActive
//                               ? "bg-violet-500/[0.2] text-white font-bold"
//                               : "hover:text-gray-200"
//                           }`
//                         }
//                         onClick={() => {
//                           setSidebarOpen(false);
//                           // No need to set activeReportType here again as it's already "institutional"
//                         }}
//                       >
//                         <div className="flex items-center">
//                           {listIcon}
//                           <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
//                             {title}
//                           </span>
//                         </div>
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}

//           {/* Conditional rendering for "घरधुरी रिपोर्टका लागि स्तम्भहरू" (Household Report Columns) */}
//           {(activeReportType === "household" ||
//             (pathname.startsWith("/DetailedReport/") &&
//               householdColumns.some((col) => pathname.includes(col.value)))) &&
//             householdColumns.length > 0 && (
//               <div className="mt-8 pt-8 border-t border-white/[0.2]">
//                 <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
//                   घरधुरी रिपोर्टका लागि स्तम्भहरू
//                 </h3>
//                 <div className="mt-3">
//                   <ul className="mt-3">
//                     {householdColumns.map(({ value, label }, index) => (
//                       <li
//                         key={`household-col-${index}`}
//                         className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
//                           pathname === `/DetailedReport/${value}`
//                             ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                             : ""
//                         }`}
//                       >
//                         <NavLink
//                           to={`/DetailedReport/${value}`}
//                           className={({ isActive }) =>
//                             `block text-white transition duration-150 ${
//                               isActive
//                                 ? " text-white font-bold"
//                                 : "hover:text-gray-200"
//                             }`
//                           }
//                           onClick={() => setSidebarOpen(false)}
//                         >
//                           <div className="flex items-center">
//                             {listIcon}
//                             <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
//                               {label}
//                             </span>
//                           </div>
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//           {/* --- Map Layers Section (with accordion sub-sections) --- */}
//           {pathname.includes("maps") && (
//             <div className="mt-8 pt-8 border-t border-white/[0.2]">
//               <h3 className="text-xs uppercase text-gray-100 font-semibold pl-3">
//                 <span className="opacity-100">नक्शा तहहरू</span>
//               </h3>
//               <ul className="mt-3">
//                 {Object.entries(layerCategories).map(([key, categoryData]) => (
//                   <li key={key} className="mb-0.5 last:mb-0">
//                     <div
//                       className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1] border-b border-white/[0.2]"
//                       onClick={() => toggleAccordion(key)}
//                     >
//                       <span className="text-sm font-medium text-white">
//                         {categoryData.title}
//                       </span>
//                       <svg
//                         className={`w-3 h-3 fill-current text-gray-100 transform transition-transform duration-200 ${
//                           openAccordions[key] ? "rotate-90" : ""
//                         }`}
//                         viewBox="0 0 12 12"
//                       >
//                         <path d="M5.999 11.143L0 5.143 1.429 3.714 5.999 8.286 10.57 3.714 12 5.143z" />
//                       </svg>
//                     </div>
//                     <div
//                       className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                         openAccordions[key] ? "max-h-screen" : "max-h-0"
//                       }`}
//                     >
//                       <ul className="pl-6 pt-2 pb-1">
//                         {categoryData.layers.map((layer) => (
//                           <li key={layer.id} className="mb-2 last:mb-0">
//                             <label className="inline-flex items-center cursor-pointer text-sm text-gray-200">
//                               <input
//                                 type="checkbox"
//                                 className="form-checkbox"
//                                 checked={selectedLayers.includes(layer.id)}
//                                 onChange={() => toggleLayer(layer.id)}
//                               />
//                               <span className="ml-2">{layer.name}</span>
//                             </label>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReportSidebar;

// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/NepalGovernment.png";
// // import { fetchParameterOptions } from "../components/chartSidebar"; // Keep if still used for map layers or other dynamic fetching
// import { useAuth } from "../context/AuthContext";
// import {
//   COLUMN_TO_API_POSTFIX_MAP,
//   NEPAL_COLUMN_NAMES,
// } from "../pages/MainChartScreenSearch";

// const API_POSTFIXES_HSURVEY = [
//   "/models/lg_hsurvey_family",
//   "/models/lg_hsurvey_land_details",
//   "/models/lg_hsurvey_building_details",
//   "/models/lg_hsurvey_income_source",
//   "/models/lg_hsurvey_expense_source",
//   "/models/lg_hsurvey_saving_source",
//   "/models/lg_hsurvey_loan_source",
//   "/models/lg_hsurvey_service_details",
//   "/models/lg_hsurvey_ag_prod",
//   "/models/lg_hsurvey_livestoke_prod",
//   "/models/lg_hsurvey_School_time",
//   "/models/lg_hsurvey_disaster_details",
//   "/models/lg_hsurvey_workdivision",
//   "/models/lg_hsurvey_death_count",
//   "/models/lg_hsurvey",
// ];

// const API_POSTFIX_OSURVEY = "/models/lg_osurvey"; // Corrected this if it was intended to be the main osurvey endpoint

// // Your existing 'surveys' array for institutional reports.
// // We'll use NEPAL_COLUMN_NAMES for their titles as well if the endpoints match.
// const surveys = [
//   {
//     path: "/individualevent",
//     title: "व्यक्तिगत घटना विवरण",
//     endpoint: "lg_osurvey",
//   },
//   {
//     path: "/communityorg",
//     title: "सामुदायिक संस्था विवरण",
//     endpoint: "co_org_details",
//   },
//   {
//     path: "/socialsecurity",
//     title: "सामाजिक सुरक्षा कार्यक्रम विवरण",
//     endpoint: "sst_details",
//   },
//   {
//     path: "/publicpond",
//     title: "सार्वजनिक पोखरी तथा माछापालन",
//     endpoint: "pond_details",
//   },
//   {
//     path: "/irrigationsystem",
//     title: "सिंचाई सुविधाको उपलब्धता विवरण",
//     endpoint: "irrigation_details",
//   },
//   {
//     path: "/modernanimalhusbandry",
//     title: "आधुनिक पशुपालन (फार्म) सम्बन्धी विवरण",
//     endpoint: "ahs_firms",
//   },
//   {
//     path: "/agriculturehumanres",
//     title: "कृषि तथा पशु सेवासँग सम्बन्धित मानव संसाधन (संख्या)",
//     endpoint: "ag_details",
//   },
//   {
//     path: "/agriculturecommunityorg",
//     title: "कृषि तथा पशु सेवासंग सम्बन्धित सामुदायिक संस्था तथा समूह",
//     endpoint: "ag_org_details",
//   },
//   {
//     path: "/milldetails",
//     title: "घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण",
//     endpoint: "mill_details",
//   },
//   {
//     path: "/landuse",
//     title: "भू-उपयोगको अवस्था विवरण",
//     endpoint: "landuser_details",
//   },
//   {
//     path: "/festival",
//     title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्mधी विवरण",
//     endpoint: "festival_details",
//   },
//   {
//     path: "/mamagroup",
//     title: "आमा महिला समूह तथा परम्परागत समूहको विवरण",
//     endpoint: "mg_details",
//   },
//   {
//     path: "/bankfinancial",
//     title: "वैक, वित्तीय संस्था, लघुवित्त तथा सहकारी संस्था विवरण",
//     endpoint: "bank_details",
//   },
//   {
//     path: "/farmergroup",
//     title: "कृषक तथा उद्यमी तथा बचत समूहको विवरण",
//     endpoint: "fgroup_details",
//   },
//   {
//     path: "/citizenawareness",
//     title: "नागरिक सचेतना केन्द्र र टोल विकास संस्थाको विवरण",
//     endpoint: "ac_td_details",
//   },
//   {
//     path: "/hoteldetails",
//     title: "होटेल, लज, रेष्टुरेण्ट, होमस्टेको विवरण",
//     endpoint: "hotel_details",
//   },
//   {
//     path: "/naturalresourcemap",
//     title: "प्राकृतिक स्रोत साधनको नक्शांकन",
//     endpoint: "nr_map_details",
//   },
//   {
//     path: "/investment",
//     title: "लगानी विवरण",
//     endpoint: "invest_details",
//   },
//   {
//     path: "/energyaccess",
//     title: "उर्जाको किसिम तथा नागरिकको पहुँच",
//     endpoint: "energy_details",
//   },
//   {
//     path: "/irrigationstatus",
//     title: "सिंचाईको अवस्था सम्बन्धी विवरण",
//     endpoint: "irr_type_details",
//   },
//   {
//     path: "/housingdevelopment",
//     title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
//     endpoint: "housing_poor_details",
//   },
//   {
//     path: "/forestenvironment",
//     title: "वन तथा वातावरण सम्बन्धी विवरण",
//     endpoint: "fe_details",
//   },
//   {
//     path: "/forestindicator",
//     title: "वन तथा वातावरण सम्बन्धी सुचक विवरण",
//     endpoint: "f_indicator_details",
//   },
//   {
//     path: "/forestbiodiversity",
//     title: "वन तथा जैविक विविधता सूचक",
//     endpoint: "fbd_details",
//   },
//   {
//     path: "/communityforest",
//     title: "सामुदायिक वनहरुको विवरण",
//     endpoint: "cf_details",
//   },
//   {
//     path: "/forest",
//     title: "वनको विवरण",
//     endpoint: "forest_detail",
//   },
//   {
//     path: "/landwatershed",
//     title: "भूमि तथा जलाधार व्यवस्थापन विवरण",
//     endpoint: "landwatershed_details",
//   },
//   {
//     path: "/environmenthygiene",
//     title: "वातावरण तथा स्वच्छता विवरण",
//     endpoint: "eh_details",
//   },
//   {
//     path: "/airpollution",
//     title: "वायु प्रदुषणका श्रोतहरु",
//     endpoint: "air_pollution_details",
//   },
//   {
//     path: "/disastermanagement",
//     title: "प्रकोप ब्यवस्थापन सम्बन्धी विवरण",
//     endpoint: "disaster_details",
//   },
//   {
//     path: "/governance",
//     title: "सुशासन (सेवा प्रवाहबाट सन्तुष्टी)",
//     endpoint: "governance_details",
//   },
//   {
//     path: "/healthnutrition",
//     title: "स्वास्थ्य तथा पोषण सम्बन्धी",
//     endpoint: "hn_details",
//   },
//   {
//     path: "/disease",
//     title: "प्रमुख रोग तथा उपचारसम्बन्धी विवरण",
//     endpoint: "disease_details",
//   },
//   {
//     path: "/majorprojects",
//     title: "गौरवका आयोजनाहरु विवरण",
//     endpoint: "project_details",
//   },
//   {
//     path: "/mainroad",
//     title: "सडक मार्ग विवरण",
//     endpoint: "main_road_details",
//   },
//   {
//     path: "/governmentbuilding",
//     title: "सरकारी भवन",
//     endpoint: "building_details",
//   },
//   {
//     path: "/publiccommunitybuilding",
//     title: "सार्वजनिक तथा सामुदायिक भवन",
//     endpoint: "pb_details",
//   },
//   {
//     path: "/bridgedetails",
//     title: "पुल तथा पुलेसा विवरण",
//     endpoint: "bridge_details",
//   },
//   {
//     path: "/grazingarea",
//     title: "चरन क्षेत्र विवरण",
//     endpoint: "graze_details",
//   },
//   {
//     path: "/waterlandpollution",
//     title: "जल तथा जमीन प्रदुषण",
//     endpoint: "wlp_details",
//   },
//   {
//     path: "/humancasualltydisaster",
//     title: "विपदबाट मानवीय क्षती विवरण",
//     endpoint: "hdd_details",
//   },
//   {
//     path: "/disasterimpact",
//     title: "विपदको असर विवरण",
//     endpoint: "d_impact_details",
//   },
//   {
//     path: "/incomedetails",
//     title: "पालिकाको आय विवरण ",
//     endpoint: "income_details",
//   },
//   {
//     path: "/monumentdetails",
//     title: "पानीमुहान, जमीन र भौतिक संरचना क्षेत्र विवरण",
//     endpoint: "pa_details",
//   },
// ];

// function ReportSidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   variant = "default",
//   selectedLayers,
//   setSelectedLayers,
//   layerCategories,
// }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const { axiosInstance } = useAuth();
//   // We no longer need to fetch householdColumns dynamically for linking,
//   // as we'll derive them from COLUMN_TO_API_POSTFIX_MAP.
//   // const [householdColumns, setHouseholdColumns] = useState([]);
//   const [institutionalColumns, setInstitutionalColumns] = useState([]); // Keep if needed for other logic
//   const [activeReportType, setActiveReportType] = useState(null); // 'household', 'institutional', or null

//   const [openAccordions, setOpenAccordions] = useState(() => {
//     const initialOpenState = {};
//     Object.keys(layerCategories || {}).forEach((key) => {
//       initialOpenState[key] = false;
//     });
//     return initialOpenState;
//   });

//   const toggleAccordion = (category) => {
//     setOpenAccordions((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   const toggleLayer = (layerId) => {
//     setSelectedLayers((prevSelectedLayers) => {
//       if (prevSelectedLayers.includes(layerId)) {
//         return prevSelectedLayers.filter((id) => id !== layerId);
//       } else {
//         return [...prevSelectedLayers, layerId];
//       }
//     });
//   };

//   // Determine activeReportType based on pathname
//   useEffect(() => {
//     // Check if the current path matches any of the household report keys
//     const isHouseholdReportPath = Object.keys(COLUMN_TO_API_POSTFIX_MAP).some(
//       (key) => pathname === `/DetailedReport/${key}`
//     );

//     // Check if the current path matches any of the institutional survey paths
//     const isInstitutionalSurveyPath = surveys.some(
//       (survey) => pathname === `/Report${survey.path}`
//     );

//     if (isHouseholdReportPath) {
//       setActiveReportType("household");
//     } else if (
//       isInstitutionalSurveyPath ||
//       pathname.startsWith("/statisticsreport")
//     ) {
//       setActiveReportType("institutional");
//     } else if (pathname.startsWith("/maps")) {
//       setActiveReportType("maps"); // New state for maps
//     } else {
//       setActiveReportType(null); // For Dashboard, etc.
//     }
//   }, [pathname]);

//   // close on click outside (only for mobile overlay sidebar)
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

//   // close if the esc key is pressed (only for mobile overlay sidebar)
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen, setSidebarOpen]);

//   // FIX: Close sidebar on desktop screen size change or when shrinking to mobile
//   useEffect(() => {
//     const handleResize = () => {
//       // If screen width is large enough for desktop, ensure sidebar is closed
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(false);
//       } else {
//         // If screen width is small (mobile), ensure sidebar is closed
//         // unless it's explicitly opened (which would be handled by the trigger)
//         // This ensures it doesn't stay open if resized from large to small
//         if (sidebarOpen) {
//           // Only close if it was previously open
//           setSidebarOpen(false);
//         }
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setSidebarOpen, sidebarOpen]); // Add sidebarOpen to dependencies to re-run if it changes

//   // SVG icon reused in list
//   const listIcon = (
//     <svg
//       className="w-5 h-5 mt-1 text-gray-100"
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
//         className={`fixed inset-0 bg-gray-900/30 z-30 lg:hidden lg:z-auto transition-opacity duration-200 ${
//           sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         aria-hidden="true"
//         onClick={() => setSidebarOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         ref={sidebar}
//         className={`flex flex-col absolute z-60 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
//           variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "shadow-xs"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
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
//           <NavLink end to="/" className="block">
//             <img src={logo} alt="नेपाल सरकार" className="w-15 h-13" />
//           </NavLink>
//         </div>
//         <div className="space-y-8">
//           {/* Main Navigation Links */}
//           <div>
//             <ul className="space-y-0.5">
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname === "/"
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname === "/" ? "" : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                   }}
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
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname.includes("maps")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/maps"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("maps") ? "" : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                   }}
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
//               {/* घरधुरी रिपोर्ट (Household Report) */}
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   activeReportType === "household"
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/DetailedReport/family-gender"
//                   className={`block text-white truncate transition duration-150 ${
//                     activeReportType === "household"
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                     setActiveReportType("household");
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         activeReportType === "household"
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
//               {/* संस्थागत विवरण (Institutional Details/Statistics Report) */}
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
//                   activeReportType === "institutional"
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 }`}
//               >
//                 <NavLink
//                   end
//                   to="/statisticsreport" // Link to the main institutional report page
//                   className={`block text-white truncate transition duration-150 ${
//                     activeReportType === "institutional"
//                       ? ""
//                       : "hover:text-gray-200"
//                   }`}
//                   onClick={() => {
//                     setSidebarOpen(false);
//                     setActiveReportType("institutional");
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-none stroke-current ${
//                         activeReportType === "institutional"
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
//                       <polygon points="12 3 2 9 22 9 12 3" />
//                       <line x1="4" y1="9" x2="4" y2="20" />
//                       <line x1="10" y1="9" x2="10" y2="20" />
//                       <line x1="14" y1="9" x2="14" y2="20" />
//                       <line x1="20" y1="9" x2="20" y2="20" />
//                       <line x1="2" y1="20" x2="22" y2="20" />
//                     </svg>
//                     <span className="text-sm font-bold ml-4 opacity-100">
//                       संस्थागत विवरण
//                     </span>
//                   </div>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Conditional rendering for "संस्थागत रिपोर्ट" (Institutional Survey List) */}
//           {activeReportType === "institutional" && (
//             <div className="mt-8 pt-8 border-t border-white/[0.2]">
//               <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
//                 संस्थागत रिपोर्ट
//               </h3>
//               <div className="mt-3">
//                 <ul className="mt-3">
//                   {surveys.map(({ path, title, endpoint }, index) => (
//                     <li
//                       key={index}
//                       className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
//                     >
//                       <NavLink
//                         to={`/Report${path}`} // Your existing institutional report paths
//                         className={({ isActive }) =>
//                           `block text-white transition duration-150 ${
//                             isActive
//                               ? "bg-violet-500/[0.2] text-white font-bold"
//                               : "hover:text-gray-200"
//                           }`
//                         }
//                         onClick={() => {
//                           setSidebarOpen(false);
//                           // No need to set activeReportType here again as it's already "institutional"
//                         }}
//                       >
//                         <div className="flex items-center">
//                           {listIcon}
//                           <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
//                             {/* Use NEPAL_COLUMN_NAMES for the title here if endpoint is a key */}
//                             {NEPAL_COLUMN_NAMES[endpoint] || title}
//                           </span>
//                         </div>
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}

//           {/* Conditional rendering for "घरधुरी रिपोर्टका लागि स्तम्भहरू" (Household Report Columns) */}
//           {/* NOW WE ITERATE DIRECTLY OVER COLUMN_TO_API_POSTFIX_MAP KEYS FOR HOUSEHOLD REPORTS */}
//           {activeReportType === "household" && (
//             <div className="mt-8 pt-8 border-t border-white/[0.2]">
//               <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
//                 घरधुरी रिपोर्टका लागि स्तम्भहरू
//               </h3>
//               <div className="mt-3">
//                 <ul className="mt-3">
//                   {Object.keys(COLUMN_TO_API_POSTFIX_MAP).map(
//                     (reportKey, index) => {
//                       const { api, column, filterParam, aggregateType } =
//                         COLUMN_TO_API_POSTFIX_MAP[reportKey];

//                       // Only render if it's a household-related report based on API path
//                       // You might need to refine this condition based on how many
//                       // of your 20+ keys are truly 'household' vs 'institutional' if they share prefixes
//                       if (api.startsWith("/models/lg_hsurvey")) {
//                         return (
//                           <li
//                             key={`household-col-${reportKey}`} // Use reportKey as unique key
//                             className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
//                               pathname === `/DetailedReport/${reportKey}` // Check for the new report path
//                                 ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                                 : ""
//                             }`}
//                           >
//                             <NavLink
//                               to={`/DetailedReport/${reportKey}`} // IMPORTANT: Use the reportKey here
//                               className={({ isActive }) =>
//                                 `block text-white transition duration-150 ${
//                                   isActive
//                                     ? "bg-violet-500/[0.2] text-white font-bold"
//                                     : "hover:text-gray-200"
//                                 }`
//                               }
//                               onClick={() => setSidebarOpen(false)}
//                             >
//                               <div className="flex items-center">
//                                 {listIcon}
//                                 <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
//                                   {/* Use NEPAL_COLUMN_NAMES for the label */}
//                                   {NEPAL_COLUMN_NAMES[reportKey] || reportKey}
//                                 </span>
//                               </div>
//                             </NavLink>
//                           </li>
//                         );
//                       }
//                       return null; // Don't render if not a household report
//                     }
//                   )}
//                 </ul>
//               </div>
//             </div>
//           )}

//           {/* --- Map Layers Section (with accordion sub-sections) --- */}
//           {pathname.includes("maps") && ( // Or activeReportType === "maps"
//             <div className="mt-8 pt-8 border-t border-white/[0.2]">
//               <h3 className="text-xs uppercase text-gray-100 font-semibold pl-3">
//                 <span className="opacity-100">नक्शा तहहरू</span>
//               </h3>
//               <ul className="mt-3">
//                 {Object.entries(layerCategories).map(([key, categoryData]) => (
//                   <li key={key} className="mb-0.5 last:mb-0">
//                     <div
//                       className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1] border-b border-white/[0.2]"
//                       onClick={() => toggleAccordion(key)}
//                     >
//                       <span className="text-sm font-medium text-white">
//                         {categoryData.title}
//                       </span>
//                       <svg
//                         className={`w-3 h-3 fill-current text-gray-100 transform transition-transform duration-200 ${
//                           openAccordions[key] ? "rotate-90" : ""
//                         }`}
//                         viewBox="0 0 12 12"
//                       >
//                         <path d="M5.999 11.143L0 5.143 1.429 3.714 5.999 8.286 10.57 3.714 12 5.143z" />
//                       </svg>
//                     </div>
//                     <div
//                       className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                         openAccordions[key] ? "max-h-screen" : "max-h-0"
//                       }`}
//                     >
//                       <ul className="pl-6 pt-2 pb-1">
//                         {categoryData.layers.map((layer) => (
//                           <li key={layer.id} className="mb-2 last:mb-0">
//                             <label className="inline-flex items-center cursor-pointer text-sm text-gray-200">
//                               <input
//                                 type="checkbox"
//                                 className="form-checkbox"
//                                 checked={selectedLayers.includes(layer.id)}
//                                 onChange={() => toggleLayer(layer.id)}
//                               />
//                               <span className="ml-2">{layer.name}</span>
//                             </label>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReportSidebar;
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext is correctly set up
import {
  COLUMN_TO_API_POSTFIX_MAP,
  NEPAL_COLUMN_NAMES,
} from "../pages/MainChartScreenSearch";

// Removed redundant API_POSTFIXES_HSURVEY and API_POSTFIX_OSURVEY
// as COLUMN_TO_API_POSTFIX_MAP and 'surveys' array already define endpoints.

const surveys = [
  {
    path: "/individualevent",
    title: "व्यक्तिगत घटना विवरण",
    endpoint: "lg_osurvey",
  },
  {
    path: "/communityorg",
    title: "सामुदायिक संस्था विवरण",
    endpoint: "co_org_details",
  },
  {
    path: "/socialsecurity",
    title: "सामाजिक सुरक्षा कार्यक्रम विवरण",
    endpoint: "sst_details",
  },
  {
    path: "/publicpond",
    title: "सार्वजनिक पोखरी तथा माछापालन",
    endpoint: "pond_details",
  },
  {
    path: "/irrigationsystem",
    title: "सिंचाई सुविधाको उपलब्धता विवरण",
    endpoint: "irrigation_details",
  },
  {
    path: "/modernanimalhusbandry",
    title: "आधुनिक पशुपालन (फार्म) सम्बन्धी विवरण",
    endpoint: "ahs_firms",
  },
  {
    path: "/agriculturehumanres",
    title: "कृषि तथा पशु सेवासँग सम्बन्धित मानव संसाधन (संख्या)",
    endpoint: "ag_details",
  },
  {
    path: "/agriculturecommunityorg",
    title: "कृषि तथा पशु सेवासंग सम्बन्धित सामुदायिक संस्था तथा समूह",
    endpoint: "ag_org_details",
  },
  {
    path: "/milldetails",
    title: "घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण",
    endpoint: "mill_details",
  },
  {
    path: "/landuse",
    title: "भू-उपयोगको अवस्था विवरण",
    endpoint: "landuser_details",
  },
  {
    path: "/festival",
    title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्mधी विवरण",
    endpoint: "festival_details",
  },
  {
    path: "/mamagroup",
    title: "आमा महिला समूह तथा परम्परागत समूहको विवरण",
    endpoint: "mg_details",
  },
  {
    path: "/bankfinancial",
    title: "वैक, वित्तीय संस्था, लघुवित्त तथा सहकारी संस्था विवरण",
    endpoint: "bank_details",
  },
  {
    path: "/farmergroup",
    title: "कृषक तथा उद्यमी तथा बचत समूहको विवरण",
    endpoint: "fgroup_details",
  },
  {
    path: "/citizenawareness",
    title: "नागरिक सचेतना केन्द्र र टोल विकास संस्थाको विवरण",
    endpoint: "ac_td_details",
  },
  {
    path: "/hoteldetails",
    title: "होटेल, लज, रेष्टुरेण्ट, होमस्टेको विवरण",
    endpoint: "hotel_details",
  },
  {
    path: "/naturalresourcemap",
    title: "प्राकृतिक स्रोत साधनको नक्शांकन",
    endpoint: "nr_map_details",
  },
  { path: "/investment", title: "लगानी विवरण", endpoint: "invest_details" },
  {
    path: "/energyaccess",
    title: "उर्जाको किसिम तथा नागरिकको पहुँच",
    endpoint: "energy_details",
  },
  {
    path: "/irrigationstatus",
    title: "सिंचाईको अवस्था सम्बन्धी विवरण",
    endpoint: "irr_type_details",
  },
  {
    path: "/housingdevelopment",
    title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
    endpoint: "housing_poor_details",
  },
  {
    path: "/forestenvironment",
    title: "वन तथा वातावरण सम्बन्धी विवरण",
    endpoint: "fe_details",
  },
  {
    path: "/forestindicator",
    title: "वन तथा वातावरण सम्बन्धी सुचक विवरण",
    endpoint: "f_indicator_details",
  },
  {
    path: "/forestbiodiversity",
    title: "वन तथा जैविक विविधता सूचक",
    endpoint: "fbd_details",
  },
  {
    path: "/communityforest",
    title: "सामुदायिक वनहरुको विवरण",
    endpoint: "cf_details",
  },
  { path: "/forest", title: "वनको विवरण", endpoint: "forest_detail" },
  {
    path: "/landwatershed",
    title: "भूमि तथा जलाधार व्यवस्थापन विवरण",
    endpoint: "landwatershed_details",
  },
  {
    path: "/environmenthygiene",
    title: "वातावरण तथा स्वच्छता विवरण",
    endpoint: "eh_details",
  },
  {
    path: "/airpollution",
    title: "वायु प्रदुषणका श्रोतहरु",
    endpoint: "air_pollution_details",
  },
  {
    path: "/disastermanagement",
    title: "प्रकोप ब्यवस्थापन सम्बन्धी विवरण",
    endpoint: "disaster_details",
  },
  {
    path: "/governance",
    title: "सुशासन (सेवा प्रवाहबाट सन्तुष्टी)",
    endpoint: "governance_details",
  },
  {
    path: "/healthnutrition",
    title: "स्वास्थ्य तथा पोषण सम्बन्धी",
    endpoint: "hn_details",
  },
  {
    path: "/disease",
    title: "प्रमुख रोग तथा उपचारसम्बन्धी विवरण",
    endpoint: "disease_details",
  },
  {
    path: "/majorprojects",
    title: "गौरवका आयोजनाहरु विवरण",
    endpoint: "project_details",
  },
  {
    path: "/mainroad",
    title: "सडक मार्ग विवरण",
    endpoint: "main_road_details",
  },
  {
    path: "/governmentbuilding",
    title: "सरकारी भवन",
    endpoint: "building_details",
  },
  {
    path: "/publiccommunitybuilding",
    title: "सार्वजनिक तथा सामुदायिक भवन",
    endpoint: "pb_details",
  },
  {
    path: "/bridgedetails",
    title: "पुल तथा पुलेसा विवरण",
    endpoint: "bridge_details",
  },
  {
    path: "/grazingarea",
    title: "चरन क्षेत्र विवरण",
    endpoint: "graze_details",
  },
  {
    path: "/waterlandpollution",
    title: "जल तथा जमीन प्रदुषण",
    endpoint: "wlp_details",
  },
  {
    path: "/humancasualltydisaster",
    title: "विपदबाट मानवीय क्षती विवरण",
    endpoint: "hdd_details",
  },
  {
    path: "/disasterimpact",
    title: "विपदको असर विवरण",
    endpoint: "d_impact_details",
  },
  {
    path: "/incomedetails",
    title: "पालिकाको आय विवरण ",
    endpoint: "income_details",
  },
  {
    path: "/monumentdetails",
    title: "पानीमुहान, जमीन र भौतिक संरचना क्षेत्र विवरण",
    endpoint: "pa_details",
  },
];

function ReportSidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  selectedLayers,
  setSelectedLayers,
  layerCategories = {}, // Ensure layerCategories defaults to an empty object
  isLoading = false, // Add isLoading prop with a default of false
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // useAuth is imported but axiosInstance is not used within this component's JSX or logic directly.
  // const { axiosInstance } = useAuth();

  const [activeReportType, setActiveReportType] = useState(null); // 'household', 'institutional', or null

  const [openAccordions, setOpenAccordions] = useState(() => {
    const initialOpenState = {};
    Object.keys(layerCategories).forEach((key) => {
      // Use layerCategories directly as it's defaulted to {}
      initialOpenState[key] = false;
    });
    return initialOpenState;
  });

  const toggleAccordion = (category) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleLayer = (layerId) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layerId)) {
        return prevSelectedLayers.filter((id) => id !== layerId);
      } else {
        return [...prevSelectedLayers, layerId];
      }
    });
  };

  // Determine activeReportType based on pathname
  useEffect(() => {
    const isHouseholdReportPath = Object.keys(COLUMN_TO_API_POSTFIX_MAP).some(
      (key) => pathname === `/DetailedReport/${key}`
    );

    const isInstitutionalSurveyPath = surveys.some(
      (survey) => pathname === `/Report${survey.path}`
    );

    if (isHouseholdReportPath) {
      setActiveReportType("household");
    } else if (
      isInstitutionalSurveyPath ||
      pathname.startsWith("/statisticsreport")
    ) {
      setActiveReportType("institutional");
    } else if (pathname.startsWith("/maps")) {
      setActiveReportType("maps");
    } else {
      setActiveReportType(null);
    }
  }, [pathname]);

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
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed (only for mobile overlay sidebar)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close sidebar on desktop screen size change or when shrinking to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      } else {
        if (sidebarOpen) {
          setSidebarOpen(false);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen, sidebarOpen]);

  // SVG icon reused in list
  const listIcon = (
    <svg
      className="w-5 h-5 mt-1 text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );

  // Helper function for NavLink classes
  const getNavLinkClasses = (isActive) =>
    `block text-white truncate transition duration-150 ${
      isActive
        ? "bg-violet-500/[0.2] text-white font-bold"
        : "hover:text-gray-200"
    }`;

  // Common conditional class for disabled state
  const disabledClasses = isLoading ? "pointer-events-none opacity-50" : "";

  return (
    <div className="min-w-fit relative">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-30 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-60 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "shadow-xs"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className={`lg:hidden text-gray-300 hover:text-gray-100 ${disabledClasses}`}
            onClick={() => !isLoading && setSidebarOpen(!sidebarOpen)} // Prevent toggle if loading
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            disabled={isLoading} // Disable the button
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
          {/* Logo NavLink is usually always active, but you can disable it if necessary */}
          <NavLink
            end
            to="/"
            className={`block ${disabledClasses}`}
            tabIndex={isLoading ? -1 : 0}
          >
            <img src={logo} alt="नेपाल सरकार" className="w-15 h-13" />
          </NavLink>
        </div>
        <div className="space-y-8">
          {/* Main Navigation Links */}
          <div>
            <ul className="space-y-0.5">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  pathname === "/"
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2] ${disabledClasses}`}
              >
                <NavLink
                  end
                  to="/"
                  className={getNavLinkClasses(pathname === "/")}
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault(); // Prevent navigation
                      return; // Stop further execution
                    }
                    setSidebarOpen(false);
                  }}
                  tabIndex={isLoading ? -1 : 0}
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
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  pathname.includes("maps")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2] ${disabledClasses}`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={getNavLinkClasses(pathname.includes("maps"))}
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault();
                      return;
                    }
                    setSidebarOpen(false);
                  }}
                  tabIndex={isLoading ? -1 : 0}
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
              {/* घरधुरी रिपोर्ट (Household Report) */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  activeReportType === "household"
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2] ${disabledClasses}`}
              >
                <NavLink
                  end
                  to="/DetailedReport/family-gender"
                  className={getNavLinkClasses(
                    activeReportType === "household"
                  )}
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault();
                      return;
                    }
                    setSidebarOpen(false);
                    setActiveReportType("household");
                  }}
                  tabIndex={isLoading ? -1 : 0}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        activeReportType === "household"
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
              {/* संस्थागत विवरण (Institutional Details/Statistics Report) */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
                  activeReportType === "institutional"
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } ${disabledClasses}`}
              >
                <NavLink
                  end
                  to="/statisticsreport" // Link to the main institutional report page
                  className={getNavLinkClasses(
                    activeReportType === "institutional"
                  )}
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault();
                      return;
                    }
                    setSidebarOpen(false);
                    setActiveReportType("institutional");
                  }}
                  tabIndex={isLoading ? -1 : 0}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        activeReportType === "institutional"
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
                      <polygon points="12 3 2 9 22 9 12 3" />
                      <line x1="4" y1="9" x2="4" y2="20" />
                      <line x1="10" y1="9" x2="10" y2="20" />
                      <line x1="14" y1="9" x2="14" y2="20" />
                      <line x1="20" y1="9" x2="20" y2="20" />
                      <line x1="2" y1="20" x2="22" y2="20" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      संस्थागत विवरण
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Conditional rendering for "संस्थागत रिपोर्ट" (Institutional Survey List) */}
          {activeReportType === "institutional" && (
            <div className="mt-8 pt-8 border-t border-white/[0.2]">
              <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
                संस्थागत रिपोर्ट
              </h3>
              <div className="mt-3">
                <ul className="mt-3">
                  {surveys.map(({ path, title, endpoint }, index) => (
                    <li
                      // Using path as key since it's unique per survey
                      key={path}
                      className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${disabledClasses}`}
                    >
                      <NavLink
                        to={`/Report${path}`}
                        className={({ isActive }) =>
                          getNavLinkClasses(isActive)
                        }
                        onClick={(e) => {
                          if (isLoading) {
                            e.preventDefault();
                            return;
                          }
                          setSidebarOpen(false);
                        }}
                        tabIndex={isLoading ? -1 : 0}
                      >
                        <div className="flex items-center">
                          {listIcon}
                          <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
                            {NEPAL_COLUMN_NAMES[endpoint] || title}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Conditional rendering for "घरधुरी रिपोर्टका लागि स्तम्भहरू" (Household Report Columns) */}
          {activeReportType === "household" && (
            <div className="mt-8 pt-8 border-t border-white/[0.2]">
              <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
                घरधुरी रिपोर्टका लागि स्तम्भहरू
              </h3>
              <div className="mt-3">
                <ul className="mt-3">
                  {Object.keys(COLUMN_TO_API_POSTFIX_MAP).map((reportKey) => {
                    // Removed 'index' as reportKey is a better key
                    const { api } = COLUMN_TO_API_POSTFIX_MAP[reportKey];

                    if (api.startsWith("/models/lg_hsurvey")) {
                      return (
                        <li
                          key={`household-col-${reportKey}`} // Use reportKey as unique key
                          className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
                            pathname === `/DetailedReport/${reportKey}`
                              ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                              : ""
                          } ${disabledClasses}`}
                        >
                          <NavLink
                            to={`/DetailedReport/${reportKey}`}
                            className={({ isActive }) =>
                              getNavLinkClasses(isActive)
                            }
                            onClick={(e) => {
                              if (isLoading) {
                                e.preventDefault();
                                return;
                              }
                              setSidebarOpen(false);
                            }}
                            tabIndex={isLoading ? -1 : 0}
                          >
                            <div className="flex items-center">
                              {listIcon}
                              <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
                                {NEPAL_COLUMN_NAMES[reportKey] || reportKey}
                              </span>
                            </div>
                          </NavLink>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* --- Map Layers Section (with accordion sub-sections) --- */}
          {pathname.includes("maps") && (
            <div className="mt-8 pt-8 border-t border-white/[0.2]">
              <h3 className="text-xs uppercase text-gray-100 font-semibold pl-3">
                <span className="opacity-100">नक्शा तहहरू</span>
              </h3>
              <ul className="mt-3">
                {Object.entries(layerCategories).map(([key, categoryData]) => (
                  <li key={key} className="mb-0.5 last:mb-0">
                    <div
                      className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-violet-500/[0.1] border-b border-white/[0.2] ${disabledClasses}`}
                      onClick={() => !isLoading && toggleAccordion(key)}
                      tabIndex={isLoading ? -1 : 0}
                    >
                      <span className="text-sm font-medium text-white">
                        {categoryData.title}
                      </span>
                      <svg
                        className={`w-3 h-3 fill-current text-gray-100 transform transition-transform duration-200 ${
                          openAccordions[key] ? "rotate-90" : ""
                        }`}
                        viewBox="0 0 12 12"
                      >
                        <path d="M5.999 11.143L0 5.143 1.429 3.714 5.999 8.286 10.57 3.714 12 5.143z" />
                      </svg>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openAccordions[key] ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      <ul className="pl-6 pt-2 pb-1">
                        {categoryData.layers.map((layer) => (
                          <li key={layer.id} className="mb-2 last:mb-0">
                            <label
                              className={`inline-flex items-center cursor-pointer text-sm text-gray-200 ${
                                isLoading ? "opacity-50" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={selectedLayers.includes(layer.id)}
                                onChange={() => toggleLayer(layer.id)}
                                disabled={isLoading}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportSidebar;
