// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../partials/Sidebar.jsx";
// import Header from "../partials/Header.jsx";
// import HighchartsChart from "../components/HighchartsChart.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// export const COLUMN_TO_API_POSTFIX_MAP = {
//   "family-gender": { api: "/models/lg_hsurvey_family", column: "gender" },
//   "family-caste_category": {
//     api: "/models/lg_hsurvey_family",
//     column: "caste_category",
//   },
//   "family-religion": { api: "/models/lg_hsurvey_family", column: "religion" },
//   "family-mother_tongue": {
//     api: "/models/lg_hsurvey_family",
//     column: "mother_tongue",
//   },
//   "family-education_detail": {
//     api: "/models/lg_hsurvey_family",
//     column: "education_detail",
//   },
//   "family-occupation": {
//     api: "/models/lg_hsurvey_family",
//     column: "occupation",
//   },
//   "family-disease_name": {
//     api: "/models/lg_hsurvey_family",
//     column: "disease_name",
//   },

//   // From /models/lg_hsurvey_land_details
//   "land-purpose": {
//     api: "/models/lg_hsurvey_land_details",
//     column: "land_purpose",
//   },

//   // From /models/lg_hsurvey_building_details
//   "building-texture": {
//     api: "/models/lg_hsurvey_building_details",
//     column: "texture",
//   },
//   "building-field": {
//     api: "/models/lg_hsurvey_building_details",
//     column: "field",
//   },

//   // Specific 'Name' columns from different tables (total 6 now)
//   "income-source-name": {
//     api: "/models/lg_hsurvey_income_source",
//     column: "Name",
//   },
//   "work-division-name": {
//     api: "/models/lg_hsurvey_workdivision",
//     column: "Name",
//   },
//   "saving-source-name": {
//     api: "/models/lg_hsurvey_saving_source",
//     column: "Name",
//   },
//   "inv-source-name": { api: "/models/lg_hsurvey_inv_source", column: "Name" },
//   "expense-source-name": {
//     api: "/models/lg_hsurvey_expense_source",
//     column: "Name",
//   },
//   "loan-source-name": {
//     api: "/models/lg_hsurvey_loan_source",
//     column: "Name",
//   },

//   // From /models/lg_hsurvey_loan_source
//   "loan-source": {
//     api: "/models/lg_hsurvey_loan_source",
//     column: "loan_source",
//   },

//   // Note: 'Description' for work division
//   "work-division-description": {
//     api: "/models/lg_hsurvey_workdivision",
//     column: "Description",
//   },

//   // From /models/lg_hsurvey_death_count
//   "death-disease": { api: "/models/lg_hsurvey_death_count", column: "disease" },

//   // From /models/lg_hsurvey
//   "hsurvey-cooking_fuel": { api: "/models/lg_hsurvey", column: "cooking_fuel" },
//   "hsurvey-stove_type": { api: "/models/lg_hsurvey", column: "stove_type" },
//   "hsurvey-electricity_source": {
//     api: "/models/lg_hsurvey",
//     column: "electricity_source",
//   },
//   "hsurvey-toilet_status": {
//     api: "/models/lg_hsurvey",
//     column: "toilet_status",
//   },
//   "hsurvey-water_source": { api: "/models/lg_hsurvey", column: "water_source" },
// };

// export const NEPAL_COLUMN_NAMES = {
//   // Family related
//   "family-gender": "लिङ्गका आधारमा विभाजन",
//   "family-caste_category": "जातिको आधारमा वर्गिकरण",
//   "family-religion": "धर्मको आधारमा वर्गिकरण",
//   "family-mother_tongue": "मातृभाषाको आधारमा वर्गिकरण",
//   "family-education_detail": "शैक्षिक विवरण",
//   "family-occupation": "पेशाको आधारमा वर्गिकरण",
//   "family-disease_name": "रोगलागेको आधारमा विवरण",

//   // Land related
//   "land-purpose": "जग्गाको प्रयोग",

//   // Building related
//   "building-texture": "घरको बनावट", // Assuming this is for building texture
//   "building-field": "घरको क्षेत्र", // Assuming this is for building field

//   "income-source-name": "आय सम्बन्धी विवरण",
//   "work-division-name": "कार्य विभाजन", // Explicitly for workdivision's 'Name'
//   "saving-source-name": "बचत सम्बन्धी विवरण",
//   "inv-source-name": "लगानी सम्बन्धी विवरण ",
//   "expense-source-name": "खर्च सम्बन्धी विवरण",
//   "service-source-name": "सेवाको स्रोत", // Added this one for 'service_source' Name
//   "loan-source-name": "ऋणको प्रयोजन ",

