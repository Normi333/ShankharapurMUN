// import React, { useEffect, useState } from "react";
// import Card from "../charts/card.jsx";
// import GenericChartPreview from "../charts/GenericChartPreview.jsx";
// import { useAuth } from "../context/AuthContext.jsx";
// import axios from "axios";

// // Define the dashboard IDs you want to fetch and display
// const SINGLE_VALUE_METRIC_ID = "1000000"; // For the single 'Total Households' value
// const MULTI_ITEM_METRIC_ID = "1000001"; // For the card with multiple key-value pairs (Family/Population Details)
// const PIE_CHART_METRIC_ID = "1000002"; // For the chart data (Religion-wise Population - Pie Chart)
// const RING_CHART_METRIC_ID = "1000003"; // For the chart data (Mother Tongue Population - Ring/Doughnut Chart)
// const LINE_CHART_METRIC_ID = "1000004"; // For the chart data (Ethnicity-wise Population - Line Chart)
// const STACK_BAR_CHART_ID = "1000005"; // For the Stack Bar Graph (वडागत जनसंख्या)
// const WARD_BAR_CHART_ID = "1000006"; // For the Ward-wise Bar Chart
// const MULTI_ITEM_METRIC_ID_2 = "1000007"; // For the 'घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण'
// const MULTI_ITEM_METRIC_ID_3 = "1000008"; // For the 'व्यक्तिगत घटना विवरण'

// const ChartGrid = () => {
//   const {
//     token: authToken,
//     axiosInstance,
//     authLoading: isAuthLoading,
//     authError: authErrorFromContext,
//   } = useAuth();

//   const [loadingDashboardData, setLoadingDashboardData] = useState(true);
//   const [singleValueMetric, setSingleValueMetric] = useState(null);
//   const [multiItemMetric, setMultiItemMetric] = useState(null);
//   const [pieChartMetric, setPieChartMetric] = useState(null);
//   const [ringChartMetric, setRingChartMetric] = useState(null);
//   const [lineChartMetric, setLineChartMetric] = useState(null);
//   const [stackBarChartMetric, setStackBarChartMetric] = useState(null);
//   const [wardBarChartMetric, setWardBarChartMetric] = useState(null);
//   const [multiItemMetric2, setMultiItemMetric2] = useState(null);
//   const [multiItemMetric3, setMultiItemMetric3] = useState(null);
//   const [error, setError] = useState(null);

//   // Function to safely parse the non-standard JSON string
//   const parseNonStandardJson = (jsonString) => {
//     let cleanedString = jsonString;
//     try {
//       if (typeof jsonString !== "string") {
//         console.warn(
//           "Input to parseNonStandardJson is not a string:",
//           jsonString
//         );
//         return null;
//       }

//       cleanedString = jsonString.trim();
//       cleanedString = cleanedString.replace(/[\n\t\r]+/g, "");
//       cleanedString = cleanedString.replace(/'/g, '"');
//       cleanedString = cleanedString.replace(
//         /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
//         '$1"$2":'
//       );
//       cleanedString = cleanedString.replace(/,\s*([}\]])/g, "$1"); // Remove trailing commas

//       const parsed = JSON.parse(cleanedString);
//       return parsed;
//     } catch (e) {
//       console.error(
//         "Failed to parse non-standard JSON:",
//         e,
//         "Original:",
//         jsonString,
//         "Attempted Cleaned:",
//         cleanedString
//       );
//       return null;
//     }
//   };

//   useEffect(() => {
//     const fetchAllDashboardData = async () => {
//       if (isAuthLoading) {
//         setLoadingDashboardData(true);
//         return;
//       }

//       if (authErrorFromContext) {
//         setError(
//           `Authentication Error: ${authErrorFromContext}. Cannot fetch dashboard data.`
//         );
//         setLoadingDashboardData(false);
//         return;
//       }

//       if (!authToken) {
//         setError("Not authenticated. Please ensure you are logged in.");
//         setLoadingDashboardData(false);
//         return;
//       }

//       setError(null);

//       try {
//         setLoadingDashboardData(true);
//         let fetchedSingleValueMetric = null;
//         let fetchedMultiItemMetric = null;
//         let fetchedPieChartMetric = null;
//         let fetchedRingChartMetric = null;
//         let fetchedLineChartMetric = null;
//         let fetchedStackBarChartMetric = null;
//         let fetchedWardBarChartMetric = null;
//         let fetchedMultiItemMetric2 = null;
//         let fetchedMultiItemMetric3 = null;

