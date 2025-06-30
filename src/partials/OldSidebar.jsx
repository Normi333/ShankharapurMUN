// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../images/NepalGovernment.png";
// import SidebarLinkGroup from "./SidebarLinkGroup"; // Assuming this component is used elsewhere if not directly in this snippet

// function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

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
//   }, [sidebarOpen]);

//   // close if the esc key is pressed (only for mobile overlay sidebar)
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [sidebarOpen]);

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
//         className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out ${
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
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
//                   // Added border-b
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
//                         pathname === "/" ? "text-violet-200" : "text-gray-300"
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
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
//                   // Added border-b
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
//                           : "text-gray-300"
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
//                 className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
//                   // Added border-b
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
//               {/* संस्थागत विवरण - This is the last item, so no border-b on it */}
//               <li
//                 className={`pl-4 pr-3 pt-2 pb-2 rounded-lg mb-0.5 last:mb-0 ${
//                   // Removed border-b here
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
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/NepalGovernment.png";
// import SidebarLinkGroup from "./SidebarLinkGroup"; // Assuming this component is used elsewhere if not directly in this snippet

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null); // Ref for the mobile close button (hamburger inside sidebar)
  const sidebar = useRef(null); // Ref for the sidebar main container

  // close on click outside (only for mobile overlay sidebar)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      // If sidebar is not rendered or trigger/sidebar refs are not set, return
      if (!sidebar.current || !trigger.current) return;
      // If sidebar is not open, or click is inside sidebar, or click is inside trigger button, do nothing
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false); // Close sidebar if click is outside
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]); // Add setSidebarOpen to dependencies

  // close if the esc key is pressed (only for mobile overlay sidebar)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]); // Add setSidebarOpen to dependencies

  // NEW: Close sidebar on desktop screen size change
  // This prevents the sidebar from being in a "mobile open" state when resized to desktop,
  // which could cause layout issues or unexpected behavior.
  useEffect(() => {
    const handleResize = () => {
      // Check if window width is at or above the 'lg' breakpoint (default 1024px)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // Force close the sidebar's mobile state
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]); // Depend on setSidebarOpen to ensure handler is correct

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)} // NEW: Close sidebar when backdrop is clicked
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar} // Attach ref to the sidebar div
        className={`flex flex-col absolute z-50 left-0 top-0 // Changed z-index to z-50 for higher stacking context on mobile
          lg:static lg:left-auto lg:top-auto lg:translate-x-0 // Desktop: Static positioning, no transform, always visible
          h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar // Full height, scrollable content
          w-64 shrink-0 bg-[#3D6CB3] p-4 transition-all duration-200 ease-in-out // Fixed width, background, padding, animation
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } // Mobile: Slide in/out based on state
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
            ref={trigger} // Attach ref to the trigger button
            className="lg:hidden text-gray-300 hover:text-gray-100"
            onClick={() => setSidebarOpen(false)} // NEW: Set to false directly, not toggle
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
        <div className="space-y-1">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
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
                  onClick={() => setSidebarOpen(false)} // NEW: Close sidebar on link click
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/" ? "text-violet-200" : "text-gray-300"
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
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
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
                  onClick={() => setSidebarOpen(false)} // NEW: Close sidebar on link click
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("maps")
                          ? "text-violet-200"
                          : "text-gray-300"
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
                className={`pl-4 pr-3 pt-2 pb-3 rounded-lg mb-0.5 last:mb-0 border-b border-white/[0.2] ${
                  pathname.includes("householdreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/DetailedReport"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("householdreport")
                      ? ""
                      : "hover:text-gray-200"
                  }`}
                  onClick={() => setSidebarOpen(false)} // NEW: Close sidebar on link click
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
              {/* संस्थागत विवरण - This is the last item, so no border-b on it */}
              <li
                className={`pl-4 pr-3 pt-2 pb-2 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("statisticsreport")
                    ? "bg-gradient-to-r from-violet-500/[0.2] to-transparent"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/DetailedReport"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("statisticsreport")
                      ? ""
                      : "hover:text-gray-200"
                  }`}
                  onClick={() => setSidebarOpen(false)} // NEW: Close sidebar on link click
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
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