//   // Other specific
//   "loan-source": "ऋणको स्रोतको विवरण",
//   "work-division-description": "कार्य विवरण लिङ्गका आधारमा", // For work division's 'Description'
//   "death-disease": "१ बर्ष भित्र मृत्यु भएका सदस्यको रोग विवरण", // For death count disease

//   // Hsurvey related
//   "hsurvey-cooking_fuel": "खाना पकाउने इन्धनको आधारमा",
//   "hsurvey-stove_type": "चुल्होको प्रकारको आधारमा",
//   "hsurvey-electricity_source": "बिजुलीको स्रोत आधारमा",
//   "hsurvey-toilet_status": "शौचालय स्थिति",
//   "hsurvey-water_source": "जलस्रोतहरूको आधारमा",

//   // Standard labels that might appear as data values
//   Male: "पुरुष",
//   Female: "महिला",
//   अन्य: "अन्य", // For "Other" or undefined values
// };

// const WARD_OPTIONS = [
//   { value: "0", label: "वडा नं" },
//   ...Array.from({ length: 12 }, (_, i) => ({
//     value: String(i + 1),
//     label: String(i + 1),
//   })),
// ];

// async function fetchAllPages({
//   axiosInstance,
//   postfix,
//   filterKey,
//   filterValue,
// }) {
//   const pageSize = 100;
//   let skip = 0;
//   let allRecords = [];
//   let total = null;
//   let pageCount = 0;

//   if (!postfix || typeof postfix !== "string") {
//     console.error("Invalid API postfix provided to fetchAllPages:", postfix);
//     return [];
//   }

//   while (true) {
//     const url = `${postfix}?$filter=${filterKey} eq '${filterValue}'&$top=${pageSize}&$skip=${skip}`;
//     const res = await axiosInstance.get(url, { headers: { id: 0 } });
//     const records = res.data.records || [];
//     if (total === null) {
//       total = res.data["row-count"] || null;
//       pageCount = res.data["page-count"] || null;
//     }
//     allRecords = allRecords.concat(records);
//     if (records.length < pageSize) break;
//     skip += pageSize;
//     if (pageCount && skip / pageSize >= pageCount) break;
//     if (total && allRecords.length >= total) break;
//   }
//   return allRecords;
// }

// // Skeleton component for charts
// const ChartSkeleton = () => (
//   <div className="bg-gray-100 rounded-lg shadow p-4 animate-pulse h-80">
//     <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
//     <div className="h-48 bg-gray-300 rounded"></div>
//   </div>
// );

// // Skeleton component for tables
// const TableSkeleton = () => (
//   <div className="card bg-white rounded shadow p-4 animate-pulse">
//     <div className="overflow-x-auto">
//       <table className="table table-bordered table-sm w-full border border-gray-300 text-sm">
//         <thead className="bg-blue-600">
//           <tr>
//             <th className="text-center text-white font-semibold py-2">
//               <div className="h-4 bg-blue-400 rounded w-1/2 mx-auto"></div>
//             </th>
//             <th className="text-center text-white font-semibold py-2">
//               <div className="h-4 bg-blue-400 rounded w-1/2 mx-auto"></div>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...Array(5)].map((_, i) => (
//             <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//               <td className="text-center align-middle py-3 px-2">
//                 <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
//               </td>
//               <td className="text-center align-middle py-3 px-2">
//                 <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot className="bg-gray-200">
//           <tr>
//             <td className="text-center font-bold py-2 px-2">
//               <div className="h-4 bg-gray-400 rounded w-1/3 mx-auto"></div>
//             </td>
//             <td className="text-center font-bold py-2 px-2">
//               <div className="h-4 bg-gray-400 rounded w-1/4 mx-auto"></div>
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   </div>
// );

// export default function HouseholdWardSearch() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { path: reportKey } = useParams();

//   const { axiosInstance, authLoading, authError } = useAuth();
//   const [ward, setWard] = useState("2");
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
//   const [tableData, setTableData] = useState([]);

//   const reportConfig = COLUMN_TO_API_POSTFIX_MAP[reportKey];
//   const dynamicApiPostfix = reportConfig ? reportConfig.api : null;
//   const param = reportConfig ? reportConfig.column : null;

//   const nepalParamName = NEPAL_COLUMN_NAMES[reportKey] || reportKey;

