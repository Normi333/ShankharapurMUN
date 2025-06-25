// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// import ReportSidebar2 from "../partials/ReportSidebar2";
// import Header from "../partials/Header";
// import MyDataComponent from "../components/InstitutionalComponent";

// const reportConfig = {
//   communityorg: {
//     endpoint: "co_org_details",
//     title: "सामुदायिक संस्था विवरण",
//   },
//   individualevent: {
//     endpoint: "lg_osurvey",
//     title: "व्यक्तिगत घटना विवरण",
//   },
//   socialsecurity: {
//     endpoint: "sst_details",
//     title: "सामाजिक सुरक्षा कार्यक्रम विवरण",
//   },
//   publicpond: {
//     endpoint: "pond_details",
//     title: "सार्वजनिक पोखरी तथा माछापालन",
//   },
//   irrigationsystem: {
//     endpoint: "irrigation_details",
//     title: "सिंचाई सुविधाको उपलब्धता विवरण",
//   },
//   modernanimalhusbandry: {
//     endpoint: "ahs_firms",
//     title: "आधुनिक पशुपालन (फार्म) सम्बन्धी विवरण",
//   },
//   agriculturehumanres: {
//     endpoint: "ag_details",
//     title: "कृषि तथा पशु सेवासंग सम्बन्धित मानव संसाधन (संख्या) विवरण",
//   },
//   agriculturecommunityorg: {
//     endpoint: "ag_org_details",
//     title: "कृषि तथा पशु सेवासंग सम्बन्धित सामुदायिक संस्था तथा समूह",
//   },
//   milldetails: {
//     endpoint: "mill_details",
//     title: "घट्ट, मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण",
//   },
//   landuse: {
//     endpoint: "landuser_details",
//     title: "भू-उपयोगको अवस्था विवरण",
//   },
//   festival: {
//     endpoint: "festival_details",
//     title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्धी विवरण",
//   },
//   // mg_details: { // No specific title provided for "mg_details"
//   //   endpoint: "mg_details",
//   //   title: "Placeholder Title for mg_details",
//   // },
//   bankfinancial: {
//     endpoint: "bank_details",
//     title: "बैंक, वित्तीय संस्था, लघुवित्त तथा सहकारी संस्था विवरण",
//   },
//   farmergroup: {
//     endpoint: "fgroup_details",
//     title: "कृषक तथा उद्यमी तथा बचत समूहको विवरण",
//   },
//   citizenawareness: {
//     endpoint: "ac_td_details",
//     title: "नागरिक सचेतना केन्द्र र टोल विकास संस्थाको विवरण",
//   },
//   hoteldetails: {
//     endpoint: "hotel_details",
//     title: "होटेल, लज, रेष्टुरेण्ट, होमस्टेको विवरण",
//   },
//   naturalresourcemap: {
//     endpoint: "nr_map_details",
//     title: "प्राकृतिक स्रोत साधनको नक्शांकन",
//   },
//   investment: {
//     endpoint: "invest_details",
//     title: "लगानी विवरण",
//   },
//   energyaccess: {
//     endpoint: "energy_details",
//     title: "उर्जाको किसिम तथा नागरिकको पहुँच",
//   },
//   irrigationstatus: {
//     endpoint: "irr_type_details",
//     title: "सिंचाईको अवस्था सम्बन्धी विवरण",
//   },
//   housingdevelopment: {
//     endpoint: "housing_poor_details",
//     title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
//   },
//   forestenvironment: {
//     endpoint: "fe_details",
//     title: "वन तथा वातावरण सम्बन्धी विवरण",
//   },
//   forestindicator: {
//     endpoint: "f_indicator_details",
//     title: "वन तथा वातावरण सम्बन्banddhi सूचक विवरण",
//   },
//   forestbiodiversity: {
//     endpoint: "fbd_details",
//     title: "वन तथा जैविक विविधता सूचक",
//   },
//   communityforest: {
//     endpoint: "cf_details",
//     title: "सामुदायिक वनहरुको विवरण",
//   },
//   forest: {
//     endpoint: "forest_details",
//     title: "वनको विवरण",
//   },
//   landwatershed: {
//     endpoint: "landwatershed_details",
//     title: "भूमि तथा जलाधार व्यवस्थापन विवरण",
//   },
//   environmenthygiene: {
//     endpoint: "eh_details",
//     title: "वातावरण तथा स्वच्छता विवरण",
//   },
//   airpollution: {
//     endpoint: "air_pollution_details",
//     title: "वायु प्रदुषणका श्रोतहरु",
//   },
//   disastermanagement: {
//     endpoint: "disaster_details_management",
//     title: "प्रकोप व्यवस्थापन सम्बन्धी विवरण",
//   },
//   // gs_details: { // No specific title provided for "gs_details"
//   //   endpoint: "gs_details",
//   //   title: "Placeholder Title for gs_details",
//   // },
//   governance: {
//     endpoint: "governance_details",
//     title: "सुशासन (सेवा प्रवाहबाट सन्तुष्टी)",
//   },
//   // hn_details: { // No specific title provided for "hn_details"
//   //   endpoint: "hn_details",
//   //   title: "Placeholder Title for hn_details",
//   // },
//   disease: {
//     endpoint: "disease_details",
//     title: "प्रमुख रोग तथा उपचारसम्बन्धी विवरण",
//   },
//   majorprojects: {
//     endpoint: "project_details",
//     title: "गौरवका आयोजनाहरु विवरण",
//   },
//   mainroad: {
//     endpoint: "main_road_details",
//     title: "सडक मार्ग विवरण",
//   },
// };

