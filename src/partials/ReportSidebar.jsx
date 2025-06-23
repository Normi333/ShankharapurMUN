import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";

function ReportSidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside (only for mobile overlay sidebar)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      // Only close if sidebar is open AND click is outside both sidebar and trigger
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
  }, [sidebarOpen]); // Dependency added for sidebarOpen for cleaner effect lifecycle

  // close if the esc key is pressed (only for mobile overlay sidebar)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]); // Dependency added for sidebarOpen

  // Your surveys array (remains unchanged)
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
      title: "भवनको विवरण रिपोर्ट",
      endpoint: "building_details_report",
    },
    {
      path: "/disaster-details",
      title: "प्रकोपको विवरण रिपोर्ट",
      endpoint: "lg_hsurvey_disaster_details",
    },
    // {
    //   path: "/lsdetails",
    //   title: "लघु उद्योगको विवरण",
    //   endpoint: "hsurvey_lsdetails",
    // },
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
      className="w-5 h-5 mt-1 text-gray-100" // Changed text-gray-300 to text-gray-100 for better visibility
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );

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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "shadow-xs"
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
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
          <NavLink end to="/" className="block">
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
                } border-b border-white/[0.2]`}
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
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  pathname.includes("map")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
              >
                <NavLink
                  end
                  to="/maps"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("map") ? "" : "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("map")
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
              <li
                className={`pl-4 pr-3 py-2 rounded-lg ${
                  pathname.includes("householdreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                } border-b border-white/[0.2]`}
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
                          : "text-gray-100"
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
              {/* Removed 'border-b border-white/[0.2]' from this li to remove the line below it */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg last:mb-0 ${
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
                          : "text-gray-100"
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

          {/* Survey Reports List */}
          <div className="mt-8 pt-8 border-t border-white/[0.2]">
            <h3 className="text-xs uppercase text-gray-300 font-semibold pl-3 mb-3">
              घरधुरी रिपोर्ट
            </h3>
            <div className="mt-3">
              <ul className="mt-3">
                {surveys.map(({ path, title, endpoint }, index) => (
                  <li
                    key={index}
                    className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2]`}
                  >
                    <NavLink
                      to={`/ReportView${path}`}
                      className={({ isActive }) =>
                        `block text-white transition duration-150 ${
                          isActive
                            ? "bg-violet-500/[0.2] text-white font-bold"
                            : "hover:text-gray-200"
                        }`
                      }
                    >
                      <div className="flex items-center">
                        {listIcon}
                        <span className="text-sm font-bold ml-4 opacity-100 break-words whitespace-normal">
                          {title}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportSidebar;
