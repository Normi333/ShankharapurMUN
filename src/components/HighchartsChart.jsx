import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Import Highcharts modules for additional functionality
// In Highcharts v12+, modules are automatically initialized when imported
import "highcharts/modules/exporting";
import "highcharts/modules/accessibility";

const HighchartsChart = ({
  options,
  title = "Chart",
  height = "400px",
  className = "",
  onChartReady,
}) => {
  const chartComponentRef = useRef(null);

  useEffect(() => {
    if (chartComponentRef.current && onChartReady) {
      const chart = chartComponentRef.current.chart;
      onChartReady(chart);
    }
  }, [onChartReady]);

  const defaultOptions = {
    chart: {
      type: "line",
      height: height,
      style: {
        fontFamily: "Inter, system-ui, sans-serif",
      },
    },
    title: {
      text: title,
      style: {
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ["downloadPNG", "downloadPDF", "downloadCSV"],
        },
      },
    },
    ...options,
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={defaultOptions}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default HighchartsChart;
