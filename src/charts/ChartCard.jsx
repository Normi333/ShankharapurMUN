// import React, { useState, useEffect } from "react";
// import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
// import Skeleton from "./Skeleton";

// const ChartCard = ({ title, children, loading = false }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = isExpanded ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isExpanded]);

//   const toggleExpand = () => setIsExpanded((prev) => !prev);

//   return (
//     <>
//       {isExpanded && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
//           onClick={toggleExpand}
//         />
//       )}

//       <div
//         className={`${
//           isExpanded
//             ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[69vw] h-[69vh] z-[999] bg-white rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.6)]"
//             : "relative h-[455px] m-4"
//         } border border-gray-300 bg-white shadow-md flex flex-col transition-all duration-300`}
//       >
//         <div className="bg-[#003893] text-white px-4 py-3 flex justify-between items-center">
//           {loading ? (
//             <Skeleton width="{120} height={20}" />
//           ) : (
//             <>
//               <h3 className="text-[16px] font-[Kalimati] m-0">{title}</h3>
//               <div className="flex gap-2 cursor-pointer" onClick={toggleExpand}>
//                 {isExpanded ? (
//                   <FaCompressAlt
//                     title="Minimize"
//                     className="text-white text-sm"
//                   />
//                 ) : (
//                   <FaExpandAlt
//                     title="Maximize"
//                     className="text-white text-sm"
//                   />
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//         <div
//           className={`flex-1 flex flex-col overflow-hidden px-4 py-4 ${
//             isExpanded ? "mt-[3%] ml-[9%] justify-center items-center" : ""
//           }`}
//         >
//           {loading ? (
//             <Skeleton height={200} />
//           ) : (
//             React.Children.map(children, (child) =>
//               React.cloneElement(child, { isExpanded })
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChartCard;

import React, { useState, useEffect } from "react";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import Skeleton from "./Skeleton"; // Assuming Skeleton component is correctly imported

const ChartCard = ({ title, children, loading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Toggles body overflow to prevent scrolling when expanded
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
    return () => {
      // Resets body overflow when component unmounts or isExpanded changes
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
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[69vw] h-[69vh] z-[999] bg-white rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.6)]"
            : "relative h-[455px] m-4"
        } border border-gray-300 bg-white shadow-md flex flex-col transition-all duration-300`}
      >
        {/* Card header */}
        <div className="bg-[#003893] text-white px-4 py-3 flex justify-between items-center">
          {loading ? (
            // Fixed Skeleton width and height props
            <Skeleton width={120} height={20} />
          ) : (
            <>
              <h3 className="text-[16px] font-[Kalimati] m-0">{title}</h3>
              <div className="flex gap-2 cursor-pointer" onClick={toggleExpand}>
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
            </>
          )}
        </div>

        {/* Card content area */}
        <div
          className={`flex-1 flex flex-col overflow-hidden px-4 py-4 ${
            // Removed conflicting margins for proper centering in expanded state
            isExpanded ? "justify-center items-center" : ""
          }`}
        >
          {loading ? (
            <Skeleton height={200} />
          ) : (
            // Clones children and passes isExpanded prop
            React.Children.map(children, (child) =>
              React.cloneElement(child, { isExpanded })
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ChartCard;
