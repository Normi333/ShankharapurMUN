// import React, { useState } from "react";
// import Header from "../partials/Header";
// import Sidebar from "../partials/Sidebar";
// import ChartGrid from "../components/Info";

// const ChartReportPage = () => {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />
//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <Header />
//         <div className="p-3 flex-grow overflow-auto">
//           <ChartGrid />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartReportPage;

import React, { useState } from "react";
import Header from "../partials/Header";
import ReportSidebar from "../partials/Sidebar";
import ChartGrid from "../components/Info"; // Assuming this is your ChartGrid component

const ChartReportPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/* The Sidebar component itself will handle its responsive visibility and positioning */}
      <ReportSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      {/* On large screens (lg:), add a left margin to push content when sidebar is static */}
      <div
        className={`relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow flex flex-col">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            {/* Overlay for mobile when sidebar is open */}
            {/* This overlay should only be active on screens smaller than 'lg' */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)} // Close sidebar when clicking overlay
                aria-hidden="true"
              ></div>
            )}
            <ChartGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartReportPage;
