// // card.jsx
// import React from "react";

// const ChartCard = ({ children, loading = false, title }) => {
//   return (
//     // Change to flex-col to stack title and content vertically
//     // Remove items-center and space-x-4 from here, as they're for row layouts
//     <div className="bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[200px]">
//       {/* Add a title div if you want titles consistent for all cards */}
//       {title && (
//         <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-full min-h-[150px] text-gray-500 flex-grow">
//           {" "}
//           {/* Add flex-grow and min-h */}
//           Loading...
//         </div>
//       ) : (
//         // This div will grow to fill available vertical space
//         // and center its content (the chart)
//         <div className="flex-grow flex justify-center items-center overflow-hidden">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartCard;

// card.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaFileCsv, FaFileImage } from "react-icons/fa"; // Import icons for menu and file types

const ChartCard = ({
  children,
  loading = false,
  title,
  onDownloadSVG,
  onDownloadCSV,
  onDownloadPNG,
  enableDownloads = false, // New prop: set to true to show the download button
}) => {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Ref for the dropdown menu div
  const buttonRef = useRef(null); // Ref for the burger button

  // Effect to close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside both the menu and the button, close the menu
      if (
        showDownloadMenu && // Only run logic if menu is currently open
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDownloadMenu(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadMenu]); // Dependency on showDownloadMenu to re-attach/remove listener when menu opens/closes

  // Toggles the visibility of the dropdown menu
  const toggleMenu = () => {
    setShowDownloadMenu((prev) => !prev);
  };

  // Generic handler for download actions
  const handleDownload = (type, handler) => {
    setShowDownloadMenu(false); // Close menu immediately after selection
    if (handler) {
      handler(); // Call the provided handler function
    } else {
      // Using a simple alert for demonstration, consider a more styled message box in production
      alert(
        `Download ${type} not available. Implementation for '${title}' is missing.`
      );
      console.warn(
        `Download ${type} functionality not implemented for '${title}'. Please pass an 'onDownload${type}' prop.`
      );
    }
  };

  return (
    // Added 'relative' positioning for the dropdown menu to be positioned correctly
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[200px] relative">
      {/* Title and Burger Button Container */}
      <div className="flex justify-between items-center mb-2">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        )}
        {/* Conditional rendering of the Burger Button based on enableDownloads prop */}
        {enableDownloads && (
          <button
            ref={buttonRef} // Attach ref to the button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Chart options menu" // Accessibility label
          >
            {showDownloadMenu ? (
              <FaTimes className="text-gray-600" /> // 'X' icon when menu is open
            ) : (
              <FaBars className="text-gray-600" /> // Hamburger icon when menu is closed
            )}
          </button>
        )}
      </div>

      {/* Dropdown Menu (Popup) - Only shown if enableDownloads is true AND showDownloadMenu is true */}
      {enableDownloads && showDownloadMenu && (
        <div
          ref={menuRef} // Attach ref to the menu div
          // Position the menu as a popup relative to the ChartCard
          className="absolute right-4 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden" // z-20 ensures it's above most content
        >
          <button
            onClick={() => handleDownload("SVG", onDownloadSVG)}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <FaFileImage className="text-blue-500" />
            <span>Download SVG</span>
          </button>
          <button
            onClick={() => handleDownload("CSV", onDownloadCSV)}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <FaFileCsv className="text-green-500" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={() => handleDownload("PNG", onDownloadPNG)}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <FaFileImage className="text-purple-500" />{" "}
            {/* Reusing FaFileImage for PNG */}
            <span>Download PNG</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-full min-h-[150px] text-gray-500 flex-grow">
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
