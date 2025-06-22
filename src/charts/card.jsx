// src/components/charts/ChartCard.jsx (or whatever your path is)
import React, { useState, useEffect } from "react";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import Skeleton from "./Skeleton"; // Adjust path as needed for your project structure

const ChartCard = ({
  title,
  children,
  loading = false,
  disableExpand = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Effect to manage body scroll when expanded
  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <>
      {/* Overlay for expanded state */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          onClick={toggleExpand}
        />
      )}

      {/* Main card container */}
      <div
        className={`${
          isExpanded
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] max-w-[1200px] max-h-[800px] z-[999] bg-white rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.6)]"
            : "relative max-h-[500px]" // Added max-h for default state here
        } border border-gray-300 bg-white shadow-md flex flex-col transition-all duration-300 overflow-hidden rounded-md`}
        // Added overflow-hidden to the card itself and rounded-md for consistency
      >
        {/* Card header */}
        <div className="bg-[#234A83] text-white px-4 py-3 flex justify-between items-center flex-shrink-0">
          {loading ? (
            <Skeleton width={120} height={20} />
          ) : (
            <>
              <h3 className="text-[16px] font-[Kalimati] m-0 flex-grow">
                {title}
              </h3>
              {!disableExpand && ( // Only show expand/compress button if not disabled
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={toggleExpand}
                >
                  {isExpanded ? (
                    <FaCompressAlt
                      title="Minimize"
                      className="text-white text-sm"
                    />
                  ) : (
                    <FaExpandAlt
                      title="Maximize"
                      className="text-white text-sm"
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Card content area */}
        <div
          className={`flex-1 flex flex-col px-4 py-4 ${
            isExpanded ? "p-8" : "overflow-auto" // Set overflow-auto for default state content
          }`}
          // The overflow-hidden for expanded state is now on the card container
          // Removed original overflow-hidden from here and replaced with overflow-auto for default
        >
          {loading ? (
            <Skeleton height="100%" />
          ) : (
            // Clones children and passes isExpanded prop
            React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, { isExpanded })
                : child
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ChartCard;
