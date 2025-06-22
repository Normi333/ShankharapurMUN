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
const STACK_BAR_CHART_ID = "1000005"; // NEW: For the Stack Bar Graph (वडागत जनसंख्या)

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
  const [stackBarChartMetric, setStackBarChartMetric] = useState(null); // NEW state for stack bar chart
  const [error, setError] = useState(null);

  // Function to safely parse the non-standard JSON string
  const parseNonStandardJson = (jsonString) => {
    try {
      // 1. Initial trim of whitespace, newlines, tabs from start/end
      let cleanedString = jsonString.trim();

      // 2. Aggressively remove all newlines, tabs, and carriage returns.
      cleanedString = cleanedString.replace(/[\n\t\r]+/g, "");

      // 3. Replace single quotes with double quotes globally
      cleanedString = cleanedString.replace(/'/g, '"');

      // 4. Ensure keys are double-quoted. This regex is generally robust for unquoted keys.
      cleanedString = cleanedString.replace(
        /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
        '$1"$2":'
      );

      // Final attempt to parse
      const parsed = JSON.parse(cleanedString);
      return parsed;
    } catch (e) {
      console.error(
        "Failed to parse non-standard JSON:",
        e,
        "Original:",
        jsonString,
        "Attempted Cleaned:",
        cleanedString // Log the string after cleaning attempts
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
        setError(
          `Authentication Error: ${authErrorFromContext}. Cannot fetch dashboard data.`
        );
        setLoadingDashboardData(false);
        return;
      }

      if (!authToken) {
        setError("Not authenticated. Please ensure you are logged in.");
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
        let fetchedStackBarChartMetric = null; // NEW variable

        const allIdsToFetch = [
          SINGLE_VALUE_METRIC_ID,
          MULTI_ITEM_METRIC_ID,
          PIE_CHART_METRIC_ID,
          RING_CHART_METRIC_ID,
          LINE_CHART_METRIC_ID,
          STACK_BAR_CHART_ID, // NEW ID added here
        ];

        const fetchPromises = allIdsToFetch.map(async (id) => {
          try {
            const API_DASHBOARD_URL = `/models/public_dashboard/${id}`;
            const response = await axiosInstance.get(API_DASHBOARD_URL);
            const rawData = response.data;

            if (rawData && typeof rawData.dashboard_json === "string") {
              const parsed = parseNonStandardJson(rawData.dashboard_json);

              // Check if parsed data is valid (array and not empty)
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
                // NEW condition for the stack bar chart
                let parsedWardData = null;
                if (typeof rawData.dashboard_json2 === "string") {
                  parsedWardData = parseNonStandardJson(
                    rawData.dashboard_json2
                  );
                }
                fetchedStackBarChartMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
                  data: parsed, // This is your [{"name": "पुरुष", "value": 744}, ...]
                  wardData: parsedWardData, // This will be your [{"name": "वडा नं", "value": 2}]
                };
              }
            } else {
              console.warn(
                `dashboard_json not found or not a string for ID ${id}:`,
                rawData
              );
            }
          } catch (err) {
            console.error(`Error fetching dashboard data for ID ${id}:`, err);
            if (!axios.isCancel(err)) {
              setError((prev) =>
                prev
                  ? `${prev}\nFailed to load metric for ID ${id}.`
                  : `Failed to load metric for ID ${id}.`
              );
            }
          }
        });

        await Promise.all(fetchPromises);
        setSingleValueMetric(fetchedSingleValueMetric);
        setMultiItemMetric(fetchedMultiItemMetric);
        setPieChartMetric(fetchedPieChartMetric);
        setRingChartMetric(fetchedRingChartMetric);
        setLineChartMetric(fetchedLineChartMetric);
        setStackBarChartMetric(fetchedStackBarChartMetric); // NEW state set here
      } catch (overallErr) {
        console.error("Overall error during dashboard data fetch:", overallErr);
        setError((prev) =>
          prev
            ? `${prev}\nAn unexpected error occurred while fetching dashboard data.`
            : `An unexpected error occurred while fetching dashboard data.`
        );
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
          Loading dashboard metrics...
        </p>
      )}
      {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

      {/* Card for the multi-item dashboard (e.g., ID 1000001) */}
      {!overallLoading && !error && multiItemMetric && (
        <Card
          title="परिवार तथा जनसंख्या विवरण"
          loading={false}
          disableExpand={false}
        >
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

      {/* Card for the Pie Chart dashboard (e.g., ID 1000002) */}
      {!overallLoading && !error && pieChartMetric && (
        <Card
          title={pieChartMetric.name || "चार्ट डेटा"}
          loading={false}
          disableExpand={false}
        >
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
        <Card
          title={ringChartMetric.name || "चार्ट डेटा"}
          loading={false}
          disableExpand={false}
        >
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
          disableExpand={false}
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
          disableExpand={false}
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

      {/* Card for the single value metric (e.g., ID 1000000) */}
      {!overallLoading && !error && singleValueMetric && (
        <Card
          title={singleValueMetric.name}
          loading={false}
          disableExpand={true}
        >
          <div className="text-4xl font-bold text-center py-8">
            {singleValueMetric.value}
          </div>
          <p className="text-center text-gray-600">Total Households</p>
        </Card>
      )}

      {/* Fallback if no dashboard metrics can be displayed after loading */}
      {!overallLoading &&
        !error &&
        !singleValueMetric &&
        !multiItemMetric &&
        !pieChartMetric &&
        !ringChartMetric &&
        !lineChartMetric &&
        !stackBarChartMetric && ( // NEW: Include new metric in fallback check
          <p className="text-center py-4 text-gray-500">
            No dashboard metrics available to display.
          </p>
        )}
    </div>
  );
};

export default ChartGrid;
