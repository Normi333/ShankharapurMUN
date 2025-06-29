import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";
import HighchartsChart from "../components/HighchartsChart.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const API_POSTFIX = "/models/lg_hsurvey";

const WARD_OPTIONS = [
  { value: "0", label: "वडा नं" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  })),
];

// Utility to fetch all pages and cache in localStorage
async function fetchAllPages({
  axiosInstance,
  postfix,
  filterKey,
  filterValue,
}) {
  const pageSize = 100;
  let skip = 0;
  let allRecords = [];
  let total = null;
  let pageCount = 0;
  let localKey = `${postfix}_ward_${filterValue}`;

  // Check localStorage first
  const cached = localStorage.getItem(localKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
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
  // Store in localStorage
  localStorage.setItem(localKey, JSON.stringify(allRecords));
  return allRecords;
}

export default function HouseholdWardSearch() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { path: param } = useParams();
  const { axiosInstance, authLoading, authError } = useAuth();
  const [ward, setWard] = useState("2");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ population: 0, female: 0, male: 0 });
  const [tableData, setTableData] = useState([]);

  // Chart data
  const chartCategories = tableData.map((d) => d.label);
  const chartValues = tableData.map((d) => d.value);

  const pieOptions = {
    chart: { type: "pie" },
    title: { text: param },
    series: [
      {
        name: "घर संख्या",
        data: tableData.map((d) => ({ name: d.label, y: d.value })),
      },
    ],
  };

  const barOptions = {
    chart: { type: "column" },
    title: { text: param },
    xAxis: { categories: chartCategories },
    yAxis: { title: { text: "घर संख्या" } },
    series: [
      {
        name: "घर संख्या",
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
      setLoading(true);
      try {
        const records = await fetchAllPages({
          axiosInstance,
          postfix: API_POSTFIX,
          filterKey: "ward_no",
          filterValue: ward,
        });
        // Group by param
        const group = {};
        records.forEach((rec) => {
          let val = rec[param];
          if (val === null || val === undefined || val === "") val = "अन्य";
          group[val] = (group[val] || 0) + 1;
        });
        const data = Object.entries(group).map(([label, value]) => ({
          label,
          value,
        }));
        setTableData(data);
        // Optionally update summary (dummy for now)
        setSummary({ population: records.length, female: 0, male: 0 });
      } catch (e) {
        setTableData([]);
      } finally {
        setLoading(false);
      }
    }
    autoSearch();
  }, [param, ward, axiosInstance]);

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
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <HighchartsChart options={pieOptions} title="" height="350px" />
              <HighchartsChart options={barOptions} title="" height="350px" />
            </div>

            {/* Table */}
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
                          घर संख्या
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, idx) => (
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
                      ))}
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
