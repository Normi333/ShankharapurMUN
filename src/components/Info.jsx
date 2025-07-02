import React, { useEffect, useState } from "react";
import Card from "../charts/card.jsx";
import GenericChartPreview from "../charts/GenericChartPreview.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMale,
  faFemale,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Shankharapur1 from "../images/Shankharapur1.png";
import Shankharapur2 from "../images/Shankharapur2.png";
import Shankharapur3 from "../images/Shankharapur3.png";
import ShankharapurImage4 from "../images/ShankharapurImage4.png";
import Shankharapur5 from "../images/Shankharapur5.png";

// Import initFlowbite for manual initialization if not using global script
import { initFlowbite } from "flowbite";

// Define the dashboard IDs you want to fetch and display
const SINGLE_VALUE_METRIC_ID = "1000000";
const MULTI_ITEM_METRIC_ID = "1000001";
const PIE_CHART_METRIC_ID = "1000002";
const RING_CHART_METRIC_ID = "1000003";
const LINE_CHART_METRIC_ID = "1000004";
const STACK_BAR_CHART_ID = "1000005";
const WARD_BAR_CHART_ID = "1000006";
const MULTI_ITEM_METRIC_ID_3 = "1000008";
const INTRO_TEXT_METRIC_ID = "1000007";

const ChartGrid = () => {
  const handleDownloadSVG = () => {
    /* ... SVG download logic ... */
  };
  const handleDownloadCSV = () => {
    /* ... CSV download logic ... */
  };
  const handleDownloadPNG = () => {
    /* ... PNG download logic ... */
  };

  const {
    token: authToken,
    axiosInstance,
    authLoading: isAuthLoading,
    authError: authErrorFromContext,
  } = useAuth();

  const [loadingDashboardData, setLoadingDashboardData] = useState(true);
  const [singleValueMetric, setSingleValueMetric] = useState(null);
  const [totalFamilyCount, setTotalFamilyCount] = useState(null);
  const [malePopulationDetails, setMalePopulationDetails] = useState(null);
  const [femalePopulationDetails, setFemalePopulationDetails] = useState(null);

  const [pieChartMetric, setPieChartMetric] = useState(null);
  const [ringChartMetric, setRingChartMetric] = useState(null);
  const [lineChartMetric, setLineChartMetric] = useState(null);
  const [stackBarChartMetric, setStackBarChartMetric] = useState(null);
  const [wardBarChartMetric, setWardBarChartMetric] = useState(null);
  const [multiItemMetric2, setMultiItemMetric2] = useState(null);
  const [multiItemMetric3, setMultiItemMetric3] = useState(null);
  const [introTextMetric, setIntroTextMetric] = useState(null);
  const [error, setError] = useState(null);
  const overallLoading = isAuthLoading || loadingDashboardData;

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
      cleanedString = cleanedString.replace(/,\s*([}\]])/g, "$1");

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
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R / Ctrl + R)");
        setLoadingDashboardData(false);
        return;
      }

      if (!authToken) {
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R / Ctrl + R)");
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
        let fetchedIntroTextMetric = null;

        const allIdsToFetch = [
          SINGLE_VALUE_METRIC_ID,
          MULTI_ITEM_METRIC_ID,
          PIE_CHART_METRIC_ID,
          RING_CHART_METRIC_ID,
          LINE_CHART_METRIC_ID,
          STACK_BAR_CHART_ID,
          WARD_BAR_CHART_ID,
          MULTI_ITEM_METRIC_ID_3,
          INTRO_TEXT_METRIC_ID,
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
                fetchedSingleValueMetric = {
                  id: id,
                  name: rawData.Name,
                  value: parsed[0].value,
                };
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
              } else if (id === MULTI_ITEM_METRIC_ID_3) {
                fetchedMultiItemMetric3 = {
                  id: id,
                  name: rawData.Name,
                  data: parsed,
                };
              } else if (id === INTRO_TEXT_METRIC_ID) {
                fetchedIntroTextMetric = {
                  id: id,
                  name: rawData.Name,
                  type: rawData.dashboard_type,
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
              setError(
                "कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R / Ctrl + R )"
              );
            }
          }
        });

        await Promise.all(fetchPromises);
        setSingleValueMetric(fetchedSingleValueMetric);

        if (fetchedMultiItemMetric && fetchedMultiItemMetric.data) {
          const allMultiItems = fetchedMultiItemMetric.data;
          if (allMultiItems[0]) {
            setTotalFamilyCount({
              name: "जम्मा परिवार संख्या",
              value: allMultiItems[0].value,
            });
          }
          if (allMultiItems[1] && allMultiItems[2]) {
            setMalePopulationDetails([allMultiItems[1], allMultiItems[2]]);
          }
          if (allMultiItems[3] && allMultiItems[4]) {
            setFemalePopulationDetails([allMultiItems[3], allMultiItems[4]]);
          }
        }

        setPieChartMetric(fetchedPieChartMetric);
        setRingChartMetric(fetchedRingChartMetric);
        setLineChartMetric(fetchedLineChartMetric);
        setStackBarChartMetric(fetchedStackBarChartMetric);
        setWardBarChartMetric(fetchedWardBarChartMetric);
        setMultiItemMetric2(fetchedMultiItemMetric2);
        setMultiItemMetric3(fetchedMultiItemMetric3);
        setIntroTextMetric(fetchedIntroTextMetric);
      } catch (overallErr) {
        console.error("Overall error during dashboard data fetch:", overallErr);
        setError("कृपया पृष्ठ रिफ्रेस गर्नुहोस् (Ctrl + Shift + R / Ctrl + R)");
      } finally {
        setLoadingDashboardData(false);
      }
    };

    fetchAllDashboardData();
  }, [authToken, axiosInstance, isAuthLoading, authErrorFromContext]);

  // Initialize Flowbite components after the DOM is rendered
  // This is crucial for interactive components like carousels
  useEffect(() => {
    initFlowbite();
  }, [introTextMetric, overallLoading]); // Re-run when introTextMetric or loading state changes

  const shankharapurIntro = introTextMetric?.data.find(
    (item) => item.name === "ShankharapurIntro"
  );
  const municipalIntro = introTextMetric?.data.find(
    (item) => item.name === "EstablishInfo"
  );
  const whyDigital = introTextMetric?.data.find(
    (item) => item.name === "WhyDigital"
  );

  // Example data for the carousel (replace with your actual image/slide data)
  const carouselItems = [
    {
      id: 1,
      image: Shankharapur1, // Replace with your image paths
      alt: "शंखरापुर सक्व महोत्सव २०८१",
      caption: "शंखरापुर सक्व महोत्सव २०८१",
      // description:
      //   "",
    },
    {
      id: 2,
      image: Shankharapur2,
      alt: "नगर सभा",
      caption: "नगर सभा",
      // description:
      //   "Some representative placeholder content for the second slide.",
    },
    {
      id: 3,
      image: Shankharapur5,
      alt: "स्वास्थ्य विमा कार्यक्रम उद्घाटन समारोह",
      caption: "स्वास्थ्य विमा कार्यक्रम उद्घाटन समारोह",
      // description:
      //   "Some representative placeholder content for the third slide.",
    },
    {
      id: 4,
      image: ShankharapurImage4,
      alt: "शंखरापुर नगरपालिका",
      caption: "शंखरापुर नगरपालिका",
      // description:
      //   "Some representative placeholder content for the third slide.",
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 p-4">
      {overallLoading && (
        <p className="text-center py-4 text-gray-600 col-span-full">
          ड्यासबोर्ड मेट्रिक्स लोड हुँदैछ...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center py-4 col-span-full">
          त्रुटि: {error}
        </p>
      )}
      {/* Carousel Section - Place this at the very top */}
      {!overallLoading && !error && carouselItems.length > 0 && (
        <div
          id="default-carousel"
          className="relative w-full col-span-full"
          data-carousel="slide"
          data-carousel-interval="6000"
        >
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`hidden duration-700 ease-in-out ${
                  index === 0 ? "block" : ""
                }`}
                data-carousel-item
              >
                <img
                  src={item.image}
                  className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={item.alt}
                />
                {/* Optional: Add a caption overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 p-2 rounded">
                  <h5 className="text-xl font-bold">{item.caption}</h5>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
              ></button>
            ))}
          </div>
          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )}
      {/* End Carousel Section */}
      <hr className="my-4 border-gray-300 col-span-full" /> {/* Separator */}
      {/* Intro Text Section */}
      {!overallLoading && !error && introTextMetric && (
        <>
          {/* Grid for "Shankharapur Municipal" and "Municipal Intro" side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
            {shankharapurIntro && (
              <Card
                key={shankharapurIntro.name}
                title={"Shankharapur Municipal"}
                loading={false}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {shankharapurIntro.value}
                </p>
              </Card>
            )}
            {municipalIntro && (
              <Card
                key={municipalIntro.name}
                title={"Municipal Intro"}
                loading={false}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {municipalIntro.value}
                </p>
              </Card>
            )}
          </div>

          {/* Separate grid for "Why Digital Municipality?" to be on a new line */}
          <div className="grid grid-cols-1 gap-6 col-span-full">
            {whyDigital && (
              <Card
                key={whyDigital.name}
                title={"Why Digital Municipality? "}
                loading={false}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {whyDigital.value}
                </p>
              </Card>
            )}
          </div>
        </>
      )}
      {/* Combined Household and Population/Intro Cards */}
      {!overallLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 col-span-full items-stretch">
          {singleValueMetric && (
            <Card title={singleValueMetric.name} loading={false}>
              <div className="flex-grow flex items-center justify-center space-x-4 py-8">
                <div className="flex-shrink-0 w-16 h-16 bg-[#8c6eff] rounded-xl flex items-center justify-center text-white text-3xl">
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-gray-800">
                    {singleValueMetric.value}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {totalFamilyCount && (
            <Card title="जम्मा जनसंख्या" loading={false}>
              <div className="flex-grow flex items-center justify-center space-x-4 py-8">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-3xl">
                  <FontAwesomeIcon icon={faUsers} />{" "}
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-gray-800">
                    {totalFamilyCount.value}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {malePopulationDetails && (
            <Card title="पुरुष जनसंख्या विवरण" loading={false}>
              <div className="flex-grow flex flex-col justify-center space-y-2 text-base py-2">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl">
                    <FontAwesomeIcon icon={faMale} />
                  </div>
                  <div className="flex-grow flex flex-col">
                    {malePopulationDetails.map((item, idx) => (
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
                </div>
              </div>
            </Card>
          )}

          {femalePopulationDetails && (
            <Card title="महिला जनसंख्या विवरण" loading={false}>
              <div className="flex-grow flex flex-col justify-center space-y-2 text-base py-2">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                    <FontAwesomeIcon icon={faFemale} />
                  </div>
                  <div className="flex-grow flex flex-col">
                    {femalePopulationDetails.map((item, idx) => (
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
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
      {/* Graphical Highlights Section */}
      {!overallLoading &&
        !error &&
        (pieChartMetric ||
          ringChartMetric ||
          lineChartMetric ||
          stackBarChartMetric ||
          wardBarChartMetric) && (
          <>
            <div className="col-span-full mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ग्राफिकल हाइलाइटहरू
              </h2>
              <hr className="my-4 border-gray-300" />
            </div>
            {pieChartMetric && (
              <Card
                title={pieChartMetric.name || "चार्ट डेटा"}
                loading={false}
                enableDownloads={true}
                onDownloadSVG={handleDownloadSVG}
                onDownloadCSV={handleDownloadCSV}
                onDownloadPNG={handleDownloadPNG}
              >
                <GenericChartPreview
                  type={
                    pieChartMetric.type?.toLowerCase() === "pie chart"
                      ? "pie"
                      : "bar"
                  }
                  labelKey="name"
                  valueKey="value"
                  chartLabel={pieChartMetric.name || "जनसंख्या"}
                  title={pieChartMetric.name || "जनसंख्या विवरण"}
                  data={pieChartMetric.data}
                />
              </Card>
            )}
            {ringChartMetric && (
              <Card
                title={ringChartMetric.name || "चार्ट डेटा"}
                loading={false}
                enableDownloads={true}
                onDownloadSVG={handleDownloadSVG}
                onDownloadCSV={handleDownloadCSV}
                onDownloadPNG={handleDownloadPNG}
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
            {lineChartMetric && (
              <Card
                title={lineChartMetric.name || "चार्ट डेटा"}
                loading={false}
                enableDownloads={true}
                onDownloadSVG={handleDownloadSVG}
                onDownloadCSV={handleDownloadCSV}
                onDownloadPNG={handleDownloadPNG}
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
            {stackBarChartMetric && (
              <Card
                title={stackBarChartMetric.name || "वडागत जनसंख्या"}
                loading={false}
                className="col-span-full"
                enableDownloads={true}
                onDownloadSVG={handleDownloadSVG}
                onDownloadCSV={handleDownloadCSV}
                onDownloadPNG={handleDownloadPNG}
              >
                <GenericChartPreview
                  type={
                    stackBarChartMetric.type?.toLowerCase() ===
                    "stack bar graph"
                      ? "stackbar"
                      : "bar"
                  }
                  labelKey="name"
                  valueKey="value"
                  chartLabel={stackBarChartMetric.name || "जनसंख्या"}
                  title={stackBarChartMetric.name || "जनसंख्या विवरण"}
                  data={stackBarChartMetric.data}
                  wardData={stackBarChartMetric.wardData}
                />
              </Card>
            )}
            {wardBarChartMetric && (
              <Card
                title={wardBarChartMetric.name || "वडा स्तरीय जनसंख्या"}
                loading={false}
                enableDownloads={true}
                onDownloadSVG={handleDownloadSVG}
                onDownloadCSV={handleDownloadCSV}
                onDownloadPNG={handleDownloadPNG}
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
          </>
        )}
      {!overallLoading &&
        !error &&
        !singleValueMetric &&
        !totalFamilyCount &&
        !malePopulationDetails &&
        !femalePopulationDetails &&
        !multiItemMetric3 &&
        !pieChartMetric &&
        !ringChartMetric &&
        !lineChartMetric &&
        !stackBarChartMetric &&
        !wardBarChartMetric &&
        !introTextMetric && (
          <p className="text-center py-4 text-gray-500 col-span-full">
            डाटा उपलब्ध छैन।
          </p>
        )}
    </div>
  );
};

export default ChartGrid;