// // Removed WelcomePage component since it will no longer be used directly.
// // If you still need WelcomePage for other purposes, keep it, but it won't be rendered here.
// // You might remove it if its only purpose was this default view.

// // ReportView Component - MODIFIED
// export default function ReportView() {
//   const { path } = useParams();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Determine the report to display
//   let currentReport = null;
//   if (path) {
//     currentReport = reportConfig[path];
//   } else {
//     // If no path is provided, show the first report from reportConfig
//     const firstReportKey = Object.keys(reportConfig)[0];
//     currentReport = reportConfig[firstReportKey];
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <ReportSidebar2
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Main content */}
//         <main className="grow flex flex-col">
//           <div
//             className={`flex-grow flex items-stretch justify-center px-4 sm:px-6 lg:px-8 py-4 bg-[#f5f6f8]`}
//             // Removed conditional background as it will always be a report now
//           >
//             {/* Render MyDataComponent with the determined report */}
//             {currentReport ? (
//               <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
//                 <MyDataComponent
//                   urlPostfix={currentReport.endpoint}
//                   title={currentReport.title}
//                 />
//               </div>
//             ) : (
//               // Fallback if reportConfig is empty or something goes wrong
//               <div className="text-center text-gray-600">
//                 No report data available.
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

import ReportSidebar2 from "../partials/ReportSidebar2";
import Header from "../partials/Header";
// import MyDataComponentInstitution from "../components/InstitutionalComponent";
import MyDataComponent from "../components/MyDataComponent";

