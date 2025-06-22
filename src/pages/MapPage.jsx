// import React, { useState } from "react";
// import Map from "../components/Map";
// import Header from "../partials/Header";
// import MapSidebar from "../partials/MapSidebar"; // Note: This is where your Sidebar component is imported as MapSidebar
// import Legend from "../components/Legend";

// const MapPage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const layerCategories = {
//     baseLayers: {
//       title: "Base",
//       layers: [{ id: "river", name: "River" }],
//     },
//     buildingLayers: {
//       title: "Infrastructure",
//       layers: [
//         { id: "buildings-all", name: "All Buildings" },
//         { id: "buildings-Residential", name: "Residential" },
//         {
//           id: "buildings-Government-Agro Office",
//           name: "Government-Agro Office",
//         },
//         { id: "buildings-Government", name: "Government Office" },
//         { id: "buildings-Hotel", name: "Hotel" },
//         { id: "buildings-Finance", name: "Finance Company" },
//       ],
//     },
//     transportationLayers: {
//       title: "Transportation",
//       layers: [
//         { id: "roads-all", name: "All Roads" },
//         { id: "roads-Internal", name: "Internal Roads" },
//         { id: "roads-External", name: "External Roads" },
//       ],
//     },
//     naturalResourcesLayers: {
//       title: "Natural Resources",
//       layers: [{ id: "forest", name: "Forest" }],
//     },
//   };

//   // --- Generate an array of all layer IDs from your layerCategories ---
//   const allLayerIds = Object.values(layerCategories).flatMap((category) =>
//     category.layers.map((layer) => layer.id)
//   );

//   // --- Initialize selectedLayers state with all available layer IDs ---
//   const [selectedLayers, setSelectedLayers] = useState(allLayerIds);

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-0 z-[1010] md:static md:translate-x-0 transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:z-auto`}
//       >
//         <MapSidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           selectedLayers={selectedLayers}
//           setSelectedLayers={setSelectedLayers}
//         />
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Page content */}
//         <div className="flex-1 p-6 overflow-hidden">
//           <div className="h-full w-full bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700 flex flex-col">
//             {/* Header inside card */}
//             <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0 z-10 bg-white dark:bg-gray-800">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//                 Shankharapur Map
//               </h2>
//             </div>

//             {/* Map section */}
//             <div className="relative flex-1 overflow-hidden">
//               <div className="h-full w-full">
//                 <Map selectedLayers={selectedLayers} />
//               </div>
//               <div
//                 className="absolute bottom-4 right-4 z-[1001] rounded shadow-lg p-2"
//                 style={{
//                   backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black
//                   backdropFilter: "blur(4px)", // optional: blur behind the legend
//                   transition: "background-color 0.3s ease", // smooth fade
//                 }}
//               >
//                 <Legend selectedLayers={selectedLayers} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapPage;

import React, { useState } from "react";
import Map from "../components/Map";
import Header from "../partials/Header";
import MapSidebar from "../partials/MapSidebar";
import Legend from "../components/Legend";

const MapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const layerCategories = {
    baseLayers: {
      title: "Base",
      layers: [{ id: "river", name: "River" }],
    },
    buildingLayers: {
      title: "Infrastructure",
      layers: [
        { id: "buildings-all", name: "All Buildings" },
        { id: "buildings-Residential", name: "Residential" },
        {
          id: "buildings-Government-Agro Office",
          name: "Government-Agro Office",
        },
        { id: "buildings-Government", name: "Government Office" },
        { id: "buildings-Hotel", name: "Hotel" },
        { id: "buildings-Finance", name: "Finance Company" },
      ],
    },
    transportationLayers: {
      title: "Transportation",
      layers: [
        { id: "roads-all", name: "All Roads" },
        { id: "roads-Internal", name: "Internal Roads" },
        { id: "roads-External", name: "External Roads" },
      ],
    },
    naturalResourcesLayers: {
      title: "Natural Resources",
      layers: [{ id: "forest", name: "Forest" }],
    },
  };

  const allLayerIds = Object.values(layerCategories).flatMap((category) =>
    category.layers.map((layer) => layer.id)
  );

  const [selectedLayers, setSelectedLayers] = useState(allLayerIds);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-[1010] md:static md:translate-x-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:z-auto`}
      >
        <MapSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content - This will now directly contain the map */}
        <div className="flex-1 relative overflow-hidden">
          {" "}
          {/* Removed padding and inner card structure */}
          <div className="h-full w-full">
            {" "}
            {/* Map directly fills this container */}
            <Map selectedLayers={selectedLayers} />
          </div>
          {/* Legend - positioned absolutely over the map */}
          <div
            className="absolute bottom-4 right-4 z-[1001] rounded shadow-lg p-2"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.3s ease",
            }}
          >
            <Legend selectedLayers={selectedLayers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