//         const allIdsToFetch = [
//           SINGLE_VALUE_METRIC_ID,
//           MULTI_ITEM_METRIC_ID,
//           PIE_CHART_METRIC_ID,
//           RING_CHART_METRIC_ID,
//           LINE_CHART_METRIC_ID,
//           STACK_BAR_CHART_ID,
//           WARD_BAR_CHART_ID,
//           MULTI_ITEM_METRIC_ID_2,
//           MULTI_ITEM_METRIC_ID_3,
//         ];

//         const fetchPromises = allIdsToFetch.map(async (id) => {
//           try {
//             const API_DASHBOARD_URL = `/models/public_dashboard/${id}`;
//             const response = await axiosInstance.get(API_DASHBOARD_URL);
//             const rawData = response.data;

//             if (rawData && typeof rawData.dashboard_json === "string") {
//               const parsed = parseNonStandardJson(rawData.dashboard_json);

//               if (!Array.isArray(parsed) || parsed.length === 0) {
//                 console.warn(
//                   `Parsed data for ID ${id} is empty or invalid:`,
//                   parsed
//                 );
//                 return;
//               }

//               if (id === SINGLE_VALUE_METRIC_ID) {
//                 fetchedSingleValueMetric = { id: id, ...parsed[0] };
//               } else if (id === MULTI_ITEM_METRIC_ID) {
//                 fetchedMultiItemMetric = { id: id, data: parsed };
//               } else if (id === PIE_CHART_METRIC_ID) {
//                 fetchedPieChartMetric = {
//                   id: id,
//                   name: rawData.Name,
//                   type: rawData.dashboard_type,
//                   data: parsed,
//                 };
//               } else if (id === RING_CHART_METRIC_ID) {
//                 fetchedRingChartMetric = {
//                   id: id,
//                   name: rawData.Name,
//                   type: rawData.dashboard_type,
//                   data: parsed,
//                 };
//               } else if (id === LINE_CHART_METRIC_ID) {
//                 fetchedLineChartMetric = {
//                   id: id,
//                   name: rawData.Name,
//                   type: rawData.dashboard_type,
//                   data: parsed,
//                 };
//               } else if (id === STACK_BAR_CHART_ID) {
//                 let parsedWardData = null;
//                 if (rawData && typeof rawData.dashboard_json2 === "string") {
//                   parsedWardData = parseNonStandardJson(
//                     rawData.dashboard_json2
//                   );
//                 }
//                 fetchedStackBarChartMetric = {
//                   id: id,
//                   name: rawData.Name,
//                   type: rawData.dashboard_type,
//                   data: parsed,
//                   wardData: parsedWardData,
//                 };
//               } else if (id === WARD_BAR_CHART_ID) {
//                 fetchedWardBarChartMetric = {
//                   id: id,
//                   name: rawData.Name,
//                   type: rawData.dashboard_type,
//                   data: parsed,
//                 };
//               } else if (id === MULTI_ITEM_METRIC_ID_2) {
//                 fetchedMultiItemMetric2 = {
//                   id: id,
//                   name: rawData.Name,
//                   data: parsed,
//                 };
//               } else if (id === MULTI_ITEM_METRIC_ID_3) {
//                 fetchedMultiItemMetric3 = {
//                   id: id,
//                   name: rawData.Name,
//                   data: parsed,
//                 };
//               }
//             } else {
//               console.warn(
//                 `dashboard_json not found or not a string for ID ${id}. Raw data:`,
//                 rawData
//               );
//             }
//           } catch (err) {
//             console.error(`Error fetching dashboard data for ID ${id}:`, err);
//             // Only set a generic error if no specific error message is desired for the user
//             if (!axios.isCancel(err)) {
//               setError(
//                 (prev) =>
//                   prev
//                     ? `${prev}\nआईडी ${id} को मेट्रिक लोड गर्न असफल भयो।` // Append if other errors exist
//                     : `आईडी ${id} को मेट्रिक लोड गर्न असफल भयो।` // Set if first error
//               );
//             }
//           }
//         });

