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
// import ReportView from "./pages/ReportView";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For a real app, you'd check localStorage or a token here on initial load
  // useEffect(() => {
  //   // Example: Check if a token exists in localStorage to set initial login state
  //   const userToken = localStorage.getItem("userToken");
  //   if (userToken) {
  //     setIsLoggedIn(true);
  //   }
  // }, []); // Run once on component mount

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
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/report"
          element={
            isLoggedIn ? (
              <ChartReportPage />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/maps"
          element={
            isLoggedIn ? <MapPage /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
