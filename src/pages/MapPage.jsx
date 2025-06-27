import React, { useState } from "react";
import Map from "../components/Map";
import Header from "../partials/Header";
import MapSidebar from "../partials/MapSidebar";
import Legend from "../components/Legend";

const MapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Updated layerCategories to match Sidebar and Map logic
  const layerCategories = {
    baseLayers: {
      title: "Base",
      layers: [
        { id: "border", name: "Border" },
        { id: "napi", name: "Napi Border" },
      ],
    },
    buildingLayers: {
      title: "Infrastructure",
      layers: [
        // Removed { id: "buildings-all", name: "All Buildings" }
        { id: "buildings-Residential", name: "Residential" },
        { id: "buildings-School", name: "School" },
        { id: "buildings-Government", name: "Government Office" },
        { id: "buildings-Hotel", name: "Hotel" },
        { id: "buildings-HealthPost", name: "Health Post" },
        { id: "buildings-Temple", name: "Temple" }, // Added Temple
        { id: "buildings-Stupa", name: "Stupa" }, // Added Stupa
      ],
    },
    transportationLayers: {
      title: "Transportation",
      layers: [
        // Consolidated to a single "roads" option
        { id: "roads", name: "Roads" },
      ],
    },
    naturalResourcesLayers: {
      title: "Natural Resources",
      layers: [
        { id: "forest", name: "Forest" },
        { id: "river", name: "River" },
      ],
    },
    publicPlaceLayers: {
      title: "Public Place",
      layers: [{ id: "public", name: "Public Place" }],
    },
  };

  // 'allLayerIds' is useful if you have a "select all" feature,
  // otherwise, it's not strictly necessary for basic toggling.
  // Kept for completeness if it's used elsewhere.
  const allLayerIds = Object.values(layerCategories).flatMap((category) =>
    category.layers.map((layer) => layer.id)
  );

  // 'selectedLayers' will now correctly include 'border' by default
  const [selectedLayers, setSelectedLayers] = useState(["border"]);

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
          <div className="h-full w-full">
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