//         await Promise.all(fetchPromises);
//         setSingleValueMetric(fetchedSingleValueMetric);
//         setMultiItemMetric(fetchedMultiItemMetric);
//         setPieChartMetric(fetchedPieChartMetric);
//         setRingChartMetric(fetchedRingChartMetric);
//         setLineChartMetric(fetchedLineChartMetric);
//         setStackBarChartMetric(fetchedStackBarChartMetric);
//         setWardBarChartMetric(fetchedWardBarChartMetric);
//         setMultiItemMetric2(fetchedMultiItemMetric2);
//         setMultiItemMetric3(fetchedMultiItemMetric3);
//       } catch (overallErr) {
//         console.error("Overall error during dashboard data fetch:", overallErr);
//         setError(`ड्यासबोर्ड डाटा ल्याउनमा अप्रत्याशित त्रुटि भयो।`); // More generic Nepali error for overall fetch
//       } finally {
//         setLoadingDashboardData(false);
//       }
//     };

//     fetchAllDashboardData();
//   }, [authToken, axiosInstance, isAuthLoading, authErrorFromContext]);

//   const overallLoading = isAuthLoading || loadingDashboardData;

//   return (
//     <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 p-4">
//       {overallLoading && (
//         <p className="text-center py-4 text-gray-600">
//           ड्यासबोर्ड मेट्रिक्स लोड हुँदैछ... {/* Translated loading message */}
//         </p>
//       )}
//       {error && (
//         <p className="text-red-500 text-center py-4">
//           त्रुटि: {error || "डाटा उपलब्ध छैन"} {/* Improved error display */}
//         </p>
//       )}

//       {/* Card for the single value metric (e.g., ID 1000000) */}
//       {!overallLoading && !error && singleValueMetric && (
//         <Card title={singleValueMetric.name} loading={false}>
//           <div className="text-4xl font-bold text-center py-8">
//             {singleValueMetric.value}
//           </div>
//           <p className="text-center text-gray-600">Total Households</p>
//         </Card>
//       )}

//       {/* Card for the first multi-item dashboard (e.g., ID 1000001) */}
//       {!overallLoading && !error && multiItemMetric && (
//         <Card title="परिवार तथा जनसंख्या विवरण" loading={false}>
//           <div className="space-y-2 text-base">
//             {multiItemMetric.data.map((item, idx) => (
//               <div
//                 key={item.name || idx}
//                 className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
//               >
//                 <span className="font-semibold text-gray-700">
//                   {item.name}:
//                 </span>
//                 <span className="text-blue-700">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Card for the second multi-item dashboard (e.g., ID 1000007) */}
//       {!overallLoading && !error && multiItemMetric2 && (
//         <Card title={multiItemMetric2.name} loading={false}>
//           <div className="space-y-2 text-base">
//             {multiItemMetric2.data.map((item, idx) => (
//               <div
//                 key={item.name || idx}
//                 className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
//               >
//                 <span className="font-semibold text-gray-700">
//                   {item.name}:
//                 </span>
//                 <span className="text-blue-700">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Card for the third multi-item dashboard (e.g., ID 1000008) */}
//       {!overallLoading && !error && multiItemMetric3 && (
//         <Card title={multiItemMetric3.name} loading={false}>
//           <div className="space-y-2 text-base">
//             {multiItemMetric3.data.map((item, idx) => (
//               <div
//                 key={item.name || idx}
//                 className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
//               >
//                 <span className="font-semibold text-gray-700">
//                   {item.name}:
//                 </span>
//                 <span className="text-blue-700">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Card for the Pie Chart dashboard (e.g., ID 1000002) */}
//       {!overallLoading && !error && pieChartMetric && (
//         <Card title={pieChartMetric.name || "चार्ट डेटा"} loading={false}>
//           <GenericChartPreview
//             type={
//               pieChartMetric.type?.toLowerCase() === "pie chart" ? "pie" : "bar"
//             }
//             labelKey="name"
//             valueKey="value"
//             chartLabel={pieChartMetric.name || "जनसंख्या"}
//             title={pieChartMetric.name || "जनसंख्या विवरण"}
//             data={pieChartMetric.data}
//           />
//         </Card>
//       )}

//       {/* Card for the Ring Chart dashboard (e.g., ID 1000003) */}
//       {!overallLoading && !error && ringChartMetric && (
//         <Card title={ringChartMetric.name || "चार्ट डेटा"} loading={false}>
//           <GenericChartPreview
//             type={
//               ringChartMetric.type?.toLowerCase() === "ring chart"
//                 ? "doughnut"
//                 : "bar"
//             }
//             labelKey="name"
//             valueKey="value"
//             chartLabel={ringChartMetric.name || "जनसंख्या"}
//             title={ringChartMetric.name || "जनसंख्या विवरण"}
//             data={ringChartMetric.data}
//           />
//         </Card>
//       )}

