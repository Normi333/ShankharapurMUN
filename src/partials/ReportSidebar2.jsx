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
    // {
    //   path: "/agriculturehumanres",
    //   title: "कृषि तथा पशु सेवासँग सम्बन्धित मानव संसाधन (संख्या)",
    //   endpoint: "ag_details",
    // },
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
    // {
    //   path: "/housingdevelopment",
    //   title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
    //   endpoint: "housing_poor_details",
    // },
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
      title: "पालिकाको आय विवरण ",
      endpoint: "income_details",
    },
    {
      path: "/monumentdetails",
      title: "पानीमुहान, जमीन र भौतिक संरचना क्षेत्र विवरण",
      endpoint: "pa_details",
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
                      to={`/Report${path}`}
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
