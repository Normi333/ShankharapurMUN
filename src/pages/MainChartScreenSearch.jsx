// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../partials/Sidebar.jsx"; // Assuming this is your ReportSidebar
// import Header from "../partials/Header.jsx";
// import HighchartsChart from "../components/HighchartsChart.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// // Define a mapping from column parameter to API postfix
// const COLUMN_TO_API_POSTFIX_MAP = {
//   // From /models/lg_hsurvey_family
//   gender: "/models/lg_hsurvey_family",
//   caste_category: "/models/lg_hsurvey_family",
//   religion: "/models/lg_hsurvey_family",
//   mother_tongue: "/models/lg_hsurvey_family",
//   education_detail: "/models/lg_hsurvey_family",
//   occupation: "/models/lg_hsurvey_family",
//   disease_name: "/models/lg_hsurvey_family",

//   // From /models/lg_hsurvey_land_details
//   land_purpose: "/models/lg_hsurvey_land_details",

//   // From /models/lg_hsurvey_building_details
//   texture: "/models/lg_hsurvey_building_details",
//   field: "/models/lg_hsurvey_building_details",

//   // From /models/lg_hsurvey_income_source
//   Name: "/models/lg_hsurvey_income_source",

//   // From /models/lg_hsurvey_workdivision
//   // Name: "/models/lg_hsurvey_workdivision",

//   // From /models/lg_hsurvey_saving_source
//   // Name: "/models/lg_hsurvey_saving_source",

//   // From /models/lg_hsurvey_inv_source
//   // Name: "/models/lg_hsurvey_inv_source",

//   // From /models/lg_hsurvey_expense_source
//   // Name: "/models/lg_hsurvey_expense_source",

//   // From /models/lg_hsurvey_loan_source
//   loan_source: "/models/lg_hsurvey_loan_source",

//   // From /models/lg_hsurvey_workdivision
//   Description: "/models/lg_hsurvey_workdivision",

//   // From /models/lg_hsurvey_death_count
//   disease: "/models/lg_hsurvey_death_count",

//   // From /models/lg_hsurvey
//   cooking_fuel: "/models/lg_hsurvey",
//   stove_type: "/models/lg_hsurvey",
//   electricity_source: "/models/lg_hsurvey",
//   toilet_status: "/models/lg_hsurvey",
//   water_source: "/models/lg_hsurvey",
// };

// // ** NEW: Mapping for English column names to Nepali display names **
// const NEPAL_COLUMN_NAMES = {
//   gender: "लिङ्गका आधारमा विभाजन",
//   caste_category: "जातिको आधारमा वर्गिकरण",
//   religion: "धर्मको आधारमा वर्गिकरण",
//   mother_tongue: "मातृभाषाको आधारमा वर्गिकरण",
//   education_detail: "शैक्षिक विवरण",
//   occupation: "पेशाको आधारमा वर्गिकरण",
//   disease_name: "रोगको नाम",
//   land_purpose: "जग्गाको प्रयोग",
//   texture: "घरको बनावट", // Assuming this is for building texture
//   field: "क्षेत्र", // Assuming this is for building field
//   Name: "आय सम्बन्धी विवरण", // For income/expense/saving/loan/service sources - adjust if 'Name' is generic
//   loan_source: "ऋणको स्रोतको विवरण",
//   Description: "कार्य विवरण", // For work division
//   disease: "रोगको आधारमा वर्गिकरण", // For death count disease
//   cooking_fuel: "खाना पकाउने इन्धनको आधारमा",
//   stove_type: "चुल्होको प्रकारको आधारमा",
//   electricity_source: "बिजुलीको स्रोत आधारमा",
//   toilet_status: "शौचालय स्थिति",
//   water_source: "जलस्रोतहरूको आधारमा",
//   // Add other mappings as needed for any 'param' you expect
//   // Example for a generic "Other" category from your processing:
//   अन्य: "अन्य",
//   Male: "पुरुष", // Added for consistent display in table if 'gender' is the param
//   Female: "महिला", // Added for consistent display in table if 'gender' is the param
// };

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
//   postfix, // This will now be dynamic
//   filterKey,
//   filterValue,
// }) {
//   const pageSize = 100;
//   let skip = 0;
//   let allRecords = [];
//   let total = null;
//   let pageCount = 0;

//   // Basic validation for postfix
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
//     // Defensive: break if we exceed a reasonable number of pages
//     if (pageCount && skip / pageSize >= pageCount) break;
//     if (total && allRecords.length >= total) break;
//   }
//   return allRecords; // Return all raw records fetched
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
//   const { path: param } = useParams(); // 'path' will be the column name, e.g., 'gender'
//   const { axiosInstance, authLoading, authError } = useAuth();
//   const [ward, setWard] = useState("2");
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
//   const [tableData, setTableData] = useState([]);

//   // Determine the API_POSTFIX dynamically based on the 'param' (column name)
//   const dynamicApiPostfix = COLUMN_TO_API_POSTFIX_MAP[param];
//   // ** NEW: Get Nepali name for the current param **
//   const nepalParamName = NEPAL_COLUMN_NAMES[param] || param; // Fallback to param if no Nepali name found

