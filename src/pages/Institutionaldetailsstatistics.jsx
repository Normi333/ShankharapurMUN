// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// import ReportSidebar from "../partials/ReportSidebar";
// import Header from "../partials/Header";
// import MyDataComponent from "../components/MyDataComponent";

// const reportConfig = {
//   mothertongue: {
//     endpoint: "hsurvey_mothertongue",
//     title: "मातृभाषाको आधारमा वर्गिकरण",
//   },
//   religion: {
//     endpoint: "hsurvey_religion",
//     title: "धर्मको आधारमा वर्गिकरण",
//   },
//   caste: {
//     endpoint: "hsurvey_caste",
//     title: "जातिको आधारमा वर्गिकरण",
//   },
//   workdivision: {
//     endpoint: "hsurvey_workdivision",
//     title: "कामको विभाजनको आधारमा वर्गिकरण",
//   },
//   cookingfuel: {
//     endpoint: "hsurvey_cookingfuel",
//     title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
//   },
//   noncurable: {
//     endpoint: "hsurvey_noncurable",
//     title: "निको नहुने रोगको आधारमा वर्गिकरण",
//   },
//   "inv-source": {
//     endpoint: "inv_source_report",
//     title: "लगानीको स्रोतको रिपोर्ट",
//   },
//   housestatus: {
//     endpoint: "hsurvey_housestatus",
//     title: "घरको स्थितिको आधारमा वर्गिकरण",
//   },
//   "rent-details": {
//     endpoint: "rentDetailsReport",
//     title: "बहाल विवरण रिपोर्ट",
//   },
//   "loan-source": {
//     endpoint: "loan_source_report",
//     title: "ऋणको स्रोत रिपोर्ट",
//   },
//   "saving-source": {
//     endpoint: "Saving_source_report",
//     title: "बचतको स्रोत रिपोर्ट",
//   },
//   incomeexpense: {
//     endpoint: "hsurvey_incomeexpense",
//     title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
//   },
//   foreign: {
//     endpoint: "hsurvey_foreign",
//     title: "विदेशीको आधारमा वर्गिकरण",
//   },
//   "service-details": {
//     endpoint: "Service_details_report",
//     title: "सेवाको विवरण रिपोर्ट",
//   },
//   "death-count": {
//     endpoint: "lg_hsurvey_death_count",
//     title: "मृत्युको संख्याको आधारमा वर्गिकरण",
//   },
//   "land-details": {
//     endpoint: "Land_details_report",
//     title: "जग्गाको विवरण रिपोर्ट",
//   },
//   "building-details": {
//     endpoint: "BuildingDetailsReport",
//     title: "भवनको विवरण रिपोर्ट",
//   },
//   "disaster-details": {
//     endpoint: "lg_hsurvey_disaster_details",
//     title: "प्रकोपको विवरण रिपोर्ट",
//   },
//   lsdetails: {
//     endpoint: "hsurvey_lsdetails",
//     title: "लघु उद्योगको विवरण",
//   },
//   electricitysource: {
//     endpoint: "hsurvey_electricitysource",
//     title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
//   },
//   toiletstatus: {
//     endpoint: "hsurvey_toiletstatus",
//     title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
//   },
//   watersource: {
//     endpoint: "hsurvey_watersource",
//     title: "पानीको स्रोतको आधारमा वर्गिकरण",
//   },
//   agegroup: {
//     endpoint: "hsurvey_agegroup",
//     title: "उमेर समूहको आधारमा वर्गिकरण",
//   },
// };

// // WelcomePage Component (no changes needed here, as it's designed to fit its container)
// function WelcomePage() {
//   const [isOpen, setIsOpen] = useState(true); // Changed initial state to true to show content by default

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-full text-center">
//       {/* Accordion Header (clickable area) */}
//       <button
//         onClick={toggleAccordion}
//         className="w-full text-left px-4 py-3 rounded-lg focus:outline-none flex justify-between items-center"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(0, 56, 147, 0.9), rgba(220, 20, 60, 0.9))",
//           transition: "background 0.3s ease",
//         }}
//       >
//         {/* Text color for button is set here to ensure it's white over the gradient */}
//         <h1 className="text-4xl sm:text-5xl font-bold text-white">
//           सर्वेक्षण ड्यासबोर्ड
//         </h1>
//         {/* Simple arrow indicator for accordion state, also white */}
//         <span
//           className={`text-3xl text-white transform transition-transform duration-300 ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           &#9660; {/* Down arrow character */}
//         </span>
//       </button>

//       {/* Accordion Content (conditionally rendered) */}
//       {isOpen && (
//         <div className="w-full bg-[#f5f6f8] text-gray-800 rounded-b-lg p-6 shadow-md transition-all duration-500 ease-in-out">
//           {/* Changed bg-white to bg-[#f5f6f8] */}
//           <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed mb-6">
//             बायाँतर्फको साइडबारबाट कुनै पनि सर्वेक्षण रिपोर्ट छान्नुहोस् र
//             तपाईंको डाटा सजिलै हेर्नुहोस्।
//           </p>
//           <ol
//             className="list-decimal list-inside mx-auto text-left"
//             style={{
//               listStylePosition: "inside",
//               maxWidth: "500px",
//             }}
//           >
//             {Object.values(reportConfig).map((reportItem, index) => (
//               <li key={index}>{reportItem.title}</li>
//             ))}
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// }

// // ReportView Component - MODIFIED
// export default function ReportView() {
//   const { path } = useParams();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const report = path ? reportConfig[path] : null;

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <ReportSidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Main content - now explicitly filling available space */}
//         <main className="grow flex flex-col">
//           {/* This div now acts as the full-height, full-width content pane below the header */}
//           <div
//             className={`flex-grow flex items-stretch justify-center px-4 sm:px-6 lg:px-8 py-4 ${
//               !report ? "bg-[#f5f6f8]" : "" // Apply bg-[#f5f6f8] only when no report is selected
//             }`}
//             // Removed inline style for background and border-radius completely
//           >
//             {report ? (
//               <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
//                 <MyDataComponent
//                   urlPostfix={report.endpoint}
//                   title={report.title}
//                 />
//               </div>
//             ) : (
//               // This wrapper now explicitly takes full width of its parent and a max-width
//               // and the accordion itself will stretch vertically within it if its content is enough
//               <div className="w-full max-w-lg mx-auto self-center">
//                 {/* self-center ensures it stays horizontally centered in its flex parent */}
//                 <WelcomePage />
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

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
    endpoint: "rentDetailsReport",
    title: "बहाल विवरण रिपोर्ट",
  },
  "loan-source": {
    endpoint: "loan_source_report",
    title: "ऋणको स्रोत रिपोर्ट",
  },
  "saving-source": {
    endpoint: "Saving_source_report",
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
    endpoint: "Service_details_report",
    title: "सेवाको विवरण रिपोर्ट",
  },
  "death-count": {
    endpoint: "lg_hsurvey_death_count",
    title: "मृत्युको संख्याको आधारमा वर्गिकरण",
  },
  "land-details": {
    endpoint: "Land_details_report",
    title: "जग्गाको विवरण रिपोर्ट",
  },
  "building-details": {
    endpoint: "BuildingDetailsReport",
    title: "भवनको विवरण रिपोर्ट",
  },
  "disaster-details": {
    endpoint: "lg_hsurvey_disaster_details",
    title: "प्रकोपको विवरण रिपोर्ट",
  },
  lsdetails: {
    endpoint: "hsurvey_lsdetails",
    title: "लघु उद्योगको विवरण",
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
                No report data available.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