//   const chartAndTableTitle =
//     dynamicApiPostfix === "/models/lg_hsurvey" ||
//     dynamicApiPostfix === "/models/lg_hsurvey_family"
//       ? "जनसंख्या"
//       : "घरधुरी";

//   const chartCategories = tableData.map((d) => d.label);
//   const chartValues = tableData.map((d) => d.value);

//   const pieOptions = {
//     chart: { type: "pie" },
//     title: { text: `${nepalParamName}` },
//     series: [
//       {
//         name: chartAndTableTitle,
//         data: tableData.map((d) => ({ name: d.label, y: d.value })),
//       },
//     ],
//   };

//   const barOptions = {
//     chart: { type: "column" },
//     title: { text: `${nepalParamName}` },
//     xAxis: { categories: chartCategories },
//     yAxis: { title: { text: chartAndTableTitle } },
//     series: [
//       {
//         name: chartAndTableTitle,
//         data: chartValues,
//         showInLegend: false,
//       },
//     ],
//   };

//   const handleWardSelect = (selectedWard) => {
//     setWard(selectedWard);
//   };

//   useEffect(() => {
//     async function autoSearch() {
//       if (
//         !reportKey ||
//         !ward ||
//         !axiosInstance ||
//         !param ||
//         !dynamicApiPostfix
//       ) {
//         console.warn(
//           `Missing necessary parameters for autoSearch. reportKey: ${reportKey}, param: ${param}, dynamicApiPostfix: ${dynamicApiPostfix}`
//         );
//         setTableData([]);
//         setSummary({ population: 0, female: 0, male: 0 });
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       const processedLocalKey = `${reportKey}_ward_${ward}_processed`;
//       const CACHE_TTL = 5 * 60 * 1000;

//       const cachedProcessed = localStorage.getItem(processedLocalKey);
//       if (cachedProcessed) {
//         try {
//           const parsed = JSON.parse(cachedProcessed);
//           if (
//             parsed.tableData &&
//             parsed.summaryData &&
//             parsed.timestamp &&
//             Date.now() - parsed.timestamp < CACHE_TTL
//           ) {
//             setTableData(parsed.tableData);
//             setSummary(parsed.summaryData);
//             setLoading(false);
//             console.log(
//               `Loaded from fresh processed cache for ${processedLocalKey}!`
//             );
//             return;
//           } else {
//             console.log(
//               `Cached data for ${processedLocalKey} expired or invalid. Refetching.`
//             );
//             localStorage.removeItem(processedLocalKey);
//           }
//         } catch (e) {
//           console.warn(
//             `Failed to parse cached processed data for ${processedLocalKey}:`,
//             e
//           );
//           localStorage.removeItem(processedLocalKey);
//         }
//       }

//       try {
//         const records = await fetchAllPages({
//           axiosInstance,
//           postfix: dynamicApiPostfix,
//           filterKey: "ward_no",
//           filterValue: ward,
//         });

//         console.log(
//           "Raw records from API for",
//           dynamicApiPostfix,
//           ":",
//           records.length,
//           "records"
//         );

//         const group = {};
//         let totalPopulation = 0;
//         let femaleCount = 0;
//         let maleCount = 0;

//         records.forEach((rec) => {
//           let val = rec[param];
//           if (!(param in rec)) {
//             console.warn(
//               `Record does not have property '${param}' for report key '${reportKey}':`,
//               rec
//             );
//             val = "अन्य";
//           }
//           if (val === null || val === undefined || val === "") val = "अन्य";
//           group[val] = (group[val] || 0) + 1;
//           totalPopulation++;

//           if (rec.gender) {
//             if (rec.gender === "Female" || rec.gender === "महिला") {
//               femaleCount++;
//             } else if (rec.gender === "Male" || rec.gender === "पुरुष") {
//               maleCount++;
//             }
//           }
//         });

//         const dataForTable = Object.entries(group).map(([label, value]) => ({
//           label: NEPAL_COLUMN_NAMES[label] || label,
//           value,
//         }));

//         dataForTable.sort((a, b) =>
//           a.label.localeCompare(b.label, "ne", { sensitivity: "base" })
//         );

//         const newSummary = {
//           population: totalPopulation,
//           female: femaleCount,
//           male: maleCount,
//         };

//         setTableData(dataForTable);
//         setSummary(newSummary);