//   // Determine chart and table title based on dynamicApiPostfix
//   const chartAndTableTitle =
//     dynamicApiPostfix === "/models/lg_hsurvey" ||
//     dynamicApiPostfix === "/models/lg_hsurvey_family"
//       ? "जनसंख्या"
//       : "घरधुरी";

//   // Chart data (derived from state)
//   const chartCategories = tableData.map((d) => d.label);
//   const chartValues = tableData.map((d) => d.value);

//   const pieOptions = {
//     chart: { type: "pie" },
//     title: { text: `${nepalParamName}` }, // ** UPDATED: Use Nepali name for title and dynamic title **
//     series: [
//       {
//         name: chartAndTableTitle,
//         data: tableData.map((d) => ({ name: d.label, y: d.value })),
//       },
//     ],
//   };

//   const barOptions = {
//     chart: { type: "column" },
//     title: { text: `${nepalParamName}` }, // ** UPDATED: Use Nepali name for title and dynamic title **
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

//   // Handle ward selection from header
//   const handleWardSelect = (selectedWard) => {
//     setWard(selectedWard);
//   };

//   // Auto-search on param/ward/axiosInstance change
//   useEffect(() => {
//     async function autoSearch() {
//       if (!param || !ward || !axiosInstance) return;

//       // Check if we have a valid API postfix for the given param
//       if (!dynamicApiPostfix) {
//         console.error(`No API postfix found for parameter: ${param}`);
//         setTableData([]);
//         setSummary({ population: 0, female: 0, male: 0 });
//         setLoading(false);
//         return; // Exit if we don't know which API to call
//       }

//       setLoading(true);

//       // Define a unique key for the cached PROCESSED data
//       const processedLocalKey = `${dynamicApiPostfix}_ward_${ward}_param_${param}_processed`;
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
//           postfix: dynamicApiPostfix, // Use the dynamically determined API postfix
//           filterKey: "ward_no",
//           filterValue: ward,
//         });

//         console.log(
//           "Raw records from API for",
//           dynamicApiPostfix, // Log the actual API used
//           ":",
//           records.length,
//           "records"
//         );

//         // Process / Group the raw records
//         const group = {};
//         let totalPopulation = 0;
//         let femaleCount = 0;
//         let maleCount = 0;

//         records.forEach((rec) => {
//           let val = rec[param];
//           if (!(param in rec)) {
//             console.warn(`Record does not have property '${param}':`, rec);
//             val = "अन्य"; // Default to 'अन्य' if column not found in record
//           }
//           if (val === null || val === undefined || val === "") val = "अन्य";
//           group[val] = (group[val] || 0) + 1;
//           totalPopulation++; // Increment total population for each record

//           // Basic example for gender calculation. This assumes 'gender' is present and consistent.
//           // This part might need refinement based on the exact field name for gender across models.
//           // For now, it specifically looks for 'gender' in the record for female/male counts.
//           if (rec.gender) {
//             // Check if a 'gender' field exists in the record
//             if (rec.gender === "Female" || rec.gender === "महिला") {
//               femaleCount++;
//             } else if (rec.gender === "Male" || rec.gender === "पुरुष") {
//               maleCount++;
//             }
//           }
//         });

//         const dataForTable = Object.entries(group).map(([label, value]) => ({
//           label: NEPAL_COLUMN_NAMES[label] || label, // ** UPDATED: Map label to Nepali if it's a known value like 'अन्य' or 'Male'/'Female' **
//           value,
//         }));

//         // Sort data alphabetically by label
//         dataForTable.sort((a, b) =>
//           a.label.localeCompare(b.label, "ne", { sensitivity: "base" })
//         );

//         const newSummary = {
//           population: totalPopulation, // Dynamically calculated
//           female: femaleCount, // Calculated based on 'gender' field in records
//           male: maleCount, // Calculated based on 'gender' field in records
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
//   }, [param, ward, axiosInstance, dynamicApiPostfix]); // Added dynamicApiPostfix as a dependency

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

//             {/* Charts */}
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

