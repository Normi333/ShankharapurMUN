// src/ContentWrapper.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../partials/Header";
import ReportSidebar from "../partials/ReportSidebar";
import MyDataComponent from "../components/MyDataComponent";

const surveys = [
  {
    path: "mothertongue",
    title: "मातृभाषाको आधारमा वर्गिकरण",
    endpoint: "hsurvey_mothertongue",
  },
  {
    path: "religion",
    title: "धर्मको आधारमा वर्गिकरण",
    endpoint: "hsurvey_religion",
  },
  { path: "caste", title: "जातिको आधारमा वर्गिकरण", endpoint: "hsurvey_caste" },
  {
    path: "workdivision",
    title: "कामको विभाजनको आधारमा वर्गिकरण",
    endpoint: "hsurvey_workdivision",
  },
  {
    path: "cookingfuel",
    title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
    endpoint: "hsurvey_cookingfuel",
  },
  {
    path: "noncurable",
    title: "निको नहुने रोगको आधारमा वर्गिकरण",
    endpoint: "hsurvey_noncurable",
  },
  {
    path: "inv-source",
    title: "लगानीको स्रोतको रिपोर्ट",
    endpoint: "Inv_source_report",
  },
  {
    path: "housestatus",
    title: "घरको स्थितिको आधारमा वर्गिकरण",
    endpoint: "hsurvey_housestatus",
  },
  {
    path: "rent-details",
    title: "भाडाको विवरण रिपोर्ट",
    endpoint: "RentDetailsReport",
  },
  {
    path: "loan-source",
    title: "ऋणको स्रोत रिपोर्ट",
    endpoint: "loan_source_report",
  },
  {
    path: "saving-source",
    title: "बचतको स्रोत रिपोर्ट",
    endpoint: "Saving_source_report",
  },
  {
    path: "incomeexpense",
    title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
    endpoint: "hsurvey_incomeexpense",
  },
  {
    path: "foreign",
    title: "विदेशीको आधारमा वर्गिकरण",
    endpoint: "hsurvey_foreign",
  },
  {
    path: "service-details",
    title: "सेवाको विवरण रिपोर्ट",
    endpoint: "Service_details_report",
  },
  {
    path: "death-count",
    title: "मृत्युको संख्याको आधारमा वर्गिकरण",
    endpoint: "lg_hsurvey_death_count",
  },
  {
    path: "land-details",
    title: "जग्गाको विवरण रिपोर्ट",
    endpoint: "Land_details_report",
  },
  {
    path: "building-details",
    title: "भवनको विवरण रिपोर्ट",
    endpoint: "BuildingDetailsReport",
  },
  {
    path: "disaster-details",
    title: "प्रकोपको विवरण रिपोर्ट",
    endpoint: "lg_hsurvey_disaster_details",
  },
  {
    path: "lsdetails",
    title: "लघु उद्योगको विवरण",
    endpoint: "hsurvey_lsdetails",
  },
  {
    path: "electricitysource",
    title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
    endpoint: "hsurvey_electricitysource",
  },
  {
    path: "toiletstatus",
    title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
    endpoint: "hsurvey_toiletstatus",
  },
  {
    path: "watersource",
    title: "पानीको स्रोतको आधारमा वर्गिकरण",
    endpoint: "hsurvey_watersource",
  },
  {
    path: "agegroup",
    title: "उमेर समूहको आधारमा वर्गिकरण",
    endpoint: "hsurvey_agegroup",
  },
];

function WelcomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-900 text-white text-center rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-6">सर्वेक्षण ड्यासबोर्ड</h1>
      <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
        बायाँ तर्फको साइडबारबाट कुनै पनि सर्वेक्षण रिपोर्ट छान्नुहोस् र तपाईंको
        डाटा हेर्नुहोस्।
      </p>
    </div>
  );
}

export default function ContentWrapper() {
  const { authLoading, authError } = useAuth();

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
    <>
      <Header />
      <div className="flex h-[calc(100vh-60px)]">
        <ReportSidebar />
        <main className="flex-1 p-6 ml-[400px]">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            {surveys.map(({ path, title, endpoint }) => (
              <Route
                key={path}
                path={`/${path}`}
                element={
                  <MyDataComponent urlPostfix={endpoint} title={title} />
                }
              />
            ))}
            <Route
              path="*"
              element={<div className="text-red-500">404 Not Found</div>}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}
