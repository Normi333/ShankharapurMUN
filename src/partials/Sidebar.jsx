// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/NepalGovernment.png";

// function ReportSidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   // close on click outside (only for mobile overlay sidebar)
//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!sidebar.current || !trigger.current) return;
//       // Only close if sidebar is open AND click is outside both sidebar and trigger
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
//   }, [sidebarOpen]); // Dependency added for sidebarOpen for cleaner effect lifecycle

//   // close if the esc key is pressed (only for mobile overlay sidebar)
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen]); // Dependency added for sidebarOpen

//   // Your surveys array (remains unchanged)
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
//       path: "/fueltype",
//       title: "चुल्होको प्रकारको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_cookingfueltype",
//     },
//     {
//       path: "/noncurable",
//       title: "निको नहुने रोगको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_noncurable",
//     },
//     {
//       path: "/inv-source",
//       title: "लगानीको स्रोतको रिपोर्ट",
//       endpoint: "inv_source_report",
//     },
//     {
//       path: "/housestatus",
//       title: "घरको स्थितिको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_housestatus",
//     },
//     {
//       path: "/rent-details",
//       title: "बहाल विवरण रिपोर्ट",
//       endpoint: "rent_details_report",
//     },
//     {
//       path: "/loan-source",
//       title: "ऋणको स्रोत रिपोर्ट",
//       endpoint: "loan_source_report",
//     },
//     {
//       path: "/saving-source",
//       title: "बचतको स्रोत रिपोर्ट",
//       endpoint: "saving_source_report",
//     },
//     {
//       path: "/incomeexpense",
//       title: "आम्दानीको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_incomeexpense",
//     },
//     {
//       path: "/spendexpense",
//       title: "खर्चको आधारमा वर्गिकरण",
//       endpoint: "lg_hsurvey_expense_source",
//     },
//     {
//       path: "/foreign",
//       title: "विदेशीको आधारमा वर्गिकरण",
//       endpoint: "hsurvey_foreign",
//     },
//     {
//       path: "/service-details",
//       title: "सेवाको विवरण रिपोर्ट",
//       endpoint: "service_details_report",
//     },
//     {
//       path: "/death-count",
//       title: "मृत्युको संख्याको आधारमा वर्गिकरण",
//       endpoint: "lg_hsurvey_death_count",
//     },
//     {
//       path: "/land-details",
//       title: "जग्गाको विवरण रिपोर्ट",
//       endpoint: "land_details_report",
//     },
//     {
//       path: "/building-details",
//       title: "भवनको सारांश विवरण रिपोर्ट",
//       endpoint: "buildingdetails_summary",
//     },
//     {
//       path: "/building-report",
//       title: "घरको बनावटको विवरण",
//       endpoint: "building_details_report",
//     },
//     {
//       path: "/disaster-details",
//       title: "प्रकोपको विवरण रिपोर्ट",
//       endpoint: "lg_hsurvey_disaster_details",
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
//     {
//       path: "/animalreport",
//       title: "पशुपंशी तथ्यांक संकलन रिपोर्ट",
//       endpoint: "hsurvey_lsdetails",
//     },
//   ];

