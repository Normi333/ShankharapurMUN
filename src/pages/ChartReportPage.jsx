import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar"; // Assuming this is your sidebar
import ChartGrid from "../charts/ChartGrid"; // Your default content component
import ReportDisplay from "../partials/ReportDisplay"; // Import the component that displays HTML reports

const ChartReportPage = () => {
  // State to hold the URL of the selected report
  // Initialize as null or an empty string, meaning no report is selected by default.
  const [selectedReportUrl, setSelectedReportUrl] = useState(null);

  // This function will be passed down to the Header, and then to DropdownReports.
  // It receives the URL of the report that was clicked in the dropdown.
  const handleReportSelection = (reportUrl) => {
    setSelectedReportUrl(reportUrl);
    // You can add console.log here for debugging if needed:
    // console.log("Report selected and URL set:", reportUrl);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ReportSidebar (your existing sidebar) */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header - Pass the handleReportSelection function as onSelectReport prop */}
        <Header
          className="z-[1001]"
          // sidebarOpen and setSidebarOpen props from your original Header setup
          // Make sure to pass these if Header relies on them for hamburger menu, etc.
          // For now, I'm assuming Header has direct access or manages its own sidebar state,
          // so I'm not explicitly passing sidebarOpen/setSidebarOpen here, but you should
          // if your Header component needs them from this parent.
          onSelectReport={handleReportSelection} // <-- IMPORTANT: Pass the callback here
        />

        <main className="flex-grow">
          {" "}
          {/* Use main tag for primary content */}
          <div className="flex h-full box-border">
            <div className="p-3 flex-grow overflow-auto">
              {" "}
              {/* Add overflow-auto here if content is large */}
              {/* Conditional rendering based on selectedReportUrl */}
              {selectedReportUrl ? (
                // If a report URL is selected, render the ReportDisplay component
                <ReportDisplay reportUrl={selectedReportUrl} />
              ) : (
                // Otherwise, render the default ChartGrid component
                <ChartGrid />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartReportPage;