const reportConfig = {
  communityorg: {
    endpoint: "co_org_details",
    title: "सामुदायिक संस्था विवरण",
  },
  individualevent: {
    endpoint: "lg_osurvey",
    title: "व्यक्तिगत घटना विवरण",
  },
  socialsecurity: {
    endpoint: "sst_details",
    title: "सामाजिक सुरक्षा कार्यक्रम विवरण",
    keepOriginalStyle: true,
  },
  publicpond: {
    endpoint: "pond_details",
    title: "सार्वजनिक पोखरी तथा माछापालन",
    keepOriginalStyle: true,
  },
  irrigationsystem: {
    endpoint: "irrigation_details",
    title: "सिंचाई सुविधाको उपलब्धता विवरण",
    keepOriginalStyle: true,
  },
  modernanimalhusbandry: {
    endpoint: "ahs_firms",
    title: "आधुनिक पशुपालन (फार्म) सम्बन्धी विवरण",
  },
  agriculturehumanres: {
    endpoint: "ag_details",
    title: "कृषि तथा पशु सेवासंग सम्बन्धित मानव संसाधन (संख्या) विवरण",
  },
  agriculturecommunityorg: {
    endpoint: "ag_org_details",
    title: "कृषि तथा पशु सेवासंग सम्बन्धित सामुदायिक संस्था तथा समूह",
  },
  milldetails: {
    endpoint: "mill_details",
    title: "घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण",
  },
  landuse: {
    endpoint: "landuser_details",
    title: "भू-उपयोगको अवस्था विवरण",
  },
  festival: {
    endpoint: "festival_details",
    title: "मुख्य चाड, पर्व तथा मेला जात्रा सम्बन्धी विवरण",
  },
  mamagroup: {
    endpoint: "mg_details",
    title: "आमा महिला समूह तथा परम्परागत समूहको विवरण",
    keepOriginalStyle: true,
  },
  bankfinancial: {
    endpoint: "bank_details",
    title: "वैक, वित्तीय संस्था, लघुवित्त तथा सहकारी संस्था विवरण",
  },
  farmergroup: {
    endpoint: "fgroup_details",
    title: "कृषक तथा उद्यमी तथा बचत समूहको विवरण",
    keepOriginalStyle: true,
  },
  citizenawareness: {
    endpoint: "ac_td_details",
    title: "नागरिक सचेतना केन्द्र र टोल विकास संस्थाको विवरण",
    keepOriginalStyle: true,
  },
  hoteldetails: {
    endpoint: "hotel_details",
    title: "होटेल, लज, रेष्टुरेण्ट, होमस्टेको विवरण",
  },
  naturalresourcemap: {
    endpoint: "nr_map_details",
    title: "प्राकृतिक स्रोत साधनको नक्शांकन",
  },
  investment: {
    endpoint: "invest_details",
    title: "लगानी विवरण",
  },
  energyaccess: {
    endpoint: "energy_details",
    title: "उर्जाको किसिम तथा नागरिकको पहुँच",
  },
  irrigationstatus: {
    endpoint: "irr_type_details",
    title: "सिंचाईको अवस्था सम्बन्늄दी विवरण",
  },
  housingdevelopment: {
    endpoint: "housing_poor_details",
    title: "भवन, वस्ती विकास तथा विपन्न वर्गका लागि आवास सम्बन्धी विवरण",
  },
  forestenvironment: {
    endpoint: "fe_details",
    title: "वन तथा वातावरण सम्बन्धी विवरण",
  },
  forestindicator: {
    endpoint: "f_indicator_details",
    title: "वन तथा वातावरण सम्बन्धी सुचक विवरण",
  },
  forestbiodiversity: {
    endpoint: "fbd_details",
    title: "वन तथा जैविक विविधता सूचक",
  },
  communityforest: {
    endpoint: "cf_details",
    title: "सामुदायिक वनहरुको विवरण",
  },
  forest: {
    endpoint: "forest_details",
    title: "वनको विवरण",
  },
  landwatershed: {
    endpoint: "landwatershed_details",
    title: "भूमि तथा जलाधार व्यवस्थापन विवरण",
  },
  environmenthygiene: {
    endpoint: "eh_details",
    title: "वातावरण तथा स्वच्छता विवरण",
  },
  airpollution: {
    endpoint: "air_pollution_details",
    title: "वायु प्रदुषणका श्रोतहरु",
  },
  disastermanagement: {
    endpoint: "disaster_details",
    title: "प्रकोप ब्यवस्थापन सम्बन्धी विवरण",
  },
  governance: {
    endpoint: "governance_details",
    title: "सुशासन (सेवा प्रवाहबाट सन्तुष्टी)",
  },
  healthnutrition: {
    endpoint: "hn_details",
    title: "स्वास्थ्य तथा पोषण सम्बन्धी",
  },
  disease: {
    endpoint: "disease_details",
    title: "प्रमुख रोग तथा उपचारसम्बन्धी विवरण",
  },
  majorprojects: {
    endpoint: "project_details",
    title: "गौरवका आयोजनाहरु विवरण",
  },
  mainroad: {
    endpoint: "main_road_details",
    title: "सडक मार्ग विवरण",
  },
  governmentbuilding: {
    endpoint: "building_details",
    title: "सरकारी भवन",
  },
  publiccommunitybuilding: {
    endpoint: "pb_details",
    title: "सार्वजनिक तथा सामुदायिक भवन",
  },
  bridgedetails: {
    endpoint: "bridge_details",
    title: "पुल तथा पुलेसा विवरण",
    // keepOriginalStyle: true,
  },
  grazingarea: {
    endpoint: "graze_details",
    title: "चरन क्षेत्र विवरण",
  },
  waterlandpollution: {
    endpoint: "wlp_details",
    title: "जल तथा जमीन प्रदुषण",
  },
  humancasualltydisaster: {
    endpoint: "hdd_details",
    title: "विपदबाट मानवीय क्षती विवरण",
  },
  disasterimpact: {
    endpoint: "d_impact_details",
    title: "विपदको असर विवरण",
  },
};

export default function ReportViewInstitution() {
  const { path } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let currentReport = null;
  if (path) {
    currentReport = reportConfig[path];
  } else {
    // If no path is provided, default to 'individualevent'
    currentReport =
      reportConfig["individualevent"] || Object.values(reportConfig)[0];
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ReportSidebar2
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
          >
            {currentReport ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full h-full overflow-auto">
                {" "}
                {/* Added overflow-auto */}
                <MyDataComponent
                  urlPostfix={currentReport.endpoint}
                  title={currentReport.title}
                  keepOriginalStyle={
                    currentReport.keepOriginalStyle
                      ? currentReport.keepOriginalStyle
                      : false
                  }
                />
              </div>
            ) : (
              <div className="text-center text-gray-600">
                रिपोर्ट उपलब्ध छैन। कृपया URL जाँच गर्नुहोस्।{" "}
                {/* More specific message */}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
