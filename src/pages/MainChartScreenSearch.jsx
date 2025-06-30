// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../partials/Sidebar.jsx";
// import Header from "../partials/Header.jsx";
// import HighchartsChart from "../components/HighchartsChart.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// // const API_POSTFIX = "/models/lg_hsurvey_family";
// // const API_POSTFIX = "/models/lg_hsurvey_land_details";
// // const API_POSTFIX = "/models/lg_hsurvey_building_details";
// // const API_POSTFIX = "/models/lg_hsurvey_income_source";
// // const API_POSTFIX = "/models/lg_hsurvey_expense_source"; //no data visible
// // const API_POSTFIX = "/models/lg_hsurvey_saving_source";
// const API_POSTFIX = "/models/lg_hsurvey_loan_source";
// // const API_POSTFIX = "/models/lg_hsurvey_service_details"; //no data visible
// // const API_POSTFIX = "/models/lg_hsurvey_ag_prod";
// // const API_POSTFIX = "/models/lg_hsurvey_livestoke_prod"; //no data
// // const API_POSTFIX = "/models/lg_hsurvey_school_time";
// // const API_POSTFIX = "/models/lg_hsurvey_disaster_details";
// // const API_POSTFIX = "/models/lg_hsurvey_workdivision";

// const WARD_OPTIONS = [
//   { value: "0", label: "वडा नं" },
//   ...Array.from({ length: 12 }, (_, i) => ({
//     value: String(i + 1),
//     label: String(i + 1),
//   })),
// ];

// // Utility to fetch all pages and cache in localStorage
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
//   let localKey = `${postfix}_ward_${filterValue}`;

//   // Check localStorage first
//   const cached = localStorage.getItem(localKey);
//   if (cached) {
//     try {
//       const parsed = JSON.parse(cached);
//       if (Array.isArray(parsed)) return parsed;
//     } catch (e) {}
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
//     // Defensive: break if we exceed a reasonable number of pages
//     if (pageCount && skip / pageSize >= pageCount) break;
//     if (total && allRecords.length >= total) break;
//   }
//   // Store in localStorage
//   localStorage.setItem(localKey, JSON.stringify(allRecords));
//   return allRecords;
// }

// export default function HouseholdWardSearch() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { path: param } = useParams();
//   const { axiosInstance, authLoading, authError } = useAuth();
//   const [ward, setWard] = useState("2");
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
//   const [tableData, setTableData] = useState([]);

//   console.log("Current tableData state:", tableData);
//   console.log("Current summary state:", summary);
//   // Chart data
//   const chartCategories = tableData.map((d) => d.label);
//   const chartValues = tableData.map((d) => d.value);

//   const pieOptions = {
//     chart: { type: "pie" },
//     title: { text: param },
//     series: [
//       {
//         // name: "घर संख्या",
//         name: "जनसंख्या",
//         data: tableData.map((d) => ({ name: d.label, y: d.value })),
//       },
//     ],
//   };

//   const barOptions = {
//     chart: { type: "column" },
//     title: { text: param },
//     xAxis: { categories: chartCategories },
//     // yAxis: { title: { text: "घर संख्या" } },
//     yAxis: { title: { text: "जनसंख्या" } },
//     series: [
//       {
//         // name: "घर संख्या",
//         name: "जनसंख्या",
//         data: chartValues,
//       },
//     ],
//   };

//   // Handle ward selection from header
//   const handleWardSelect = (selectedWard) => {
//     setWard(selectedWard);
//   };

//   // Auto-search on param/ward/axiosInstance change
//   useEffect(() => {
//     async function autoSearch() {
//       if (!param || !ward || !axiosInstance) return;
//       setLoading(true);
//       try {
//         const records = await fetchAllPages({
//           axiosInstance,
//           postfix: API_POSTFIX,
//           filterKey: "ward_no",
//           filterValue: ward,
//         });
//         console.log("Raw records from API for", API_POSTFIX, ":", records); // NEW LOG - CRITICAL!
//         // Group by param
//         const group = {};
//         records.forEach((rec) => {
//           let val = rec[param];
//           if (val === null || val === undefined || val === "") val = "अन्य";
//           group[val] = (group[val] || 0) + 1;
//         });
//         const data = Object.entries(group).map(([label, value]) => ({
//           label,
//           value,
//         }));
//         console.log("Formatted data for table/charts:", data); // NEW LOG
//         setTableData(data);
//         // Optionally update summary (dummy for now)
//         setSummary({
//           population: records.length,
//           female: 697,
//           male: 748,
//         });
//       } catch (e) {
//         console.error("Error fetching or processing data:", e);
//         setTableData([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     autoSearch();
//   }, [param, ward, axiosInstance]);