//       {/* Card for the Line Chart dashboard (e.g., ID 1000004) */}
//       {!overallLoading && !error && lineChartMetric && (
//         <Card
//           title={lineChartMetric.name || "चार्ट डेटा"}
//           loading={false}
//           className="col-span-2" // Example: make line chart span 2 columns
//         >
//           <GenericChartPreview
//             type={
//               lineChartMetric.type?.toLowerCase() === "line chart"
//                 ? "line"
//                 : "bar"
//             }
//             labelKey="name"
//             valueKey="value"
//             chartLabel={lineChartMetric.name || "जनसंख्या"}
//             title={lineChartMetric.name || "जनसंख्या विवरण"}
//             data={lineChartMetric.data}
//           />
//         </Card>
//       )}

//       {/* Card for the Stack Bar Chart dashboard (e.g., ID 1000005) */}
//       {!overallLoading && !error && stackBarChartMetric && (
//         <Card
//           title={stackBarChartMetric.name || "वडागत जनसंख्या"}
//           loading={false}
//           className="col-span-full" // Example: make stack bar chart span full width
//         >
//           <GenericChartPreview
//             type={
//               stackBarChartMetric.type?.toLowerCase() === "stack bar graph"
//                 ? "stackbar" // New type for GenericChartPreview to handle
//                 : "bar"
//             }
//             labelKey="name"
//             valueKey="value"
//             chartLabel={stackBarChartMetric.name || "जनसंख्या"}
//             title={stackBarChartMetric.name || "जनसंख्या विवरण"}
//             data={stackBarChartMetric.data}
//             wardData={stackBarChartMetric.wardData} // Pass the parsed ward data
//           />
//         </Card>
//       )}

//       {/* Card for the Ward-wise Bar Chart (e.g., ID 1000006) */}
//       {!overallLoading && !error && wardBarChartMetric && (
//         <Card
//           title={wardBarChartMetric.name || "वडा स्तरीय जनसंख्या"}
//           loading={false}
//         >
//           <GenericChartPreview
//             type={
//               wardBarChartMetric.type?.toLowerCase() === "bar chart"
//                 ? "bar"
//                 : "bar"
//             }
//             labelKey="name"
//             valueKey="value"
//             chartLabel={wardBarChartMetric.name || "जनसंख्या"}
//             title={wardBarChartMetric.name || "जनसंख्या विवरण"}
//             data={wardBarChartMetric.data}
//           />
//         </Card>
//       )}

//       {/* Fallback if no dashboard metrics can be displayed after loading */}
//       {!overallLoading &&
//         !error &&
//         !singleValueMetric &&
//         !multiItemMetric &&
//         !multiItemMetric2 &&
//         !multiItemMetric3 &&
//         !pieChartMetric &&
//         !ringChartMetric &&
//         !lineChartMetric &&
//         !stackBarChartMetric &&
//         !wardBarChartMetric && (
//           <p className="text-center py-4 text-gray-500">
//             डाटा उपलब्ध छैन। {/* Translated fallback message */}
//           </p>
//         )}
//     </div>
//   );
// };

// export default ChartGrid;

// DONT DELETE THE ABOVE CODE ITS NECESSARY

import React, { useEffect, useState } from "react";
import Card from "../charts/card.jsx";
import GenericChartPreview from "../charts/GenericChartPreview.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

// Define the dashboard IDs you want to fetch and display
const SINGLE_VALUE_METRIC_ID = "1000000"; // For the single 'Total Households' value
const MULTI_ITEM_METRIC_ID = "1000001"; // For the card with multiple key-value pairs (Family/Population Details)
const PIE_CHART_METRIC_ID = "1000002"; // For the chart data (Religion-wise Population - Pie Chart)
const RING_CHART_METRIC_ID = "1000003"; // For the chart data (Mother Tongue Population - Ring/Doughnut Chart)
const LINE_CHART_METRIC_ID = "1000004"; // For the chart data (Ethnicity-wise Population - Line Chart)
const STACK_BAR_CHART_ID = "1000005"; // For the Stack Bar Graph (वडागत जनसंख्या)
const WARD_BAR_CHART_ID = "1000006"; // For the Ward-wise Bar Chart
const MULTI_ITEM_METRIC_ID_2 = "1000007"; // For the 'घट्ट,मिल तथा संकलन तथा प्रसोधन केन्द्र सम्बन्धी विवरण'
const MULTI_ITEM_METRIC_ID_3 = "1000008"; // For the 'व्यक्तिगत घटना विवरण'