//             {/* Table */}
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
//                             {/* ** UPDATED: Use Nepali name here ** */}
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
//                                 {/* ** IMPORTANT: Map the 'label' from API to Nepali if needed ** */}
//                                 {/* Example: If your API returns 'Male', 'Female', 'Other',
//                                   you might want to map them here as well.
//                                   For now, it assumes the `label` (e.g., "उपरोक्त", "अन्य")
//                                   is either already in Nepali or can be mapped if known.
//                                 */}
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
import Sidebar from "../partials/Sidebar.jsx"; // Assuming this is your ReportSidebar
import Header from "../partials/Header.jsx";
import HighchartsChart from "../components/HighchartsChart.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Define a mapping from a specific report key to API postfix and column name
export const COLUMN_TO_API_POSTFIX_MAP = {
  // From /models/lg_hsurvey_family
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

// ** NEW: Mapping for English column names/report keys to Nepali display names **
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

  // Specific 'Name' categories (6 of them)
  "income-source-name": "आय सम्बन्धी विवरण",
  "work-division-name": "कार्य विभाजन", // Explicitly for workdivision's 'Name'
  "saving-source-name": "बचत सम्बन्धी विवरण",
  "inv-source-name": "लगानी सम्बन्धी विवरण ",
  "expense-source-name": "खर्च सम्बन्धी विवरण",
  "service-source-name": "सेवाको स्रोत", // Added this one for 'service_source' Name
  "loan-source-name": "ऋणको प्रयोजन ",

  // Other specific
  "loan-source": "ऋणको स्रोतको विवरण",
  "work-division-description": "कार्य विवरण", // For work division's 'Description'
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
  // 'path' will now be your unique report key, e.g., 'income-source-name'
  const { path: reportKey } = useParams();

  const { axiosInstance, authLoading, authError } = useAuth();
  const [ward, setWard] = useState("2");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
  const [tableData, setTableData] = useState([]);

  // ** IMPORTANT CHANGE HERE: Get both API postfix and column name from the map **
  const reportConfig = COLUMN_TO_API_POSTFIX_MAP[reportKey];
  const dynamicApiPostfix = reportConfig ? reportConfig.api : null;
  const param = reportConfig ? reportConfig.column : null; // This will be the actual column name like "Name" or "gender"

  // Get Nepali name for the current report key (e.g., 'income-source-name' will map to 'आय स्रोत')
  const nepalParamName = NEPAL_COLUMN_NAMES[reportKey] || reportKey; // Fallback to reportKey if no Nepali name found

  // Determine chart and table title based on dynamicApiPostfix
  const chartAndTableTitle =
    dynamicApiPostfix === "/models/lg_hsurvey" ||
    dynamicApiPostfix === "/models/lg_hsurvey_family"
      ? "जनसंख्या"
      : "घरधुरी";

  // Chart data (derived from state)
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

  // Handle ward selection from header
  const handleWardSelect = (selectedWard) => {
    setWard(selectedWard);
  };

  // Auto-search on reportKey/ward/axiosInstance change
  useEffect(() => {
    async function autoSearch() {
      // Check for both reportKey and the extracted param and dynamicApiPostfix
      if (
        !reportKey ||
        !ward ||
        !axiosInstance ||
        !param ||
        !dynamicApiPostfix
      ) {
        console.warn(
          `Missing necessary parameters for autoSearch. reportKey: ${reportKey}, param: ${param}, dynamicApiPostfix: ${dynamicApiPostfix}`
        );
        setTableData([]);
        setSummary({ population: 0, female: 0, male: 0 });
        setLoading(false);
        return;
      }

      setLoading(true);

      // Use reportKey for the cache key to ensure uniqueness
      const processedLocalKey = `${reportKey}_ward_${ward}_processed`;
      const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds (adjust as needed)

      // 1. Try to load from cache
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
          // Use the 'param' variable, which holds the actual column name (e.g., "Name", "gender")
          let val = rec[param];
          if (!(param in rec)) {
            console.warn(
              `Record does not have property '${param}' for report key '${reportKey}':`,
              rec
            );
            val = "अन्य"; // Default to 'अन्य' if column not found in record
          }
          if (val === null || val === undefined || val === "") val = "अन्य";
          group[val] = (group[val] || 0) + 1;
          totalPopulation++; // Increment total population for each record

          // Basic example for gender calculation. This assumes 'gender' is present and consistent.
          // This part might need refinement based on the exact field name for gender across models.
          // For now, it specifically looks for 'gender' in the record for female/male counts.
          if (rec.gender) {
            // Check if a 'gender' field exists in the record
            if (rec.gender === "Female" || rec.gender === "महिला") {
              femaleCount++;
            } else if (rec.gender === "Male" || rec.gender === "पुरुष") {
              maleCount++;
            }
          }
        });

        const dataForTable = Object.entries(group).map(([label, value]) => ({
          // Map label to Nepali if it's a known value like 'अन्य' or 'Male'/'Female'
          label: NEPAL_COLUMN_NAMES[label] || label,
          value,
        }));

        // Sort data alphabetically by label
        dataForTable.sort((a, b) =>
          a.label.localeCompare(b.label, "ne", { sensitivity: "base" })
        );

        const newSummary = {
          population: totalPopulation, // Dynamically calculated
          female: femaleCount, // Calculated based on 'gender' field in records
          male: maleCount, // Calculated based on 'gender' field in records
        };

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
    // The dependency array now includes reportKey, and param/dynamicApiPostfix are derived from it.
    // This ensures useEffect re-runs when the reportKey changes.
    autoSearch();
  }, [reportKey, ward, axiosInstance, param, dynamicApiPostfix]);

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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onSelectWard={handleWardSelect}
        />
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            {/* Summary Cards (Commented out as per original provided code) */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SummaryCard
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
              />
            </div> */}

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
                            {nepalParamName}{" "}
                            {/* Uses the Nepali name derived from the reportKey */}
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
                                {/* This maps labels like 'Male', 'Female', 'अन्य' to Nepali */}
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
