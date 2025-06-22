// import React, { useEffect, useState } from "react";
// import ChartCard from "./ChartCard";
// import GenericChartPreview from "./GenericChartPreview";

// const chartTypes = ["bar", "pie", "line", "doughnut"];

// const ChartGrid = () => {
//   const [loading, setloading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setloading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const charts = Array.from({ length: 15 });

//   return (
//     <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 p-4">
//       {charts.map((_, index) => {
//         const type = chartTypes[index % chartTypes.length];
//         return (
//           <ChartCard
//             key={index}
//             title={`पेशाको अनुसार घरधुरी`}
//             loading={loading}
//           >
//             <GenericChartPreview
//               type={type}
//               labelKey="profession"
//               valueKey="households"
//               chartLabel="पेशा"
//               title={`पेशाको अनुसार घरधुरी वृत्तचित्र (${type})`}
//             />
//           </ChartCard>
//         );
//       })}
//     </div>
//   );
// };

// export default ChartGrid;

import React, { useEffect, useState } from "react";
import ChartCard from "./ChartCard";
import GenericChartPreview from "./GenericChartPreview";

const chartTypes = ["bar", "pie", "line", "doughnut"];

const ChartGrid = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // Simulates a loading state for 1.5 seconds
    const timer = setTimeout(() => setloading(false), 1500);
    // Cleans up the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Creates an array of 15 undefined elements to map over
  const charts = Array.from({ length: 15 });

  return (
    // Responsive grid layout for chart cards
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 p-4">
      {charts.map((_, index) => {
        // Cycles through chart types for each card
        const type = chartTypes[index % chartTypes.length];
        return (
          <ChartCard
            key={index} // Using index as key is acceptable here due to static array
            title={`पेशाको अनुसार घरधुरी`} // Title for the chart card
            loading={loading} // Passes the loading state to ChartCard
          >
            {/* Renders a generic chart preview within the card */}
            <GenericChartPreview
              type={type} // Type of chart (bar, pie, line, doughnut)
              labelKey="profession" // Key for the label data
              valueKey="households" // Key for the value data
              chartLabel="पेशा" // Label for the chart
              title={`पेशाको अनुसार घरधुरी वृत्तचित्र (${type})`} // Title for the chart preview itself
            />
          </ChartCard>
        );
      })}
    </div>
  );
};

export default ChartGrid;
