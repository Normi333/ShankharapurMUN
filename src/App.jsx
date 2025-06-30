import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";

// Import pages
import Login from "./pages/Login";
// import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ChartReportPage from "./pages/ChartReportPage";
import MapPage from "./pages/MapPage";
import ReportView from "./pages/HouseholdReport";
import HouseholdReport from "./pages/HouseholdReport";
import Institutionaldetailsstatistics from "./pages/Institutionaldetailsstatistics";
import ReportViewInstitution from "./pages/Institutionaldetailsstatistics";
import Info from "./components/Info";
import HouseholdWardSearch from "./pages/MainChartScreenSearch";
import MainChartScreenSearch from "./pages/MainChartScreenSearch";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.scrollBehavior = "auto";
      window.scroll({ top: 0 });
      htmlElement.style.scrollBehavior = "";
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />{" "}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        /> */}
        <Route path="/householdreport" element={<HouseholdReport />} />
        <Route
          path="/statisticsreport"
          element={<Institutionaldetailsstatistics />}
        />
        <Route path="/" element={<ChartReportPage />} />
        {/* <Route
          path="/report"
          element={
            isLoggedIn ? (
              <ChartReportPage />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        /> */}
        <Route path="/maps" element={<MapPage />} />
        {/* <Route
          path="/maps"
          element={
            isLoggedIn ? <MapPage /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        /> */}
        <Route path="/ReportView/:path" element={<ReportView />} />
        <Route path="/Report/:path" element={<ReportViewInstitution />} />
        <Route path="/DetailedReport/:path" element={<MainChartScreenSearch />} />
        <Route path="/DetailedReport" element={<MainChartScreenSearch />} />
        {/* <Route path="/ward-search" element={<HouseholdWardSearch />} /> */}
        {/* <Route
          path="/ReportView/:path"
          element={
            isLoggedIn ? (
              <ReportView />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        /> */}
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

export default App;
