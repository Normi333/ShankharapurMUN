// // A minimal version of GenericChartPreview.jsx for context
// import React from "react";
// import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const GenericChartPreview = ({
//   type,
//   labelKey,
//   valueKey,
//   chartLabel,
//   title,
//   data,
//   isExpanded,
// }) => {
//   if (!data || data.length === 0) {
//     return (
//       <p className="text-center text-gray-500">No chart data available.</p>
//     );
//   }

//   // Extract labels and values
//   const labels = data.map((item) => item[labelKey]);
//   const values = data.map((item) => item[valueKey]);

//   // Chart.js data structure
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: chartLabel,
//         data: values,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//           "rgba(255, 159, 64, 0.6)",
//           "rgba(199, 199, 199, 0.6)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(199, 199, 199, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: !isExpanded, // Allow chart to fill expanded space
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: isExpanded ? 14 : 10, // Adjust font size based on expansion
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: title,
//         font: {
//           size: isExpanded ? 18 : 12, // Adjust font size based on expansion
//         },
//       },
//     },
//     // Specific options for bar/line charts if needed
//     scales:
//       type !== "pie" && type !== "doughnut"
//         ? {
//             x: {
//               ticks: {
//                 font: {
//                   size: isExpanded ? 12 : 8,
//                 },
//               },
//             },
//             y: {
//               ticks: {
//                 font: {
//                   size: isExpanded ? 12 : 8,
//                 },
//               },
//               beginAtZero: true,
//             },
//           }
//         : {},
//   };

//   const ChartComponent = {
//     bar: Bar,
//     pie: Pie,
//     line: Line,
//     doughnut: Doughnut,
//   }[type];

//   if (!ChartComponent) {
//     return (
//       <p className="text-center text-red-500">Unsupported chart type: {type}</p>
//     );
//   }

//   return (
//     <div style={{ height: isExpanded ? "100%" : "auto", width: "100%" }}>
//       <ChartComponent data={chartData} options={options} />
//     </div>
//   );
// };

// export default GenericChartPreview;

import React, { useEffect, useRef } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import "../css/ChartPreview.css"; // Ensure your CSS is still relevant

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  SubTitle, // Added SubTitle for more options
} from "chart.js";

// Register all necessary Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  SubTitle
);

// Define chart mapping for easier component selection
const chartMap = {
  bar: Bar,
  pie: Pie,
  line: Line,
  doughnut: Doughnut,
  stackbar: Bar,
};

// Improved color generation for better distinctiveness and slightly softer tones
const generateVibrantColors = (count) => {
  const colors = [];
  const baseHue = 0; // Starting hue
  for (let i = 0; i < count; i++) {
    // Distribute hues more evenly with a golden angle
    const hue = (baseHue + i * 137.508) % 360;
    // Use a fixed saturation and lightness for consistency
    colors.push(`hsl(${hue}, 75%, 65%)`); // Brighter and more distinct
  }
  return colors;
};

// Define base font settings for Nepali text
const nepaliFont = {
  family: "'Kalimati', 'Noto Sans Devanagari', sans-serif",
  size: 12, // Default size
  weight: "normal",
};

