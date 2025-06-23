import React, { useEffect, useRef } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

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
  SubTitle,
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
  weight: "normal", // Will be overridden to 'bold' where needed
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
}) => {
  const chartRef = useRef();

  // Resize chart on component mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    }, 300); // Small delay to allow container to fully render/resize
    return () => clearTimeout(timeoutId);
  }, [data]);

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
    maintainAspectRatio: false, // Set to false to allow more flexible height control
    devicePixelRatio: 2,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    hover: {
      animationDuration: 0,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}`,
          title: (context) => {
            if (type === "stackbar" && context.length > 0) {
              return context[0].dataset.label;
            }
            return context[0].label;
          },
        },
        titleFont: {
          ...nepaliFont,
          size: 12,
          weight: "bold", // Tooltip title bold
        },
        bodyFont: { ...nepaliFont, size: 10, weight: "normal" },
        padding: 10,
        cornerRadius: 4,
        boxPadding: 4,
        bodyColor: "#000", // Keep body text black
        titleColor: "#000", // Keep title text black
        backgroundColor: "rgba(255, 255, 255, 0.9)", // <--- THIS IS THE CHANGE: Set a light background color
        borderColor: "rgba(0, 0, 0, 0.2)", // Optional: Add a light border
        borderWidth: 1, // Optional: Add border width
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            ...nepaliFont,
            size: 10,
            weight: "bold", // Legend labels bold
          },
          color: "#000", // Legend labels black
          usePointStyle: true,
          padding: 15,
        },
        display: true,
      },
      title: {
        display: false, // Default to false, card title handles it
        text: title,
        font: { ...nepaliFont, size: 16, weight: "bold" },
        padding: { top: 10, bottom: 10 },
        color: "#333", // Main chart title remains greyish if used
      },
      subtitle: {
        display: false,
        font: { ...nepaliFont, size: 12, weight: "normal" },
        color: "#666",
        padding: { bottom: 10 },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            ...nepaliFont,
            size: 10,
            weight: "bold", // X-axis ticks bold
          },
          color: "#000", // X-axis ticks black
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        title: {
          display: false,
          font: {
            ...nepaliFont,
            size: 12,
            weight: "bold", // X-axis title bold
          },
          padding: { top: 10 },
          color: "#000", // X-axis title black
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            ...nepaliFont,
            size: 10,
            weight: "bold", // Y-axis ticks bold
          },
          color: "#000", // Y-axis ticks black
          callback: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.08)",
          drawBorder: false,
        },
        title: {
          display: false, // Default to false
          font: {
            ...nepaliFont,
            size: 12,
            weight: "bold", // Y-axis title bold
          },
          color: "#000", // Y-axis title black
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
        },
      },
    },
  };

  let currentChartData;
  let currentOptions;

  const isCircularChart = type === "pie" || type === "doughnut";
  const containerClasses = `w-full relative flex justify-center items-center p-2 overflow-hidden ${
    isCircularChart ? "pb-[100%]" : "h-[300px] md:h-[350px] lg:h-[400px]"
  }`;

  const wrapperClasses = `absolute top-0 left-0 w-full h-full flex justify-center items-center`;

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
            ),
            borderWidth: 1.5,
            hoverOffset: 10,
          },
        ],
      };
      currentOptions = {
        ...baseOptions,
        maintainAspectRatio: true,
        scales: {},
        plugins: {
          ...baseOptions.plugins,
          legend: {
            ...baseOptions.plugins.legend,
            position: "bottom",
            align: "center",
            labels: {
              ...baseOptions.plugins.legend.labels,
              boxWidth: 20,
              usePointStyle: true,
            },
          },
          title: {
            ...baseOptions.plugins.title,
            display: false,
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
        maintainAspectRatio: false,
        scales: {
          x: {
            ...baseOptions.scales.x,
            ticks: {
              ...baseOptions.scales.x.ticks,
              maxRotation: 45,
              minRotation: 45,
              autoSkip: false,
              padding: 10,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // X-axis ticks bold for line chart
              },
              color: "#000", // X-axis ticks black for line chart
            },
            grid: {
              ...baseOptions.scales.x.grid,
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            title: {
              ...baseOptions.scales.x.title,
              display: true,
              text: "जाति",
              padding: { top: 20 },
              font: {
                ...nepaliFont,
                size: 12,
                weight: "bold", // X-axis title bold for line chart
              },
              color: "#000", // X-axis title black for line chart
            },
          },
          y: {
            ...baseOptions.scales.y,
            ticks: {
              ...baseOptions.scales.y.ticks,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // Y-axis ticks bold for line chart
              },
              color: "#000", // Y-axis ticks black for line chart
            },
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: "जनसंख्या",
              position: "left",
              padding: { top: 0, bottom: 0, left: 10, right: 10 },
              font: {
                ...nepaliFont,
                size: 12,
                weight: "bold", // Y-axis title bold for line chart
              },
              color: "#000", // Y-axis title black for line chart
            },
          },
        },
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            display: false,
          },
          subtitle: {
            ...baseOptions.plugins.subtitle,
            display: false,
          },
          legend: {
            ...baseOptions.plugins.legend,
            position: "bottom",
          },
        },
      };
      break;

    case "stackbar":
      const wardTitle =
        wardData && wardData[0]
          ? `${wardData[0].name} ${wardData[0].value}`
          : "वडा";

      currentChartData = {
        labels: [wardTitle],
        datasets: data.map((item, index) => ({
          label: item[labelKey],
          data: [parseFloat(item[valueKey])],
          backgroundColor: vibrantColors[index % vibrantColors.length],
          borderColor: vibrantColors[index % vibrantColors.length].replace(
            "0.65)",
            "0.9)"
          ),
          borderWidth: 1,
          borderRadius: 4,
        })),
      };

      currentOptions = {
        ...baseOptions,
        maintainAspectRatio: false,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            display: false,
            text: title,
          },
          subtitle: {
            ...baseOptions.plugins.subtitle,
            display: true,
            text: `( ${wardTitle} )`,
            font: {
              ...nepaliFont,
              size: 12,
              weight: "normal", // Subtitle typically not bold
            },
            color: "#000", // Subtitle black
            padding: { top: 0, bottom: 10 },
          },
          legend: {
            ...baseOptions.plugins.legend,
            position: "bottom",
            align: "center",
            labels: {
              ...baseOptions.plugins.legend.labels,
              boxWidth: 20,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // Legend labels bold for stackbar
              },
              color: "#000", // Legend labels black for stackbar
            },
          },
        },
        scales: {
          x: {
            ...baseOptions.scales.x,
            stacked: true,
            ticks: {
              display: false, // Ticks are hidden for stackbar, so no font/color needed here
            },
            grid: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          y: {
            ...baseOptions.scales.y,
            stacked: true,
            ticks: {
              ...baseOptions.scales.y.ticks,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // Y-axis ticks bold for stackbar
              },
              color: "#000", // Y-axis ticks black for stackbar
            },
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: "जनसंख्या",
              position: "left",
              padding: { top: 0, bottom: 0, left: 10, right: 10 },
              font: {
                ...nepaliFont,
                size: 12,
                weight: "bold", // Y-axis title bold for stackbar
              },
              color: "#000", // Y-axis title black for stackbar
            },
          },
        },
      };
      break;

    case "bar":
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
        maintainAspectRatio: false,
        scales: {
          x: {
            ...baseOptions.scales.x,
            ticks: {
              ...baseOptions.scales.x.ticks,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // X-axis ticks bold for bar chart
              },
              color: "#000", // X-axis ticks black for bar chart
            },
            title: {
              ...baseOptions.scales.x.title,
              display: true,
              text: labelKey === "name" ? "श्रेणी" : labelKey,
              font: {
                ...nepaliFont,
                size: 12,
                weight: "bold", // X-axis title bold for bar chart
              },
              color: "#000", // X-axis title black for bar chart
            },
          },
          y: {
            ...baseOptions.scales.y,
            ticks: {
              ...baseOptions.scales.y.ticks,
              font: {
                ...nepaliFont,
                size: 10,
                weight: "bold", // Y-axis ticks bold for bar chart
              },
              color: "#000", // Y-axis ticks black for bar chart
            },
            title: {
              ...baseOptions.scales.y.title,
              display: true,
              text: valueKey === "value" ? "मूल्य" : valueKey,
              position: "left",
              padding: { top: 0, bottom: 0, left: 10, right: 10 },
              font: {
                ...nepaliFont,
                size: 12,
                weight: "bold", // Y-axis title bold for bar chart
              },
              color: "#000", // Y-axis title black for bar chart
            },
          },
        },
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            display: false,
          },
          subtitle: { display: false },
        },
      };
      break;
  }

  const ChartComponent = chartMap[type] || Bar;

  return (
    <div className={containerClasses}>
      <div className={isCircularChart ? wrapperClasses : "w-full h-full"}>
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
