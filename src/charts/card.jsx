// card.jsx
import React from "react";

const ChartCard = ({ children, loading = false, title }) => {
  return (
    // Change to flex-col to stack title and content vertically
    // Remove items-center and space-x-4 from here, as they're for row layouts
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[200px]">
      {/* Add a title div if you want titles consistent for all cards */}
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-full min-h-[150px] text-gray-500 flex-grow">
          {" "}
          {/* Add flex-grow and min-h */}
          Loading...
        </div>
      ) : (
        // This div will grow to fill available vertical space
        // and center its content (the chart)
        <div className="flex-grow flex justify-center items-center overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
