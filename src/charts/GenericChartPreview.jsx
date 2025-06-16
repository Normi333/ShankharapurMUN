import React, { useState, useEffect, useRef } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import ChartLegend from "./ChartLegend";
import Skeleton from "./Skeleton";
import "../css/ChartPreview.css";
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
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const chartMap = {
  bar: Bar,
  pie: Pie,
  line: Line,
  doughnut: Doughnut,
};

const GenericChartPreview = ({
  type = "bar",
  labelKey = "profession",
  valueKey = "households",
  chartLabel = "पेशा",
  title = "चार्ट",
  isExpanded = false,
}) => {
  const [chartData, setChartData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hiddenItems, setHiddenItems] = useState({});
  const chartRef = useRef();

  const ChartComponent = chartMap[type];

  useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => {
        chartRef.current.resize();
      }, 300);
    }
  }, [isExpanded]);

  useEffect(() => {
    setTimeout(() => {
      setChartData([
        { profession: "अन्य", households: 100 },
        { profession: "कृषि", households: 5000 },
        { profession: "ज्याला मजदुरी", households: 300 },
        { profession: "व्यापार", households: 250 },
        { profession: "सरकारी सेवा", households: 50 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const generateColors = (length) =>
    Array.from({ length }, (_, i) => `hsl(${(i * 137.5) % 360}, 65%, 55%)`);

  const colors = generateColors(chartData.length);
  const labels = chartData.map((item) => item[labelKey]);
  const values = chartData.map((item) => parseFloat(item[valueKey]));

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: values.map((v, i) => (hiddenItems[i] ? null : v)),
        backgroundColor: type === "line" ? "rgba(75,192,192,0.2)" : colors,
        borderColor: type === "line" ? "rgba(75,192,192,1)" : "#fff",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundcolor: type === "line" ? colors : undefined,
      },
    ],
  };

  const toggleVisibility = (index) => {
    setHiddenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 18, family: "'Kalimati'" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}`,
        },
      },
      legend: { display: false },
    },
    onHover: (_, chartElements) => {
      setHoveredIndex(chartElements.length ? chartElements[0].index : null);
    },
  };

  return (
    <div
      className="barchart-container"
      style={{
        width: "100%",
        height: isExpanded ? "100%" : "300px",
        position: "relative",
        // maxWidth: "800px",
        // aspectRatio: "16/9",
      }}
    >
      <div className="chart-wrapper">
        {loading && <Skeleton height={300} />}
        {!loading && (
          <>
            <ChartComponent ref={chartRef} data={data} options={options} />
            <ChartLegend
              labels={data.labels}
              colors={colors}
              hoveredIndex={hoveredIndex}
              onClick={toggleVisibility}
              hiddenItems={hiddenItems}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GenericChartPreview;
