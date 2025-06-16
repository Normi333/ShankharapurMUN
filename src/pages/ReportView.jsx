import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const dummyContent = {
  "report-1": "This is the content of Report 1.",
  "report-2": "This is the content of Report 2.",
  "report-3": "This is the content of Report 3.",
};

export default function ReportView() {
  const { reportId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Report: {reportId}
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                {dummyContent[reportId] || "Report not found."}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