// --- GenericChartPreview Component ---
const GenericChartPreview = ({
  type = "bar",
  labelKey = "name",
  valueKey = "value",
  chartLabel = "जनसंख्या",
  title = "चार्ट", // Main chart title (e.g., "वडागत जनसंख्या")
  data,
  wardData, // Specific for 'stackbar' type, contains ward number
  isExpanded = false,
}) => {
  const chartRef = useRef();

  // Resize chart on component mount and `isExpanded` change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    }, 300); // Small delay to allow container to fully render/resize
    return () => clearTimeout(timeoutId);
  }, [isExpanded, data]);

  // Display message if no data is available
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-4">
        डेटा उपलब्ध छैन। (No data available for this chart.)
      </p>
    );
  }

  // Generate colors based on the number of data points
  const vibrantColors = generateVibrantColors(data.length);

  // Define base Chart.js options applicable to all chart types
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: !isExpanded,
    devicePixelRatio: 2, // High-resolution rendering
    animation: {
      duration: 800, // Slightly faster animation
      easing: "easeOutQuart",
    },
    hover: {
      animationDuration: 0,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}`,
          // For stacked bar, show category (e.g., 'पुरुष') then value
          title: (context) => {
            if (type === "stackbar" && context.length > 0) {
              return context[0].dataset.label; // e.g., 'पुरुष'
            }
            return context[0].label; // Default label
          },
        },
        titleFont: {
          ...nepaliFont,
          size: isExpanded ? 14 : 12,
          weight: "bold",
        },
        bodyFont: { ...nepaliFont, size: isExpanded ? 12 : 10 },
        padding: 10,
        cornerRadius: 4,
        boxPadding: 4,
      },
      legend: {
        position: "bottom", // Default to bottom for all charts, generally safer
        labels: {
          font: { ...nepaliFont, size: isExpanded ? 14 : 10 },
          usePointStyle: true,
          padding: 15,
        },
        display: true,
      },
      title: {
        display: true,
        text: title, // Main title prop
        font: { ...nepaliFont, size: isExpanded ? 20 : 16, weight: "bold" },
        padding: { top: 10, bottom: 10 },
        color: "#333", // Darker color for main title
      },
      subtitle: {
        display: false, // Default to false, specific types can enable it
        font: { ...nepaliFont, size: isExpanded ? 16 : 12, weight: "normal" },
        color: "#666",
        padding: { bottom: 10 },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { ...nepaliFont, size: isExpanded ? 12 : 10 },
          color: "#333",
        },
        grid: {
          display: false, // Hide vertical grid lines by default for most charts
          drawBorder: false, // Hide axis line
        },
        title: {
          // Default X-axis title, can be overridden
          display: false, // Default to false
          font: { ...nepaliFont, size: isExpanded ? 14 : 12, weight: "bold" },
          padding: { top: 10 },
          color: "#555",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { ...nepaliFont, size: isExpanded ? 12 : 10 },
          color: "#333",
          callback: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.08)", // Slightly darker horizontal grid lines
          drawBorder: false,
        },
        title: {
          // Default Y-axis title, can be overridden
          display: false, // Default to false
          font: { ...nepaliFont, size: isExpanded ? 14 : 12, weight: "bold" },
          padding: { bottom: 10 },
          color: "#555",
        },
      },
    },
  };

  // --- Chart Data & Options based on Type ---
  let currentChartData;
  let currentOptions;

  switch (type) {
    case "pie":
    case "doughnut":
      currentChartData = {
        labels: data.map((item) => item[labelKey]),
        datasets: [
          {
            label: chartLabel,
            data: data.map((item) => parseFloat(item[valueKey])),
            backgroundColor: vibrantColors,
            borderColor: vibrantColors.map((color) =>
              color.replace("0.65)", "0.9)")
            ), // Darker border for contrast
            borderWidth: 1.5, // Slightly thicker border
            hoverOffset: 10,
          },
        ],
      };
      currentOptions = {
        ...baseOptions,
        scales: {}, // No scales for pie/doughnut
        plugins: {
          ...baseOptions.plugins,
          legend: {
            ...baseOptions.plugins.legend,
            position: isExpanded ? "right" : "bottom", // Right for expanded, bottom for default
            align: "center",
            labels: {
              ...baseOptions.plugins.legend.labels,
              boxWidth: 20,
              usePointStyle: true,
            },
          },
          title: {
            ...baseOptions.plugins.title,
            padding: { top: 10, bottom: 10 },
          },
          subtitle: { display: false },
        },
      };
      break;

    case "line":
      currentChartData = {
        labels: data.map((item) => item[labelKey]),
        datasets: [
          {
            label: chartLabel,
            data: data.map((item) => parseFloat(item[valueKey])),
            fill: false,
            backgroundColor: vibrantColors[0],
            borderColor: vibrantColors[0].replace("0.65)", "0.9)"),
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: vibrantColors[0].replace("0.65)", "0.9)"),
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      };
      currentOptions = {
        ...baseOptions,
        scales: {
          x: {
            ...baseOptions.scales.x,
            grid: {
              ...baseOptions.scales.x.grid,
              display: true, // Show vertical grid for line charts (optional)
              color: "rgba(0, 0, 0, 0.05)", // Lighter vertical grid
            },
            title: {
              ...baseOptions.scales.x.title,
              display: true,
              // Use specific titles based on your data if possible, or general "Category"
              text: "जाति", // Example for your ethnicity chart
            },
          },
          y: {
            ...baseOptions.scales.y,
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: "जनसंख्या", // Example for your population chart
            },
          },
        },
        plugins: {
          ...baseOptions.plugins,
          subtitle: { display: false },
        },
      };
      break;

    case "stackbar":
      // Extract ward number for title/labeling
      const wardNumber = wardData && wardData[0] ? wardData[0].value : "N/A";
      const wardTitle =
        wardData && wardData[0]
          ? `${wardData[0].name} ${wardData[0].value}`
          : "वडा";

      currentChartData = {
        labels: [wardTitle], // The single bar representing the ward
        datasets: data.map((item, index) => ({
          label: item[labelKey], // e.g., "पुरुष", "महिला", "अन्य"
          data: [parseFloat(item[valueKey])],
          backgroundColor: vibrantColors[index % vibrantColors.length],
          borderColor: vibrantColors[index % vibrantColors.length].replace(
            "0.65)",
            "0.9)"
          ),
          borderWidth: 1,
          borderRadius: 4, // Rounded corners for stacked segments
        })),
      };

      currentOptions = {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            display: true, // Keep the main title 'वडागत जनसंख्या'
            text: title,
          },
          subtitle: {
            ...baseOptions.plugins.subtitle,
            display: true, // Use subtitle for the specific ward number
            text: `( ${wardTitle} )`, // e.g., "( वडा नं 2 )"
            font: {
              ...nepaliFont,
              size: isExpanded ? 16 : 12,
              weight: "normal",
            },
            color: "#666",
            padding: { top: 0, bottom: 10 },
          },
          legend: {
            ...baseOptions.plugins.legend,
            position: "bottom", // Bottom legend for stacked bars
            align: "center",
            labels: {
              ...baseOptions.plugins.legend.labels,
              boxWidth: 20,
            },
          },
        },
        scales: {
          x: {
            ...baseOptions.scales.x,
            stacked: true,
            ticks: {
              display: false, // Hide tick labels on X-axis (as it's just one bar)
            },
            grid: {
              display: false, // No grid lines needed for a single stacked bar
            },
            title: {
              // This will show the ward number as an X-axis title if needed, or simply let the subtitle handle it.
              display: false, // Hiding it as subtitle handles it better for single bar
            },
          },
          y: {
            ...baseOptions.scales.y,
            stacked: true,
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: "जनसंख्या", // Y-axis title
              font: {
                ...nepaliFont,
                size: isExpanded ? 14 : 12,
                weight: "bold",
              },
              padding: { bottom: 10 },
            },
          },
        },
      };
      break;

    case "bar": // Default Bar Chart
    default:
      currentChartData = {
        labels: data.map((item) => item[labelKey]),
        datasets: [
          {
            label: chartLabel,
            data: data.map((item) => parseFloat(item[valueKey])),
            backgroundColor: vibrantColors,
            borderColor: vibrantColors.map((color) =>
              color.replace("0.65)", "0.9)")
            ),
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      };
      currentOptions = {
        ...baseOptions,
        scales: {
          x: {
            ...baseOptions.scales.x,
            title: {
              ...baseOptions.scales.x.title,
              display: true,
              text: labelKey === "name" ? "श्रेणी" : labelKey, // Fallback X-axis title
            },
          },
          y: {
            ...baseOptions.scales.y,
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: valueKey === "value" ? "मूल्य" : valueKey, // Fallback Y-axis title
            },
          },
        },
        plugins: {
          ...baseOptions.plugins,
          subtitle: { display: false },
        },
      };
      break;
  }

  const ChartComponent = chartMap[type] || Bar;

  return (
    <div
      className="barchart-container"
      style={{
        width: "100%",
        height: isExpanded ? "100%" : "min(400px, 80vh)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isExpanded ? "20px" : "10px",
      }}
    >
      <div
        className="chart-wrapper"
        style={{
          height: "100%",
          width: "100%",
          maxWidth: isExpanded ? "90%" : "none",
        }}
      >
        <ChartComponent
          ref={chartRef}
          data={currentChartData}
          options={currentOptions}
        />
      </div>
    </div>
  );
};

export default GenericChartPreview;