//   if (authLoading) {
//     return (
//       <div className="p-8 text-gray-700">
//         Loading website content (fetching API token)...
//       </div>
//     );
//   }
//   if (authError) {
//     return (
//       <div className="p-8 text-red-500">
//         Error initializing API: {authError}
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           onSelectWard={handleWardSelect}
//         />
//         <main className="flex-grow">
//           <div className="container mx-auto p-4">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <HighchartsChart options={pieOptions} title="" height="350px" />
//               <HighchartsChart options={barOptions} title="" height="350px" />
//             </div>

//             {/* Table */}
//             <div className="card bg-white rounded shadow">
//               <div className="card-body p-4">
//                 <div className="overflow-x-auto">
//                   <table className="table table-bordered table-sm w-full border border-gray-300 text-sm hover:table-hover">
//                     <thead className="bg-blue-600">
//                       <tr>
//                         <th className="text-center text-white font-semibold">
//                           {param}
//                         </th>
//                         <th className="text-center text-white font-semibold">
//                           {/* घर संख्या */}
//                           जनसंख्या
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.map((row, idx) => (
//                         <tr
//                           key={idx}
//                           className={
//                             idx % 2 === 0
//                               ? "bg-white hover:bg-blue-50"
//                               : "bg-gray-50 hover:bg-blue-50"
//                           }
//                         >
//                           <td className="text-center align-middle py-1 px-2">
//                             {row.label}
//                           </td>
//                           <td className="text-center align-middle py-1 px-2 font-medium">
//                             {row.value}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                     <tfoot className="bg-gray-200">
//                       <tr>
//                         <td className="text-center font-bold py-1 px-2">
//                           जम्मा
//                         </td>
//                         <td className="text-center font-bold py-1 px-2">
//                           {tableData.reduce((sum, r) => sum + r.value, 0)}
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>
//             </div>
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

// src/components/HouseholdWardSearch.jsx

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../partials/Sidebar.jsx";
// import Header from "../partials/Header.jsx";
// import HighchartsChart from "../components/HighchartsChart.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// // Keep this flexible, as you might switch it
// const API_POSTFIX = "/models/lg_hsurvey_family";
// // // const API_POSTFIX = "/models/lg_hsurvey_land_details";
// // // const API_POSTFIX = "/models/lg_hsurvey_building_details";
// // // const API_POSTFIX = "/models/lg_hsurvey_income_source";
// // // const API_POSTFIX = "/models/lg_hsurvey_expense_source"; //no data visible
// // // const API_POSTFIX = "/models/lg_hsurvey_saving_source";
// // const API_POSTFIX = "/models/lg_hsurvey_loan_source";
// // const API_POSTFIX = "/models/lg_hsurvey_service_details"; //no data visible
// // // const API_POSTFIX = "/models/lg_hsurvey_ag_prod";
// // // const API_POSTFIX = "/models/lg_hsurvey_livestoke_prod"; //no data
// // // const API_POSTFIX = "/models/lg_hsurvey_school_time";
// // // const API_POSTFIX = "/models/lg_hsurvey_disaster_details";
// // // const API_POSTFIX = "/models/lg_hsurvey_workdivision";

// const WARD_OPTIONS = [
//   { value: "0", label: "वडा नं" },
//   ...Array.from({ length: 12 }, (_, i) => ({
//     value: String(i + 1),
//     label: String(i + 1),
//   })),
// ];

// // Utility to fetch all pages (no localStorage caching here now for raw data)
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
//     // Defensive: break if we exceed a reasonable number of pages
//     if (pageCount && skip / pageSize >= pageCount) break;
//     if (total && allRecords.length >= total) break;
//   }
//   return allRecords; // Return all raw records fetched
// }

// export default function HouseholdWardSearch() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { path: param } = useParams();
//   const { axiosInstance, authLoading, authError } = useAuth();
//   const [ward, setWard] = useState("2");
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
//   const [tableData, setTableData] = useState([]);

//   // Chart data (derived from state)
//   const chartCategories = tableData.map((d) => d.label);
//   const chartValues = tableData.map((d) => d.value);

//   const pieOptions = {
//     chart: { type: "pie" },
//     title: { text: param },
//     series: [
//       {
//         name: "जनसंख्या",
//         data: tableData.map((d) => ({ name: d.label, y: d.value })),
//       },
//     ],
//   };

//   const barOptions = {
//     chart: { type: "column" },
//     title: { text: param },
//     xAxis: { categories: chartCategories },
//     yAxis: { title: { text: "जनसंख्या" } },
//     series: [
//       {
//         name: "जनसंख्या",
//         data: chartValues,
//       },
//     ],
//   };

//   // Handle ward selection from header
//   const handleWardSelect = (selectedWard) => {
//     setWard(selectedWard);
//   };

//   // Auto-search on param/ward/axiosInstance change
//   useEffect(() => {
//     async function autoSearch() {
//       if (!param || !ward || !axiosInstance) return;

//       setLoading(true);

//       // Define a unique key for the cached PROCESSED data
//       const processedLocalKey = `${API_POSTFIX}_ward_${ward}_param_${param}_processed`;
//       const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds (adjust as needed)

//       // 1. Try to load from cache
//       const cachedProcessed = localStorage.getItem(processedLocalKey);
//       if (cachedProcessed) {
//         try {
//           const parsed = JSON.parse(cachedProcessed);
//           // Check if data exists and is not expired
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
//             return; // Exit as we used cached data
//           } else {
//             console.log(
//               `Cached data for ${processedLocalKey} expired or invalid. Refetching.`
//             );
//             localStorage.removeItem(processedLocalKey); // Clear stale cache
//           }
//         } catch (e) {
//           console.warn(
//             `Failed to parse cached processed data for ${processedLocalKey}:`,
//             e
//           );
//           localStorage.removeItem(processedLocalKey); // Clear corrupted cache
//         }
//       }

//       // 2. If not in cache or expired, fetch from API
//       try {
//         const records = await fetchAllPages({
//           axiosInstance,
//           postfix: API_POSTFIX,
//           filterKey: "ward_no",
//           filterValue: ward,
//         });

//         console.log(
//           "Raw records from API for",
//           API_POSTFIX,
//           ":",
//           records.length,
//           "records"
//         );

//         // Process / Group the raw records
//         const group = {};
//         records.forEach((rec) => {
//           let val = rec[param];
//           if (!(param in rec)) {
//             console.warn(`Record does not have property '${param}':`, rec);
//           }
//           if (val === null || val === undefined || val === "") val = "अन्य";
//           group[val] = (group[val] || 0) + 1;
//         });

//         const dataForTable = Object.entries(group).map(([label, value]) => ({
//           label,
//           value,
//         }));

//         const newSummary = {
//           population: records.length,
//           female: 697, // Hardcoded, ideally calculated from records
//           male: 748, // Hardcoded, ideally calculated from records
//         };

//         setTableData(dataForTable);
//         setSummary(newSummary);

//         // 3. Cache the newly fetched and processed data with a timestamp
//         try {
//           localStorage.setItem(
//             processedLocalKey,
//             JSON.stringify({
//               tableData: dataForTable,
//               summaryData: newSummary,
//               timestamp: Date.now(), // Add current timestamp
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
//             // You might want to remove specific old keys here,
//             // or just let it fail and only serve fresh data for this large item.
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
//   }, [param, ward, axiosInstance]); // param is now a dependency

//   if (authLoading) {
//     return (
//       <div className="p-8 text-gray-700">
//         Loading website content (fetching API token)...
//       </div>
//     );
//   }
//   if (authError) {
//     return (
//       <div className="p-8 text-red-500">
//         Error initializing API: {authError}
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           onSelectWard={handleWardSelect}
//         />
//         <main className="flex-grow">
//           <div className="container mx-auto p-4">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {loading ? (
//                 <div className="col-span-2 text-center py-8">
//                   Loading charts...
//                 </div>
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

//             {/* Table */}
//             <div className="card bg-white rounded shadow">
//               <div className="card-body p-4">
//                 <div className="overflow-x-auto">
//                   {loading ? (
//                     <div className="text-center py-4">
//                       Loading table data...
//                     </div>
//                   ) : (
//                     <table className="table table-bordered table-sm w-full border border-gray-300 text-sm hover:table-hover">
//                       <thead className="bg-blue-600">
//                         <tr>
//                           <th className="text-center text-white font-semibold">
//                             {param}
//                           </th>
//                           <th className="text-center text-white font-semibold">
//                             जनसंख्या
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
//                               No data available for the selected ward and
//                               parameter.
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
//                                 {row.label}
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
//                   )}
//                 </div>
//               </div>
//             </div>
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
import { useAuth } from "../context/AuthContext.jsx";

// Define a mapping from column parameter to API postfix
// This is crucial for the DetailedReport page to know which model to query
const COLUMN_TO_API_POSTFIX_MAP = {
  // From /models/lg_hsurvey_family
  gender: "/models/lg_hsurvey_family",
  caste_category: "/models/lg_hsurvey_family",
  religion: "/models/lg_hsurvey_family",
  mother_tongue: "/models/lg_hsurvey_family",
  education_detail: "/models/lg_hsurvey_family",
  occupation: "/models/lg_hsurvey_family",
  disease_name: "/models/lg_hsurvey_family",
  // Add other family-related columns if they exist in this model

  // From /models/lg_hsurvey_land_details
  // Area: "/models/lg_hsurvey_land_details",
  land_purpose: "/models/lg_hsurvey_land_details",
  // Add other land details columns

  // From /models/lg_hsurvey_building_details
  texture: "/models/lg_hsurvey_building_details",
  field: "/models/lg_hsurvey_building_details",
  // Add other building details columns

  // From /models/lg_hsurvey_income_source
  Name: "/models/lg_hsurvey_income_source",
  // Add other income source columns

  // From /models/lg_hsurvey_expense_source
  // Name: "/models/lg_hsurvey_expense_source",
  // Add other expense source columns

  // From /models/lg_hsurvey_saving_source
  // Name: "/models/lg_hsurvey_saving_source",
  // Add other saving source columns

  // From /models/lg_hsurvey_inv_source
  // Name:"/models/lg_hsurvey_inv_source",
  // Add other investment source columns"

  // From /models/lg_hsurvey_loan_source
  // Name: "/models/lg_hsurvey_loan_source",
  loan_source: "/models/lg_hsurvey_loan_source",
  // Add other loan source columns

  // From /models/lg_hsurvey_service_details
  // Name: "/models/lg_hsurvey_service_details",
  // Add other service details columns

  // From /models/lg_hsurvey_ag_prod
  // Name: "/models/lg_hsurvey_ag_prod",
  // Add other agricultural production columns

  // From /models/lg_hsurvey_livestoke_prod
  // Name: "/models/lg_hsurvey_livestoke_prod",
  // Add other livestock production columns

  // From /models/lg_hsurvey_school_time
  // school_enrollment_status: "/models/lg_hsurvey_school_time",
  // Add other school time columns

  // From /models/lg_hsurvey_disaster_details
  // Name: "/models/lg_hsurvey_disaster_details",
  // Add other disaster details columns

  // From /models/lg_hsurvey_workdivision
  // Name: "/models/lg_hsurvey_workdivision",
  Description: "/models/lg_hsurvey_workdivision",
  // Add other work division columns

  // From /models/lg_hsurvey_death_count
  disease: "/models/lg_hsurvey_death_count",
  // death_reason: "/models/lg_hsurvey_death_count",
  // Add other work division columns
};

const WARD_OPTIONS = [
  { value: "0", label: "वडा नं" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  })),
];

