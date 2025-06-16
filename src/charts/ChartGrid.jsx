import React, { useEffect, useState } from "react";
import ChartCard from "./ChartCard";
import GenericChartPreview from "./GenericChartPreview";

const chartTypes = ["bar", "pie", "line", "doughnut"];

const ChartGrid = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setloading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const charts = Array.from({ length: 15 });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 p-4">
      {charts.map((_, index) => {
        const type = chartTypes[index % chartTypes.length];
        return (
          <ChartCard
            key={index}
            title={`पेशाको अनुसार घरधुरी`}
            loading={loading}
          >
            <GenericChartPreview
              type={type}
              labelKey="profession"
              valueKey="households"
              chartLabel="पेशा"
              title={`पेशाको अनुसार घरधुरी वृत्तचित्र (${type})`}
            />
          </ChartCard>
        );
      })}
    </div>
  );
};

export default ChartGrid;