//         try {
//           localStorage.setItem(
//             processedLocalKey,
//             JSON.stringify({
//               tableData: dataForTable,
//               summaryData: newSummary,
//               timestamp: Date.now(),
//             })
//           );
//           console.log(
//             `Fetched and cached processed data for ${processedLocalKey}.`
//           );
//         } catch (storageError) {
//           if (storageError.name === "QuotaExceededError") {
//             console.warn(
//               `QuotaExceededError for ${processedLocalKey}. Data too large for localStorage.`
//             );
//           } else {
//             console.error(
//               `Error caching data for ${processedLocalKey}:`,
//               storageError
//             );
//           }
//         }
//       } catch (e) {
//         console.error("Error fetching or processing data:", e);
//         setTableData([]);
//         setSummary({ population: 0, female: 0, male: 0 });
//       } finally {
//         setLoading(false);
//       }
//     }
//     autoSearch();
//   }, [reportKey, ward, axiosInstance, param, dynamicApiPostfix]);

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
//           <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
//           <p className="text-lg font-semibold text-gray-700">
//             वेबसाइट सामग्री लोड गर्दै...
//           </p>
//           <p className="text-sm text-gray-500">(API टोकन प्राप्त गर्दै)</p>
//         </div>
//       </div>
//     );
//   }
//   if (authError) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-red-50">
//         <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg border border-red-300">
//           <svg
//             className="w-16 h-16 text-red-500 mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             ></path>
//           </svg>
//           <p className="text-lg font-semibold text-red-700 mb-2">
//             API प्रारम्भ गर्दा त्रुटि भयो!
//           </p>
//           <p className="text-sm text-red-600 text-center">{authError}</p>
//           <p className="text-xs text-gray-500 mt-4">
//             कृपया पछि फेरि प्रयास गर्नुहोस् वा प्रशासकलाई सम्पर्क गर्नुहोस्।
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         isLoading={loading}
//       />
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           onSelectWard={handleWardSelect}
//         />
//         <main className="flex-grow">
//           <div className="container mx-auto p-4">
//             {/* Summary Cards (Commented out as per original provided code) */}
//             {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <SummaryCard
//                 icon="fas fa-users"
//                 value={summary.population}
//                 label="जम्मा जनसंख्या"
//               />
//               <SummaryCard
//                 icon="fas fa-user-alt"
//                 value={summary.female}
//                 label="महिला"
//               />
//               <SummaryCard
//                 icon="fas fa-user-alt"
//                 value={summary.male}
//                 label="पुरुष"
//               />
//             </div> */}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {loading ? (
//                 <>
//                   <ChartSkeleton />
//                   <ChartSkeleton />
//                 </>
//               ) : (
//                 <>
//                   <HighchartsChart
//                     options={pieOptions}
//                     title=""
//                     height="350px"
//                   />
//                   <HighchartsChart
//                     options={barOptions}
//                     title=""
//                     height="350px"
//                   />
//                 </>
//               )}
//             </div>

