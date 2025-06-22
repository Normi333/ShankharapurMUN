import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ReportSidebar from "../partials/ReportSidebar";
import Header from "../partials/Header";
import MyDataComponent from "../components/MyDataComponent";

const reportConfig = {
  mothertongue: {
    endpoint: "hsurvey_mothertongue",
    title: "मातृभाषाको आधारमा वर्गिकरण",
  },
  religion: {
    endpoint: "hsurvey_religion",
    title: "धर्मको आधारमा वर्गिकरण",
  },
  caste: {
    endpoint: "hsurvey_caste",
    title: "जातिको आधारमा वर्गिकरण",
  },
  workdivision: {
    endpoint: "hsurvey_workdivision",
    title: "कामको विभाजनको आधारमा वर्गिकरण",
  },
  cookingfuel: {
    endpoint: "hsurvey_cookingfuel",
    title: "खाना पकाउने इन्धनको आधारमा वर्गिकरण",
  },
  noncurable: {
    endpoint: "hsurvey_noncurable",
    title: "निको नहुने रोगको आधारमा वर्गिकरण",
  },
  "inv-source": {
    endpoint: "inv_source_report",
    title: "लगानीको स्रोतको रिपोर्ट",
  },
  housestatus: {
    endpoint: "hsurvey_housestatus",
    title: "घरको स्थितिको आधारमा वर्गिकरण",
  },
  "rent-details": {
    endpoint: "rentDetailsReport",
    title: "बहाल विवरण रिपोर्ट",
  },
  "loan-source": {
    endpoint: "loan_source_report",
    title: "ऋणको स्रोत रिपोर्ट",
  },
  "saving-source": {
    endpoint: "Saving_source_report",
    title: "बचतको स्रोत रिपोर्ट",
  },
  incomeexpense: {
    endpoint: "hsurvey_incomeexpense",
    title: "आम्दानी र खर्चको आधारमा वर्गिकरण",
  },
  foreign: {
    endpoint: "hsurvey_foreign",
    title: "विदेशीको आधारमा वर्गिकरण",
  },
  "service-details": {
    endpoint: "Service_details_report",
    title: "सेवाको विवरण रिपोर्ट",
  },
  "death-count": {
    endpoint: "lg_hsurvey_death_count",
    title: "मृत्युको संख्याको आधारमा वर्गिकरण",
  },
  "land-details": {
    endpoint: "Land_details_report",
    title: "जग्गाको विवरण रिपोर्ट",
  },
  "building-details": {
    endpoint: "BuildingDetailsReport",
    title: "भवनको विवरण रिपोर्ट",
  },
  "disaster-details": {
    endpoint: "lg_hsurvey_disaster_details",
    title: "प्रकोपको विवरण रिपोर्ट",
  },
  lsdetails: {
    endpoint: "hsurvey_lsdetails",
    title: "लघु उद्योगको विवरण",
  },
  electricitysource: {
    endpoint: "hsurvey_electricitysource",
    title: "बिजुलीको स्रोतको आधारमा वर्गिकरण",
  },
  toiletstatus: {
    endpoint: "hsurvey_toiletstatus",
    title: "शौचालयको स्थितिको आधारमा वर्गिकरण",
  },
  watersource: {
    endpoint: "hsurvey_watersource",
    title: "पानीको स्रोतको आधारमा वर्गिकरण",
  },
  agegroup: {
    endpoint: "hsurvey_agegroup",
    title: "उमेर समूहको आधारमा वर्गिकरण",
  },
};

function WelcomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-[#003893] to-[#DC143C] text-white text-center rounded-lg p-10 shadow-lg">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        सर्वेक्षण ड्यासबोर्ड
      </h1>
      <p className="text-base sm:text-lg text-white max-w-2xl leading-relaxed mb-6">
        बायाँतर्फको साइडबारबाट कुनै पनि सर्वेक्षण रिपोर्ट छान्नुहोस् र तपाईंको
        डाटा सजिलै हेर्नुहोस्।
      </p>
      <ol
        className="list-decimal list-inside mx-auto"
        style={{
          listStylePosition: "inside",
          maxWidth: "500px",
          textAlign: "justify",
        }}
      >
        <li>मातृभाषाको आधारमा वर्गिकरण</li>
        <li>धर्मको आधारमा वर्गिकरण</li>
        <li>जातिको आधारमा वर्गिकरण</li>
        <li>कामको विभाजनको आधारमा वर्गिकरण</li>
        <li>खाना पकाउने इन्धनको आधारमा वर्गिकरण</li>
        <li>निको नहुने रोगको आधारमा वर्गिकरण</li>
        <li>लगानीको स्रोतको रिपोर्ट</li>
        <li>घरको स्थितिको आधारमा वर्गिकरण</li>
        <li>बहाल विवरण रिपोर्ट</li>
        <li>ऋणको स्रोत रिपोर्ट</li>
        <li>बचतको स्रोत रिपोर्ट</li>
        <li>आम्दानी र खर्चको आधारमा वर्गिकरण</li>
        <li>विदेशीको आधारमा वर्गिकरण</li>
        <li>सेवाको विवरण रिपोर्ट</li>
        <li>मृत्युको संख्याको आधारमा वर्गिकरण</li>
        <li>जग्गाको विवरण रिपोर्ट</li>
        <li>भवनको विवरण रिपोर्ट</li>
        <li>प्रकोपको विवरण रिपोर्ट</li>
        <li>लघु उद्योगको विवरण</li>
        <li>बिजुलीको स्रोतको आधारमा वर्गिकरण</li>
        <li>शौचालयको स्थितिको आधारमा वर्गिकरण</li>
        <li>पानीको स्रोतको आधारमा वर्गिकरण</li>
        <li>उमेर समूहको आधारमा वर्गिकरण</li>
      </ol>
    </div>
  );
}

export default function ReportView() {
  const { path } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const report = path ? reportConfig[path] : null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ReportSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            {/* REMOVED min-h-[500px] here */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {report ? (
                <MyDataComponent
                  urlPostfix={report.endpoint}
                  title={report.title}
                />
              ) : (
                <WelcomePage />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