const ChartGrid = () => {
  const {
    token: authToken,
    axiosInstance,
    authLoading: isAuthLoading,
    authError: authErrorFromContext,
  } = useAuth();

  const [loadingDashboardData, setLoadingDashboardData] = useState(true);
  const [singleValueMetric, setSingleValueMetric] = useState(null);
  const [multiItemMetric, setMultiItemMetric] = useState(null);
  const [pieChartMetric, setPieChartMetric] = useState(null);
  const [ringChartMetric, setRingChartMetric] = useState(null);
  const [lineChartMetric, setLineChartMetric] = useState(null);
  const [stackBarChartMetric, setStackBarChartMetric] = useState(null);
  const [wardBarChartMetric, setWardBarChartMetric] = useState(null);
  const [multiItemMetric2, setMultiItemMetric2] = useState(null);
  const [multiItemMetric3, setMultiItemMetric3] = useState(null);
  const [error, setError] = useState(null);

  // Function to safely parse the non-standard JSON string
  const parseNonStandardJson = (jsonString) => {
    let cleanedString = jsonString;
    try {
      if (typeof jsonString !== "string") {
        console.warn(
          "Input to parseNonStandardJson is not a string:",
          jsonString
        );
        return null;
      }

      cleanedString = jsonString.trim();
      cleanedString = cleanedString.replace(/[\n\t\r]+/g, "");
      cleanedString = cleanedString.replace(/'/g, '"');
      cleanedString = cleanedString.replace(
        /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
        '$1"$2":'
      );
      cleanedString = cleanedString.replace(/,\s*([}\]])/g, "$1"); // Remove trailing commas

      const parsed = JSON.parse(cleanedString);
      return parsed;
    } catch (e) {
      console.error(
        "Failed to parse non-standard JSON:",
        e,
        "Original:",
        jsonString,
        "Attempted Cleaned:",
        cleanedString
      );
      return null;
    }
  };

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      if (isAuthLoading) {
        setLoadingDashboardData(true);
        return;
      }

      if (authErrorFromContext) {
        // Use the new Nepali message for authentication errors too, for consistency
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R)");
        setLoadingDashboardData(false);
        return;
      }

      if (!authToken) {
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R)");
        setLoadingDashboardData(false);
        return;
      }

      setError(null);

      try {
        setLoadingDashboardData(true);
        let fetchedSingleValueMetric = null;
        let fetchedMultiItemMetric = null;
        let fetchedPieChartMetric = null;
        let fetchedRingChartMetric = null;
        let fetchedLineChartMetric = null;
        let fetchedStackBarChartMetric = null;
        let fetchedWardBarChartMetric = null;
        let fetchedMultiItemMetric2 = null;
        let fetchedMultiItemMetric3 = null;

        const allIdsToFetch = [
          SINGLE_VALUE_METRIC_ID,
          MULTI_ITEM_METRIC_ID,
          PIE_CHART_METRIC_ID,
          RING_CHART_METRIC_ID,
          LINE_CHART_METRIC_ID,
          STACK_BAR_CHART_ID,
          WARD_BAR_CHART_ID,
          MULTI_ITEM_METRIC_ID_2,
          MULTI_ITEM_METRIC_ID_3,
        ];

        const fetchPromises = allIdsToFetch.map(async (id) => {
          try {
            const API_DASHBOARD_URL = `/models/public_dashboard/${id}`;
            const response = await axiosInstance.get(API_DASHBOARD_URL);
            const rawData = response.data;

            if (rawData && typeof rawData.dashboard_json === "string") {
              const parsed = parseNonStandardJson(rawData.dashboard_json);

              if (!Array.isArray(parsed) || parsed.length === 0) {
                console.warn(
                  `Parsed data for ID ${id} is empty or invalid:`,
                  parsed
                );
                return;
              }

              if (id === SINGLE_VALUE_METRIC_ID) {
                fetchedSingleValueMetric = { id: id, ...parsed[0] };
              } else if (id === MULTI_ITEM_METRIC_ID) {
                fetchedMultiItemMetric = { id: id, data: parsed };
              } else if (id === PIE_CHART_METRIC_ID) {
                fetchedPieChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed,
                };
              } else if (id === RING_CHART_METRIC_ID) {
                fetchedRingChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed,
                };
              } else if (id === LINE_CHART_METRIC_ID) {
                fetchedLineChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed,
                };
              } else if (id === STACK_BAR_CHART_ID) {
                let parsedWardData = null;
                if (rawData && typeof rawData.dashboard_json2 === "string") {
                  parsedWardData = parseNonStandardJson(
                    rawData.dashboard_json2
                  );
                }
                fetchedStackBarChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed,
                  wardData: parsedWardData,
                };
              } else if (id === WARD_BAR_CHART_ID) {
                fetchedWardBarChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed,
                };
              } else if (id === MULTI_ITEM_METRIC_ID_2) {
                fetchedMultiItemMetric2 = {
                  id: id,
                  name: rawData.Name,
                  data: parsed,
                };
              } else if (id === MULTI_ITEM_METRIC_ID_3) {
                fetchedMultiItemMetric3 = {
                  id: id,
                  name: rawData.Name,
                  data: parsed,
                };
              }
            } else {
              console.warn(
                `dashboard_json not found or not a string for ID ${id}. Raw data:`,
                rawData
              );
            }
          } catch (err) {
            console.error(`Error fetching dashboard data for ID ${id}:`, err);
            if (!axios.isCancel(err)) {
              // Set the specific "Please Refresh the Page" error message
              setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R)");
            }
          }
        });

        await Promise.all(fetchPromises);
        setSingleValueMetric(fetchedSingleValueMetric);
        setMultiItemMetric(fetchedMultiItemMetric);
        setPieChartMetric(fetchedPieChartMetric);
        setRingChartMetric(fetchedRingChartMetric);
        setLineChartMetric(fetchedLineChartMetric);
        setStackBarChartMetric(fetchedStackBarChartMetric);
        setWardBarChartMetric(fetchedWardBarChartMetric);
        setMultiItemMetric2(fetchedMultiItemMetric2);
        setMultiItemMetric3(fetchedMultiItemMetric3);
      } catch (overallErr) {
        console.error("Overall error during dashboard data fetch:", overallErr);
        // Set the specific "Please Refresh the Page" error message for overall errors too
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R)");
      } finally {
        setLoadingDashboardData(false);
      }
    };

    fetchAllDashboardData();
  }, [authToken, axiosInstance, isAuthLoading, authErrorFromContext]);

  const overallLoading = isAuthLoading || loadingDashboardData;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 p-4">
      {overallLoading && (
        <p className="text-center py-4 text-gray-600">
          ड्यासबोर्ड मेट्रिक्स लोड हुँदैछ... {/* Translated loading message */}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center py-4">
          त्रुटि: {error}{" "}
          {/* Error will now contain the specific Nepali message */}
        </p>
      )}

      {/* Card for the single value metric (e.g., ID 1000000) */}
      {!overallLoading && !error && singleValueMetric && (
        <Card title={singleValueMetric.name} loading={false}>
          <div className="text-4xl font-bold text-center py-8">
            {singleValueMetric.value}
          </div>
          <p className="text-center text-gray-600">Total Households</p>
        </Card>
      )}

      {/* Card for the first multi-item dashboard (e.g., ID 1000001) */}
      {!overallLoading && !error && multiItemMetric && (
        <Card title="परिवार तथा जनसंख्या विवरण" loading={false}>
          <div className="space-y-2 text-base">
            {multiItemMetric.data.map((item, idx) => (
              <div
                key={item.name || idx}
                className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
              >
                <span className="font-semibold text-gray-700">
                  {item.name}:
                </span>
                <span className="text-blue-700">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Card for the second multi-item dashboard (e.g., ID 1000007) */}
      {!overallLoading && !error && multiItemMetric2 && (
        <Card title={multiItemMetric2.name} loading={false}>
          <div className="space-y-2 text-base">
            {multiItemMetric2.data.map((item, idx) => (
              <div
                key={item.name || idx}
                className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
              >
                <span className="font-semibold text-gray-700">
                  {item.name}:
                </span>
                <span className="text-blue-700">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Card for the third multi-item dashboard (e.g., ID 1000008) */}
      {!overallLoading && !error && multiItemMetric3 && (
        <Card title={multiItemMetric3.name} loading={false}>
          <div className="space-y-2 text-base">
            {multiItemMetric3.data.map((item, idx) => (
              <div
                key={item.name || idx}
                className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
              >
                <span className="font-semibold text-gray-700">
                  {item.name}:
                </span>
                <span className="text-blue-700">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Card for the Pie Chart dashboard (e.g., ID 1000002) */}
      {!overallLoading && !error && pieChartMetric && (
        <Card title={pieChartMetric.name || "चार्ट डेटा"} loading={false}>
          <GenericChartPreview
            type={
              pieChartMetric.type?.toLowerCase() === "pie chart" ? "pie" : "bar"
            }
            labelKey="name"
            valueKey="value"
            chartLabel={pieChartMetric.name || "जनसंख्या"}
            title={pieChartMetric.name || "जनसंख्या विवरण"}
            data={pieChartMetric.data}
          />
        </Card>
      )}

      {/* Card for the Ring Chart dashboard (e.g., ID 1000003) */}
      {!overallLoading && !error && ringChartMetric && (
        <Card title={ringChartMetric.name || "चार्ट डेटा"} loading={false}>
          <GenericChartPreview
            type={
              ringChartMetric.type?.toLowerCase() === "ring chart"
                ? "doughnut"
                : "bar"
            }
            labelKey="name"
            valueKey="value"
            chartLabel={ringChartMetric.name || "जनसंख्या"}
            title={ringChartMetric.name || "जनसंख्या विवरण"}
            data={ringChartMetric.data}
          />
        </Card>
      )}

      {/* Card for the Line Chart dashboard (e.g., ID 1000004) */}
      {!overallLoading && !error && lineChartMetric && (
        <Card
          title={lineChartMetric.name || "चार्ट डेटा"}
          loading={false}
          className="col-span-2" // Example: make line chart span 2 columns
        >
          <GenericChartPreview
            type={
              lineChartMetric.type?.toLowerCase() === "line chart"
                ? "line"
                : "bar"
            }
            labelKey="name"
            valueKey="value"
            chartLabel={lineChartMetric.name || "जनसंख्या"}
            title={lineChartMetric.name || "जनसंख्या विवरण"}
            data={lineChartMetric.data}
          />
        </Card>
      )}

      {/* Card for the Stack Bar Chart dashboard (e.g., ID 1000005) */}
      {!overallLoading && !error && stackBarChartMetric && (
        <Card
          title={stackBarChartMetric.name || "वडागत जनसंख्या"}
          loading={false}
          className="col-span-full" // Example: make stack bar chart span full width
        >
          <GenericChartPreview
            type={
              stackBarChartMetric.type?.toLowerCase() === "stack bar graph"
                ? "stackbar" // New type for GenericChartPreview to handle
                : "bar"
            }
            labelKey="name"
            valueKey="value"
            chartLabel={stackBarChartMetric.name || "जनसंख्या"}
            title={stackBarChartMetric.name || "जनसंख्या विवरण"}
            data={stackBarChartMetric.data}
            wardData={stackBarChartMetric.wardData} // Pass the parsed ward data
          />
        </Card>
      )}

      {/* Card for the Ward-wise Bar Chart (e.g., ID 1000006) */}
      {!overallLoading && !error && wardBarChartMetric && (
        <Card
          title={wardBarChartMetric.name || "वडा स्तरीय जनसंख्या"}
          loading={false}
        >
          <GenericChartPreview
            type={
              wardBarChartMetric.type?.toLowerCase() === "bar chart"
                ? "bar"
                : "bar"
            }
            labelKey="name"
            valueKey="value"
            chartLabel={wardBarChartMetric.name || "जनसंख्या"}
            title={wardBarChartMetric.name || "जनसंख्या विवरण"}
            data={wardBarChartMetric.data}
          />
        </Card>
      )}

      {/* Fallback if no dashboard metrics can be displayed after loading */}
      {!overallLoading &&
        !error &&
        !singleValueMetric &&
        !multiItemMetric &&
        !multiItemMetric2 &&
        !multiItemMetric3 &&
        !pieChartMetric &&
        !ringChartMetric &&
        !lineChartMetric &&
        !stackBarChartMetric &&
        !wardBarChartMetric && (
          <p className="text-center py-4 text-gray-500">
            डाटा उपलब्ध छैन। {/* Translated fallback message */}
          </p>
        )}
    </div>
  );
};

export default ChartGrid;