//             {loading ? (
//               <TableSkeleton />
//             ) : (
//               <div className="card bg-white rounded shadow">
//                 <div className="card-body p-4">
//                   <div className="overflow-x-auto">
//                     <table className="table table-bordered table-sm w-full border border-gray-300 text-sm hover:table-hover">
//                       <thead className="bg-blue-600">
//                         <tr>
//                           <th className="text-center text-white font-semibold">
//                             {nepalParamName}{" "}
//                           </th>
//                           <th className="text-center text-white font-semibold">
//                             {chartAndTableTitle}
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {tableData.length === 0 ? (
//                           <tr>
//                             <td
//                               colSpan="2"
//                               className="text-center py-4 text-gray-500"
//                             >
//                               हालको वडा र छनोट गरिएको विवरणका लागि कुनै डाटा
//                               उपलब्ध छैन।
//                             </td>
//                           </tr>
//                         ) : (
//                           tableData.map((row, idx) => (
//                             <tr
//                               key={idx}
//                               className={
//                                 idx % 2 === 0
//                                   ? "bg-white hover:bg-blue-50"
//                                   : "bg-gray-50 hover:bg-blue-50"
//                               }
//                             >
//                               <td className="text-center align-middle py-1 px-2">
//                                 {NEPAL_COLUMN_NAMES[row.label] || row.label}
//                               </td>
//                               <td className="text-center align-middle py-1 px-2 font-medium">
//                                 {row.value}
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                       <tfoot className="bg-gray-200">
//                         <tr>
//                           <td className="text-center font-bold py-1 px-2">
//                             जम्मा
//                           </td>
//                           <td className="text-center font-bold py-1 px-2">
//                             {tableData.reduce((sum, r) => sum + r.value, 0)}
//                           </td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function SummaryCard({ icon, value, label }) {
//   return (
//     <div className="bg-gray-100 rounded-lg shadow p-4 flex items-center">
//       <div className="flex-shrink-0 mr-4">
//         <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
//           <i className={`${icon} text-3xl text-blue-600`} />
//         </div>
//       </div>
//       <div>
//         <div className="text-2xl font-bold text-gray-800">{value}</div>
//         <div className="text-gray-600">{label}</div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";
import HighchartsChart from "../components/HighchartsChart.jsx";

export const COLUMN_TO_API_POSTFIX_MAP = {
  "family-gender": { api: "/models/lg_hsurvey_family", column: "gender" },
  "family-caste_category": {
    api: "/models/lg_hsurvey_family",
    column: "caste_category",
  },
  "family-religion": { api: "/models/lg_hsurvey_family", column: "religion" },
  "family-mother_tongue": {
    api: "/models/lg_hsurvey_family",
    column: "mother_tongue",
  },
  "family-education_detail": {
    api: "/models/lg_hsurvey_family",
    column: "education_detail",
  },
  "family-occupation": {
    api: "/models/lg_hsurvey_family",
    column: "occupation",
  },
  "family-disease_name": {
    api: "/models/lg_hsurvey_family",
    column: "disease_name",
  },

  // From /models/lg_hsurvey_land_details
  "land-purpose": {
    api: "/models/lg_hsurvey_land_details",
    column: "land_purpose",
  },

  // From /models/lg_hsurvey_building_details
  "building-texture": {
    api: "/models/lg_hsurvey_building_details",
    column: "texture",
  },
  "building-field": {
    api: "/models/lg_hsurvey_building_details",
    column: "field",
  },

  // Specific 'Name' columns from different tables (total 6 now)
  "income-source-name": {
    api: "/models/lg_hsurvey_income_source",
    column: "Name",
  },
  "work-division-name": {
    api: "/models/lg_hsurvey_workdivision",
    column: "Name",
  },
  "saving-source-name": {
    api: "/models/lg_hsurvey_saving_source",
    column: "Name",
  },
  "inv-source-name": { api: "/models/lg_hsurvey_inv_source", column: "Name" },
  "expense-source-name": {
    api: "/models/lg_hsurvey_expense_source",
    column: "Name",
  },
  "loan-source-name": {
    api: "/models/lg_hsurvey_loan_source",
    column: "Name",
  },

  // From /models/lg_hsurvey_loan_source
  "loan-source": {
    api: "/models/lg_hsurvey_loan_source",
    column: "loan_source",
  },

  // Note: 'Description' for work division
  "work-division-description": {
    api: "/models/lg_hsurvey_workdivision",
    column: "Description",
  },

  // From /models/lg_hsurvey_death_count
  "death-disease": { api: "/models/lg_hsurvey_death_count", column: "disease" },

  // From /models/lg_hsurvey
  "hsurvey-cooking_fuel": { api: "/models/lg_hsurvey", column: "cooking_fuel" },
  "hsurvey-stove_type": { api: "/models/lg_hsurvey", column: "stove_type" },
  "hsurvey-electricity_source": {
    api: "/models/lg_hsurvey",
    column: "electricity_source",
  },
  "hsurvey-toilet_status": {
    api: "/models/lg_hsurvey",
    column: "toilet_status",
  },
  "hsurvey-water_source": { api: "/models/lg_hsurvey", column: "water_source" },
};

export const NEPAL_COLUMN_NAMES = {
  // Family related
  "family-gender": "लिङ्गका आधारमा विभाजन",
  "family-caste_category": "जातिको आधारमा वर्गिकरण",
  "family-religion": "धर्मको आधारमा वर्गिकरण",
  "family-mother_tongue": "मातृभाषाको आधारमा वर्गिकरण",
  "family-education_detail": "शैक्षिक विवरण",
  "family-occupation": "पेशाको आधारमा वर्गिकरण",
  "family-disease_name": "रोगलागेको आधारमा विवरण",

  // Land related
  "land-purpose": "जग्गाको प्रयोग",

  // Building related
  "building-texture": "घरको बनावट", // Assuming this is for building texture
  "building-field": "घरको क्षेत्र", // Assuming this is for building field

  "income-source-name": "आय सम्बन्धी विवरण",
  "work-division-name": "कार्य विभाजन", // Explicitly for workdivision's 'Name'
  "saving-source-name": "बचत सम्बन्धी विवरण",
  "inv-source-name": "लगानी सम्बन्धी विवरण ",
  "expense-source-name": "खर्च सम्बन्धी विवरण",
  "service-source-name": "सेवाको स्रोत", // Added this one for 'service_source' Name
  "loan-source-name": "ऋणको प्रयोजन ",

  // Other specific
  "loan-source": "ऋणको स्रोतको विवरण",
  "work-division-description": "कार्य विवरण लिङ्गका आधारमा", // For work division's 'Description'
  "death-disease": "१ बर्ष भित्र मृत्यु भएका सदस्यको रोग विवरण", // For death count disease

  // Hsurvey related
  "hsurvey-cooking_fuel": "खाना पकाउने इन्धनको आधारमा",
  "hsurvey-stove_type": "चुल्होको प्रकारको आधारमा",
  "hsurvey-electricity_source": "बिजुलीको स्रोत आधारमा",
  "hsurvey-toilet_status": "शौचालय स्थिति",
  "hsurvey-water_source": "जलस्रोतहरूको आधारमा",

  // Standard labels that might appear as data values
  Male: "पुरुष",
  Female: "महिला",
  अन्य: "अन्य", // For "Other" or undefined values
};

const WARD_OPTIONS = [
  { value: "0", label: "वडा नं" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  })),
];

