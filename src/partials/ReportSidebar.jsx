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
      endpoint: "rentDetailsReport",
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
            {/* <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3> */}
            <ul>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname === "/" &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname === "/"
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/"
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

          {/* Survey Reports List */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-3">
              घरधुरी रिपोर्ट
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
                      {/* <span className="text-xs text-gray-400">{endpoint}</span> */}
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
