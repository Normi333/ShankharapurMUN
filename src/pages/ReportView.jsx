import React, { useState } from "react";
import { useParams } from "react-router-dom";

// import Sidebar from "../partials/Sidebar";
import ReportSidebar from "../partials/ReportSidebar";
import Header from "../partials/Header";

// Welcome page component with Tailwind CSS
function WelcomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-900 text-white text-center rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-6">सर्वेक्षण ड्यासबोर्ड</h1>
      <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
        बायाँ तर्फको साइडबारबाट कुनै पनि सर्वेक्षण रिपोर्ट छान्नुहोस् र तपाईंको
        डाटा हेर्नुहोस्।
      </p>
    </div>
  );
}

export default function ReportView() {
  const { reportId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {reportId ? (
                <div className="text-center text-gray-700 font-[Kalimati]">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Report: {reportId}
                  </h1>
                  <p className="text-base">
                    रिपोर्ट विवरण यहाँ प्रदर्शित हुनेछ।
                  </p>
                </div>
              ) : (
                <WelcomePage />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