// --- MODIFIED fetchData FUNCTION FOR NATIVE FETCH API (sending data in body) ---
async function fetchData({ tableName, columnName, wardNo }) {
  // Use the same proxy URL as before
  const baseUrl = "/shankharapurapi/householdreport/view";

  // Ensure tableName is cleaned (e.g., "lg_hsurvey_family" from "/models/lg_hsurvey_family")
  const cleanedTableName = tableName.replace("/models/", "");

  // Data to be sent in the request body
  const requestBody = {
    ward_no: wardNo,
    column_name: columnName,
    table_name: cleanedTableName,
  };

  // console.log("Fetching from URL via fetch (POST):", baseUrl); // Log the base URL
  // console.log("Request Body:", requestBody); // Log the request body

  try {
    const response = await fetch(baseUrl, {
      method: "POST", // Specify POST method
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify(requestBody), // Convert the JavaScript object to a JSON string
    });

    // Check if the response was successful (HTTP status 2xx)
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${
          errorBody.message || errorBody.detail || response.statusText
        }`
      );
    }

    const resData = await response.json(); // Parse the response body as JSON

    if (resData && resData.data) {
      // The 'data' field is a JSON string, so parse it again
      const parsedData = JSON.parse(resData.data);
      return parsedData.map((item) => ({
        label: item.name,
        value: parseInt(item.value, 10),
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
// -----------------------------------------------------------

// Skeleton component for charts
const ChartSkeleton = () => (
  <div className="bg-gray-100 rounded-lg shadow p-4 animate-pulse h-80">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-48 bg-gray-300 rounded"></div>
  </div>
);

// Skeleton component for tables
const TableSkeleton = () => (
  <div className="card bg-white rounded shadow p-4 animate-pulse">
    <div className="overflow-x-auto">
      <table className="table table-bordered table-sm w-full border border-gray-300 text-sm">
        <thead className="bg-blue-600">
          <tr>
            <th className="text-center text-white font-semibold py-2">
              <div className="h-4 bg-blue-400 rounded w-1/2 mx-auto"></div>
            </th>
            <th className="text-center text-white font-semibold py-2">
              <div className="h-4 bg-blue-400 rounded w-1/2 mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="text-center align-middle py-3 px-2">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="text-center align-middle py-3 px-2">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td className="text-center font-bold py-2 px-2">
              <div className="h-4 bg-gray-400 rounded w-1/3 mx-auto"></div>
            </td>
            <td className="text-center font-bold py-2 px-2">
              <div className="h-4 bg-gray-400 rounded w-1/4 mx-auto"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

export default function HouseholdWardSearch() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { path: reportKey } = useParams();

  const { authLoading, authError } = { authLoading: false, authError: null }; // Mock auth for fetch example

  const [ward, setWard] = useState("2");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 }); // This is not currently used to display data from the API response

  const reportConfig = COLUMN_TO_API_POSTFIX_MAP[reportKey];
  const tableName = reportConfig ? reportConfig.api : null;
  const columnName = reportConfig ? reportConfig.column : null;

  // Add this log to check initial parameters
  // console.log("Component Parameters:", {
  //   reportKey,
  //   tableName,
  //   columnName,
  //   ward,
  //   authLoading,
  //   authError,
  // });

  const nepalParamName = NEPAL_COLUMN_NAMES[reportKey] || reportKey;

  const chartAndTableTitle =
    tableName === "/models/lg_hsurvey" ||
    tableName === "/models/lg_hsurvey_family"
      ? "जनसंख्या"
      : "घरधुरी";

  const [tableData, setTableData] = useState([]); // Moved state here to be more explicit

  const chartCategories = tableData.map((d) => d.label);
  const chartValues = tableData.map((d) => d.value);

  const pieOptions = {
    chart: { type: "pie" },
    title: { text: `${nepalParamName}` },
    series: [
      {
        name: chartAndTableTitle,
        data: tableData.map((d) => ({ name: d.label, y: d.value })),
      },
    ],
  };

  const barOptions = {
    chart: { type: "column" },
    title: { text: `${nepalParamName}` },
    xAxis: { categories: chartCategories },
    yAxis: { title: { text: chartAndTableTitle } },
    series: [
      {
        name: chartAndTableTitle,
        data: chartValues,
        showInLegend: false,
      },
    ],
  };

  const handleWardSelect = (selectedWard) => {
    setWard(selectedWard);
  };

  useEffect(() => {
    async function autoSearch() {
      if (!reportKey || !ward || !columnName || !tableName) {
        console.warn(
          `Missing necessary parameters for autoSearch. ` +
            `reportKey: ${reportKey}, ` +
            `ward: ${ward}, ` +
            `columnName: ${columnName}, ` +
            `tableName: ${tableName}`
        );
        setTableData([]);
        setSummary({ population: 0, female: 0, male: 0 }); // Reset summary too
        setLoading(false);
        return;
      }

      setLoading(true);

      const processedLocalKey = `${reportKey}_ward_${ward}_processed`;
      const CACHE_TTL = 5 * 60 * 1000;

      const cachedProcessed = localStorage.getItem(processedLocalKey);
      if (cachedProcessed) {
        try {
          const parsed = JSON.parse(cachedProcessed);
          if (
            parsed.tableData &&
            parsed.summaryData &&
            parsed.timestamp &&
            Date.now() - parsed.timestamp < CACHE_TTL
          ) {
            setTableData(parsed.tableData);
            setSummary(parsed.summaryData);
            setLoading(false);
            // console.log(
            //   `Loaded from fresh processed cache for ${processedLocalKey}!`
            // );
            return;
          } else {
            // console.log(
            //   `Cached data for ${processedLocalKey} expired or invalid. Refetching.`
            // );
            localStorage.removeItem(processedLocalKey);
          }
        } catch (e) {
          console.warn(
            `Failed to parse cached processed data for ${processedLocalKey}:`,
            e
          );
          localStorage.removeItem(processedLocalKey);
        }
      }

      try {
        const fetchedData = await fetchData({
          tableName,
          columnName,
          wardNo: ward,
        });

        // console.log(
        //   "Processed data from API for",
        //   tableName,
        //   columnName,
        //   ":",
        //   fetchedData.length,
        //   "records"
        // );

        // const dataForTable = fetchedData.map((item) => ({
        //   label: NEPAL_COLUMN_NAMES[item.label] || item.label,
        //   value: item.value,
        // }));
        const dataForTable = fetchedData.map((item) => {
          // Ensure item.label is treated as a string, even if it's null/undefined from the API
          const originalLabel = String(item.label || ""); // Convert null/undefined to ""

          return {
            label: NEPAL_COLUMN_NAMES[originalLabel] || originalLabel,
            value: parseInt(item.value, 10),
          };
        });

        dataForTable.sort((a, b) =>
          a.label.localeCompare(b.label, "ne", { sensitivity: "base" })
        );

        // Note: The summary data (population, male, female) is not directly derived
        // from the `fetchedData` which is a count of categories.
        // If your API provides separate summary data, you would fetch it here.
        // For now, it will remain as a static 0.
        const newSummary = {
          population: dataForTable.reduce((sum, item) => sum + item.value, 0),
          female:
            dataForTable.find(
              (item) =>
                item.label === NEPAL_COLUMN_NAMES.Female ||
                item.label === "Female"
            )?.value || 0,
          male:
            dataForTable.find(
              (item) =>
                item.label === NEPAL_COLUMN_NAMES.Male || item.label === "Male"
            )?.value || 0,
        };

        setTableData(dataForTable);
        setSummary(newSummary);

        try {
          localStorage.setItem(
            processedLocalKey,
            JSON.stringify({
              tableData: dataForTable,
              summaryData: newSummary,
              timestamp: Date.now(),
            })
          );
          // console.log(
          //   `Fetched and cached processed data for ${processedLocalKey}.`
          // );
        } catch (storageError) {
          if (storageError.name === "QuotaExceededError") {
            console.warn(
              `QuotaExceededError for ${processedLocalKey}. Data too large for localStorage.`
            );
          } else {
            console.error(
              `Error caching data for ${processedLocalKey}:`,
              storageError
            );
          }
        }
      } catch (e) {
        console.error("Error fetching or processing data:", e);
        setTableData([]);
        setSummary({ population: 0, female: 0, male: 0 });
      } finally {
        setLoading(false);
      }
    }
    autoSearch();
  }, [reportKey, ward, columnName, tableName]);

  // Keep authLoading/authError handling if useAuth is still imported and used for it
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            वेबसाइट सामग्री लोड गर्दै...
          </p>
          <p className="text-sm text-gray-500">(API टोकन प्राप्त गर्दै)</p>
        </div>
      </div>
    );
  }
  if (authError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg border border-red-300">
          <svg
            className="w-16 h-16 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-red-700 mb-2">
            API प्रारम्भ गर्दा त्रुटि भयो!
          </p>
          <p className="text-sm text-red-600 text-center">{authError}</p>
          <p className="text-xs text-gray-500 mt-4">
            कृपया पछि फेरि प्रयास गर्नुहोस् वा प्रशासकलाई सम्पर्क गर्नुहोस्।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isLoading={loading}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onSelectWard={handleWardSelect}
        />
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            {/* Summary Cards - You had these in your original request, but they were commented out.
                I'm adding them back here as an example of how you might use `summary` state.
                Keep in mind the current `summary` calculation is basic and assumes 'Male' and 'Female'
                labels are present in `tableData` and are in Nepali as per `NEPAL_COLUMN_NAMES`.
            */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {loading ? (
                <>
                  <ChartSkeleton />{" "}
                  <ChartSkeleton />
                  <ChartSkeleton />
                </>
              ) : (
                <>
                  <SummaryCard
                    icon="fa-solid fa-users"
                    value={summary.population.toLocaleString("en-IN")}
                    label="कुल घरधुरी / जनसंख्या"
                  />
                  <SummaryCard
                    icon="fa-solid fa-person"
                    value={summary.male.toLocaleString("en-IN")}
                    label="पुरुष"
                  />
                  <SummaryCard
                    icon="fa-solid fa-person-dress"
                    value={summary.female.toLocaleString("en-IN")}
                    label="महिला"
                  />
                </>
              )}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {loading ? (
                <>
                  <ChartSkeleton />
                  <ChartSkeleton />
                </>
              ) : (
                <>
                  <HighchartsChart
                    options={pieOptions}
                    title=""
                    height="350px"
                  />
                  <HighchartsChart
                    options={barOptions}
                    title=""
                    height="350px"
                  />
                </>
              )}
            </div>

            {loading ? (
              <TableSkeleton />
            ) : (
              <div className="card bg-white rounded shadow">
                <div className="card-body p-4">
                  <div className="overflow-x-auto">
                    <table className="table table-bordered table-sm w-full border border-gray-300 text-sm hover:table-hover">
                      <thead className="bg-blue-600">
                        <tr>
                          <th className="text-center text-white font-semibold">
                            {nepalParamName}{" "}
                          </th>
                          <th className="text-center text-white font-semibold">
                            {chartAndTableTitle}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.length === 0 ? (
                          <tr>
                            <td
                              colSpan="2"
                              className="text-center py-4 text-gray-500"
                            >
                              हालको वडा र छनोट गरिएको विवरणका लागि कुनै डाटा
                              उपलब्ध छैन।
                            </td>
                          </tr>
                        ) : (
                          tableData.map((row, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0
                                  ? "bg-white hover:bg-blue-50"
                                  : "bg-gray-50 hover:bg-blue-50"
                              }
                            >
                              <td className="text-center align-middle py-1 px-2">
                                {NEPAL_COLUMN_NAMES[row.label] || row.label}
                              </td>
                              <td className="text-center align-middle py-1 px-2 font-medium">
                                {row.value}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      <tfoot className="bg-gray-200">
                        <tr>
                          <td className="text-center font-bold py-1 px-2">
                            जम्मा
                          </td>
                          <td className="text-center font-bold py-1 px-2">
                            {tableData.reduce((sum, r) => sum + r.value, 0)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ icon, value, label }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow p-4 flex items-center">
      <div className="flex-shrink-0 mr-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
          <i className={`${icon} text-3xl text-blue-600`} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-gray-600">{label}</div>
      </div>
    </div>
  );
}