//   // SVG icon reused in list
//   const listIcon = (
//     <svg
//       className="w-5 h-5 mt-1 text-gray-100" // Changed text-gray-300 to text-gray-100 for better visibility
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
//                   pathname.includes("map")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
//               >
//                 <NavLink
//                   end
//                   to="/maps"
//                   className={`block text-white truncate transition duration-150 ${
//                     pathname.includes("map") ? "" : "hover:text-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       className={`shrink-0 fill-current ${
//                         pathname.includes("map")
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
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg ${
//                   pathname.includes("householdreport")
//                     ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
//                     : ""
//                 } border-b border-white/[0.2]`}
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
//               {/* Removed 'border-b border-white/[0.2]' from this li to remove the line below it */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg last:mb-0 ${
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

//           {/* Survey Reports List */}
//           <div className="mt-8 pt-8 border-t border-white/[0.2]">
//             <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
//               घरधुरी रिपोर्ट
//             </h3>
//             <div className="mt-3">
//               <ul className="mt-3">
//                 {surveys.map(({ path, title, endpoint }, index) => (
//                   <li
//                     key={index}
//                     className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
//                   >
//                     <NavLink
//                       to={`/ReportView${path}`}
//                       className={({ isActive }) =>
//                         `block text-white transition duration-150 ${
//                           isActive
//                             ? "bg-violet-500/[0.2] text-white font-bold"
//                             : "hover:text-gray-200"
//                         }`
//                       }
//                     >
//                       <div className="flex items-center">
//                         {listIcon}
//                         <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
//                           {title}
//                         </span>
//                       </div>
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReportSidebar;

// Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png"; // Adjust path if necessary

// Define different sets of survey links
const surveyData = {
  householdReports: {
    title: "घरधुरी रिपोर्ट",
    prefix: "/ReportView",
    links: [
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
        path: "/fueltype",
        title: "चुल्होको प्रकारको आधारमा वर्गिकरण",
        endpoint: "hsurvey_cookingfueltype",
      },
      {
        path: "/noncurable",
        title: "निको नहुने रोगको आधारमा वर्गिकरण",
        endpoint: "hsurvey_noncurable",
      },
      {
        path: "/inv-source",
        title: "लगानीको स्रोतको रिपोर्ट",
        endpoint: "inv_source_report",
      },
      {
        path: "/housestatus",
        title: "घरको स्थितिको आधारमा वर्गिकरण",
        endpoint: "hsurvey_housestatus",
      },
      {
        path: "/rent-details",
        title: "बहाल विवरण रिपोर्ट",
        endpoint: "rent_details_report",
      },
      {
        path: "/loan-source",
        title: "ऋणको स्रोत रिपोर्ट",
        endpoint: "loan_source_report",
      },
      {
        path: "/saving-source",
        title: "बचतको स्रोत रिपोर्ट",
        endpoint: "saving_source_report",
      },
      {
        path: "/incomeexpense",
        title: "आम्दानीको आधारमा वर्गिकरण",
        endpoint: "hsurvey_incomeexpense",
      },
      {
        path: "/spendexpense",
        title: "खर्चको आधारमा वर्गिकरण",
        endpoint: "lg_hsurvey_expense_source",
      },
      {
        path: "/foreign",
        title: "विदेशीको आधारमा वर्गिकरण",
        endpoint: "hsurvey_foreign",
      },
      {
        path: "/service-details",
        title: "सेवाको विवरण रिपोर्ट",
        endpoint: "service_details_report",
      },
      {
        path: "/death-count",
        title: "मृत्युको संख्याको आधारमा वर्गिकरण",
        endpoint: "lg_hsurvey_death_count",
      },
      {
        path: "/land-details",
        title: "जग्गाको विवरण रिपोर्ट",
        endpoint: "land_details_report",
      },
      {
        path: "/building-details",
        title: "भवनको सारांश विवरण रिपोर्ट",
        endpoint: "buildingdetails_summary",
      },
      {
        path: "/building-report",
        title: "घरको बनावटको विवरण",
        endpoint: "building_details_report",
      },
      {
        path: "/disaster-details",
        title: "प्रकोपको विवरण रिपोर्ट",
        endpoint: "lg_hsurvey_disaster_details",
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
      {
        path: "/animalreport",
        title: "पशुपंशी तथ्यांक संकलन रिपोर्ट",
        endpoint: "hsurvey_lsdetails",
      },
    ],
  },
  institutionalReports: {
    title: "संस्थागत रिपोर्ट",
    prefix: "/Report",
    links: [
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
        title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्धी विवरण",
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
      {
        path: "/investment",
        title: "लगानी विवरण",
        endpoint: "invest_details",
      },
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
      {
        path: "/forest",
        title: "वनको विवरण",
        endpoint: "forest_detail",
      },
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
    ],
  },
};

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = "default", // Keep this for potential future styling variations
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // State to manage the visibility of household and institutional report lists
  const [showHouseholdReports, setShowHouseholdReports] = useState(false);
  const [showInstitutionalReports, setShowInstitutionalReports] =
    useState(false);

  // Close on click outside (only for mobile overlay sidebar)
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
  }, [sidebarOpen, setSidebarOpen]); // Add setSidebarOpen to dependencies

  // Close if the esc key is pressed (only for mobile overlay sidebar)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]); // Add setSidebarOpen to dependencies

  // NEW: Close sidebar on desktop screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // 'lg' breakpoint
        setSidebarOpen(false); // Force close the sidebar's mobile state
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]); // Depend on setSidebarOpen to ensure handler is correct

  // Effect to automatically open the relevant report section if a link inside it is active
  useEffect(() => {
    if (pathname.includes(surveyData.householdReports.prefix)) {
      setShowHouseholdReports(true);
    } else {
      setShowHouseholdReports(false); // Close if navigating away
    }
    if (
      pathname.includes(surveyData.institutionalReports.prefix) &&
      !pathname.includes(surveyData.householdReports.prefix) // Ensure it's not a household report link
    ) {
      setShowInstitutionalReports(true);
    } else {
      setShowInstitutionalReports(false); // Close if navigating away
    }
  }, [pathname]);

  // SVG icon reused in list (e.g., for sub-items)
  const listIcon = (
    <svg
      className="w-5 h-5 mt-1 text-gray-100" // text-gray-100 will become white due to parent NavLink
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" // Ensures fill takes parent's color
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );

  // Chevron icon for toggling
  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`shrink-0 ml-2 w-3 h-3 transition-transform duration-200 ${
        isOpen ? "rotate-90" : "rotate-0"
      }`}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" // Ensures fill takes parent's color (text-white from parent li)
    >
      <path d="M7.785 15.698L.15 8.062 7.785.427 8.5.88l-6.993 6.992.88.88z" />
    </svg>
  );

  return (
    <div className="min-w-fit relative">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)} // Close sidebar when backdrop is clicked
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-50 left-0 top-0 
          lg:static lg:left-auto lg:top-auto lg:translate-x-0 
          h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar 
          w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          ${
            variant === "v2"
              ? "border-r border-gray-200 dark:border-gray-700/60"
              : "shadow-xs"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button (mobile only) - Hamburger icon inside sidebar */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-300 hover:text-gray-100"
            onClick={() => setSidebarOpen(false)} // Set to false directly, not toggle
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            aria-label="Close sidebar"
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
        <div className="space-y-8">
          {" "}
          {/* Keeping space-y-8 for sections */}
          {/* Main Navigation Links */}
          <div>
            <ul className="space-y-0.5">
              {/* Dashboard */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  pathname === "/"
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-white truncate transition duration-150 ${
                    pathname === "/" ? "" : "hover:text-gray-200"
                  }`}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on link click
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
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  // Changed pt-2 pb-3 to py-2 for consistency
                  pathname.includes("maps")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("maps") ? "" : "hover:text-gray-200"
                  }`}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on link click
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("maps")
                          ? "text-violet-200"
                          : "text-gray-100" // Changed text-gray-300 to text-gray-100 for consistency
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

              {/* Household Report Toggle Button */}
              {/* This replaces the direct "घरधुरी रिपोर्ट" NavLink */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg cursor-pointer text-white ${
                  showHouseholdReports
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
                onClick={() => setShowHouseholdReports(!showHouseholdReports)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        showHouseholdReports
                          ? "text-violet-200"
                          : "text-gray-100" // Changed text-gray-300 to text-gray-100
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
                      {surveyData.householdReports.title}
                    </span>
                  </div>
                  <ChevronIcon isOpen={showHouseholdReports} />
                </div>
              </li>
              {/* Household Reports List - Dynamically rendered based on toggle state */}
              {showHouseholdReports && (
                <div className="mt-3">
                  <ul className="mt-3">
                    {surveyData.householdReports.links.map(
                      ({ path, title }, index) => (
                        <li
                          key={`household-${index}`} // Unique key
                          className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
                        >
                          <NavLink
                            to={`${surveyData.householdReports.prefix}${path}`}
                            className={({ isActive }) =>
                              `block text-white transition duration-150 ${
                                isActive
                                  ? "bg-violet-500/[0.2] text-white font-bold"
                                  : "hover:text-gray-200"
                              }`
                            }
                            onClick={() => setSidebarOpen(false)} // Close sidebar on link click (useful for mobile)
                          >
                            <div className="flex items-center">
                              {listIcon}
                              <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
                                {title}
                              </span>
                            </div>
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Institutional Report Toggle Button */}
              {/* This replaces the direct "संस्थागत विवरण" NavLink */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg cursor-pointer text-white ${
                  showInstitutionalReports
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
                onClick={() =>
                  setShowInstitutionalReports(!showInstitutionalReports)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-none stroke-current ${
                        showInstitutionalReports
                          ? "text-violet-200"
                          : "text-gray-100" // Changed text-gray-300 to text-gray-100
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
                      {/* SVG for Institutional Report */}
                      <polygon points="12 3 2 9 22 9 12 3" />
                      <line x1="4" y1="9" x2="4" y2="20" />
                      <line x1="10" y1="9" x2="10" y2="20" />
                      <line x1="14" y1="9" x2="14" y2="20" />
                      <line x1="20" y1="9" x2="20" y2="20" />
                      <line x1="2" y1="20" x2="22" y2="20" />
                    </svg>
                    <span className="text-sm font-bold ml-4 opacity-100">
                      {surveyData.institutionalReports.title}
                    </span>
                  </div>
                  <ChevronIcon isOpen={showInstitutionalReports} />
                </div>
              </li>
              {/* Institutional Reports List - Dynamically rendered based on toggle state */}
              {showInstitutionalReports && (
                <div className="mt-3">
                  <ul className="mt-3">
                    {surveyData.institutionalReports.links.map(
                      ({ path, title }, index) => (
                        <li
                          key={`institutional-${index}`} // Unique key
                          className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
                        >
                          <NavLink
                            to={`${surveyData.institutionalReports.prefix}${path}`}
                            className={({ isActive }) =>
                              `block text-white transition duration-150 ${
                                isActive
                                  ? "bg-violet-500/[0.2] text-white font-bold"
                                  : "hover:text-gray-200"
                              }`
                            }
                            onClick={() => setSidebarOpen(false)} // Close sidebar on link click (useful for mobile)
                          >
                            <div className="flex items-center">
                              {listIcon}
                              <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
                                {title}
                              </span>
                            </div>
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
