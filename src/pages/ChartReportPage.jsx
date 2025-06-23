import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import ChartGrid from "../components/Info";

const ChartReportPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="p-3 flex-grow overflow-auto">
          <ChartGrid />
        </div>
      </div>
    </div>
  );
};

export default ChartReportPage;