// Utility to fetch all pages (no localStorage caching here now for raw data)
async function fetchAllPages({
  axiosInstance,
  postfix, // This will now be dynamic
  filterKey,
  filterValue,
}) {
  const pageSize = 100;
  let skip = 0;
  let allRecords = [];
  let total = null;
  let pageCount = 0;

  // Basic validation for postfix
  if (!postfix || typeof postfix !== "string") {
    console.error("Invalid API postfix provided to fetchAllPages:", postfix);
    return [];
  }

  while (true) {
    const url = `${postfix}?$filter=${filterKey} eq '${filterValue}'&$top=${pageSize}&$skip=${skip}`;
    const res = await axiosInstance.get(url, { headers: { id: 0 } });
    const records = res.data.records || [];
    if (total === null) {
      total = res.data["row-count"] || null;
      pageCount = res.data["page-count"] || null;
    }
    allRecords = allRecords.concat(records);
    if (records.length < pageSize) break;
    skip += pageSize;
    // Defensive: break if we exceed a reasonable number of pages
    if (pageCount && skip / pageSize >= pageCount) break;
    if (total && allRecords.length >= total) break;
  }
  return allRecords; // Return all raw records fetched
}

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
  const { path: param } = useParams(); // 'path' will be the column name, e.g., 'family_head_gender'
  const { axiosInstance, authLoading, authError } = useAuth();
  const [ward, setWard] = useState("2");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
  const [tableData, setTableData] = useState([]);

  // Determine the API_POSTFIX dynamically based on the 'param' (column name)
  const dynamicApiPostfix = COLUMN_TO_API_POSTFIX_MAP[param];

  // Chart data (derived from state)
  const chartCategories = tableData.map((d) => d.label);
  const chartValues = tableData.map((d) => d.value);

  const pieOptions = {
    chart: { type: "pie" },
    title: { text: param }, // Title uses the column name
    series: [
      {
        name: "जनसंख्या",
        data: tableData.map((d) => ({ name: d.label, y: d.value })),
      },
    ],
  };

  const barOptions = {
    chart: { type: "column" },
    title: { text: param }, // Title uses the column name
    xAxis: { categories: chartCategories },
    yAxis: { title: { text: "जनसंख्या" } },
    series: [
      {
        name: "जनसंख्या",
        data: chartValues,
      },
    ],
  };

  // Handle ward selection from header
  const handleWardSelect = (selectedWard) => {
    setWard(selectedWard);
  };

  // Auto-search on param/ward/axiosInstance change
  useEffect(() => {
    async function autoSearch() {
      if (!param || !ward || !axiosInstance) return;

      // Check if we have a valid API postfix for the given param
      if (!dynamicApiPostfix) {
        console.error(`No API postfix found for parameter: ${param}`);
        setTableData([]);
        setSummary({ population: 0, female: 0, male: 0 });
        setLoading(false);
        return; // Exit if we don't know which API to call
      }

      setLoading(true);

      // Define a unique key for the cached PROCESSED data
      // Now includes dynamicApiPostfix in the cache key
      const processedLocalKey = `${dynamicApiPostfix}_ward_${ward}_param_${param}_processed`;
      const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds (adjust as needed)

      // 1. Try to load from cache
      const cachedProcessed = localStorage.getItem(processedLocalKey);
      if (cachedProcessed) {
        try {
          const parsed = JSON.parse(cachedProcessed);
          // Check if data exists and is not expired
          if (
            parsed.tableData &&
            parsed.summaryData &&
            parsed.timestamp &&
            Date.now() - parsed.timestamp < CACHE_TTL
          ) {
            setTableData(parsed.tableData);
            setSummary(parsed.summaryData);
            setLoading(false);
            console.log(
              `Loaded from fresh processed cache for ${processedLocalKey}!`
            );
            return; // Exit as we used cached data
          } else {
            console.log(
              `Cached data for ${processedLocalKey} expired or invalid. Refetching.`
            );
            localStorage.removeItem(processedLocalKey); // Clear stale cache
          }
        } catch (e) {
          console.warn(
            `Failed to parse cached processed data for ${processedLocalKey}:`,
            e
          );
          localStorage.removeItem(processedLocalKey); // Clear corrupted cache
        }
      }

      // 2. If not in cache or expired, fetch from API
      try {
        const records = await fetchAllPages({
          axiosInstance,
          postfix: dynamicApiPostfix, // Use the dynamically determined API postfix
          filterKey: "ward_no",
          filterValue: ward,
        });

        console.log(
          "Raw records from API for",
          dynamicApiPostfix, // Log the actual API used
          ":",
          records.length,
          "records"
        );

        // Process / Group the raw records
        const group = {};
        let totalPopulation = 0;
        let femaleCount = 0;
        let maleCount = 0;

        records.forEach((rec) => {
          let val = rec[param];
          if (!(param in rec)) {
            console.warn(`Record does not have property '${param}':`, rec);
            // If the parameter is not in the record, it means this record doesn't contribute
            // to the specific breakdown being requested, but it still contributes to total population.
            // You might choose to include it in 'अन्य' or skip it for this specific grouping.
            // For now, we'll process it to 'अन्य' for grouping.
            val = "अन्य";
          }
          if (val === null || val === undefined || val === "") val = "अन्य";
          group[val] = (group[val] || 0) + 1;
          totalPopulation++; // Increment total population for each record

          // Basic example for gender calculation. This assumes 'family_head_gender' is relevant.
          // You'll need to adapt this based on the actual data structure for gender.
          if (param === "family_head_gender") {
            if (rec.family_head_gender === "Female") {
              // Adjust based on actual API value for female
              femaleCount++;
            } else if (rec.family_head_gender === "Male") {
              // Adjust based on actual API value for male
              maleCount++;
            }
          }
          // If the current param is NOT gender, you might need a separate fetch or a more
          // complex data structure if you want accurate gender counts for *all* detailed reports.
          // For simplicity, if not family_head_gender, female/male will be 0 or hardcoded as before.
        });

        const dataForTable = Object.entries(group).map(([label, value]) => ({
          label,
          value,
        }));

        const newSummary = {
          population: totalPopulation, // Dynamically calculated
          female: femaleCount > 0 ? femaleCount : summary.female, // Use calculated or previous hardcoded if not gender param
          male: maleCount > 0 ? maleCount : summary.male, // Use calculated or previous hardcoded if not gender param
        };

        // If you need actual female/male counts consistently, regardless of `param`,
        // you would need to *always* fetch `lg_hsurvey_family` and count genders from there
        // or have the API provide these aggregates directly. For now, it only counts
        // if `param` is `family_head_gender`.

        setTableData(dataForTable);
        setSummary(newSummary);

        // 3. Cache the newly fetched and processed data with a timestamp
        try {
          localStorage.setItem(
            processedLocalKey,
            JSON.stringify({
              tableData: dataForTable,
              summaryData: newSummary,
              timestamp: Date.now(), // Add current timestamp
            })
          );
          console.log(
            `Fetched and cached processed data for ${processedLocalKey}.`
          );
        } catch (storageError) {
          if (storageError.name === "QuotaExceededError") {
            console.warn(
              `QuotaExceededError for ${processedLocalKey}. Data too large for localStorage.`
            );
            // You might want to remove specific old keys here,
            // or just let it fail and only serve fresh data for this large item.
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
  }, [param, ward, axiosInstance, dynamicApiPostfix]); // Added dynamicApiPostfix as a dependency

  if (authLoading) {
    return (
      <div className="p-8 text-gray-700">
        Loading website content (fetching API token)...
      </div>
    );
  }
  if (authError) {
    return (
      <div className="p-8 text-red-500">
        Error initializing API: {authError}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onSelectWard={handleWardSelect}
        />
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* <SummaryCard
                icon="fas fa-users"
                value={summary.population}
                label="जम्मा जनसंख्या"
              />
              <SummaryCard
                icon="fas fa-user-alt"
                value={summary.female}
                label="महिला"
              />
              <SummaryCard
                icon="fas fa-user-alt"
                value={summary.male}
                label="पुरुष"
              /> */}
            </div>

            {/* Charts */}
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

            {/* Table */}
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
                            {param}
                          </th>
                          <th className="text-center text-white font-semibold">
                            जनसंख्या
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
                              No data available for the selected ward and
                              parameter.
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
                                {row.label}
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
