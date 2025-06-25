import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ReportSidebar from "../partials/ReportSidebar";
import Header from "../partials/Header";
import MyDataComponent from "../components/MyDataComponent";

const reportConfig = {
  mothertongue: {
    endpoint: "hsurvey_mothertongue",
    title: "मातृभाषाको आधारमा वर्गिकरण",
  },
  religion: {
    endpoint: "hsurvey_religion",
    title: "धर्मको आधारमा वर्गिकरण",
  },
  caste: {
    endpoint: "hsurvey_caste",
    title: "जातिको आधारमा वर्गिकरण",
  },
  workdivision: {
    endpoint: "hsurvey_workdivision",
    title: "कामको विभाजनको आधारमा वर्गिकरण",
  },
  cookingfuel: {
    endpoint: "hsurvey_cookingfuel",
    title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
  },
  noncurable: {
    endpoint: "hsurvey_noncurable",
    title: "निको नहुने रोगको आधारमा वर्गिकरण",
  },
  "inv-source": {
    endpoint: "inv_source_report",
    title: "लगानीको स्रोतको रिपोर्ट",
  },
  housestatus: {
    endpoint: "hsurvey_housestatus",
    title: "घरको स्थितिको आधारमा वर्गिकरण",
  },
  "rent-details": {
    endpoint: "rent_details_report",
    title: "बहाल विवरण रिपोर्ट",
  },
  "loan-source": {
    endpoint: "loan_source_report",
    title: "ऋणको स्रोत रिपोर्ट",
  },
  "saving-source": {
    endpoint: "saving_source_report",
    title: "बचतको स्रोत रिपोर्ट",
  },
  incomeexpense: {
    endpoint: "hsurvey_incomeexpense",
    title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
  },
  foreign: {
    endpoint: "hsurvey_foreign",
    title: "विदेशीको आधारमा वर्गिकरण",
  },
  "service-details": {
    endpoint: "service_details_report",
    title: "सेवाको विवरण रिपोर्ट",
  },
  "death-count": {
    endpoint: "lg_hsurvey_death_count",
    title: "मृत्युको संख्याको आधारमा वर्गिकरण",
  },
  "land-details": {
    endpoint: "land_details_report",
    title: "जग्गाको विवरण रिपोर्ट",
  },
  "building-details": {
    endpoint: "buildingdetails_summary",
    title: "भवनको विवरण रिपोर्ट",
  },
  "disaster-details": {
    endpoint: "lg_hsurvey_disaster_details",
    title: "प्रकोपको विवरण रिपोर्ट",
  },
  electricitysource: {
    endpoint: "hsurvey_electricitysource",
    title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
  },
  toiletstatus: {
    endpoint: "hsurvey_toiletstatus",
    title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
  },
  watersource: {
    endpoint: "hsurvey_watersource",
    title: "पानीको स्रोतको आधारमा वर्गिकरण",
  },
  agegroup: {
    endpoint: "hsurvey_agegroup",
    title: "उमेर समूहको आधारमा वर्गिकरण",
  },
};

// Removed WelcomePage component since it will no longer be used directly.
// If you still need WelcomePage for other purposes, keep it, but it won't be rendered here.
// You might remove it if its only purpose was this default view.

// ReportView Component - MODIFIED
export default function ReportView() {
  const { path } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine the report to display
  let currentReport = null;
  if (path) {
    currentReport = reportConfig[path];
  } else {
    // If no path is provided, show the first report from reportConfig
    const firstReportKey = Object.keys(reportConfig)[0];
    currentReport = reportConfig[firstReportKey];
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ReportSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow flex flex-col">
          <div
            className={`flex-grow flex items-stretch justify-center px-4 sm:px-6 lg:px-8 py-4 bg-[#f5f6f8]`}
            // Removed conditional background as it will always be a report now
          >
            {/* Render MyDataComponent with the determined report */}
            {currentReport ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
                <MyDataComponent
                  urlPostfix={currentReport.endpoint}
                  title={currentReport.title}
                />
              </div>
            ) : (
              // Fallback if reportConfig is empty or something goes wrong
              <div className="text-center text-gray-600">
                रिपोर्ट उपलब्ध छैन। कृपया URL जाँच गर्नुहोस्।{" "}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
