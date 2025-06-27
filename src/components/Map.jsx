import React, { useState, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/map.css";
import { FaHome } from "react-icons/fa"; // Import the Home icon

import roadData from "../data/Roads_Clip.json";
import ForestData from "../data/Forest_Clip.json";
import BuildingData from "../data/Buildings_Clip.json";
import RiverData from "../data/River_Clip.json";
import BorderData from "../data/Current_Border.json";
import PublicData from "../data/Public_Place_Clip.json";
import NapiData from "../data/Napi_Border_Clip.json";

// SetViewOnClick is used for click-to-pan functionality
function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true, // Always animate on click
    });
  });
  return null;
}

// Component for the Reset button functionality
function ResetMapButton({ map, resetCenter, resetZoom }) {
  const handleReset = useCallback(() => {
    if (map) {
      map.setView(resetCenter, resetZoom);
    }
  }, [map, resetCenter, resetZoom]); // Dependencies for useCallback

  if (!map) {
    return null; // Don't render the button until map instance is available
  }

  return (
    <div
      style={{
        position: "absolute",
        // Position just below the zoom controls (top-left)
        top: "90px", // Adjusted from 10px (top margin) + 60-70px (approx height of zoom controls) + 10px (spacing)
        left: "20px", // Aligned with the left side of the zoom control
        zIndex: 1000, // Ensure it's above other map elements
      }}
    >
      <button
        onClick={handleReset}
        title="नक्सा रिसेट गर्नुहोस्" // Tooltip for accessibility
        className="p-2 bg-white text-blue-600 border border-gray-300 rounded-md cursor-pointer shadow-md flex items-center justify-center w-9 h-9 text-base hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
      >
        <FaHome size={20} /> {/* Home icon */}
      </button>
    </div>
  );
}

function Map({ selectedLayers }) {
  const [map, setMap] = useState(null);

  const initialPosition = [27.77558, 85.518073];
  const initialZoom = 14;

  const roadStyle = () => {
    if (selectedLayers.includes("roads")) {
      return {
        weight: 2,
        color: "black", // Default color for all roads
      };
    }
    return { opacity: 0, fillOpacity: 0 }; // Invisible if "roads" is not selected
  };

  // Modified BuildingStyle to prioritize specific types, including Temple and Stupa
  const BuildingStyle = (feature) => {
    const BuildingType = feature.properties.Type;

    // Specific types take precedence
    if (
      selectedLayers.includes("buildings-School") &&
      BuildingType === "School"
    ) {
      return {
        weight: 8,
        color: "blue",
      };
    } else if (
      selectedLayers.includes("buildings-Government") &&
      BuildingType === "Government Office"
    ) {
      return {
        weight: 8,
        color: "green",
      };
    } else if (
      selectedLayers.includes("buildings-HealthPost") &&
      BuildingType === "Health Post"
    ) {
      return {
        weight: 8,
        color: "purple",
      };
    } else if (
      selectedLayers.includes("buildings-Hotel") &&
      BuildingType === "Hotel"
    ) {
      return {
        weight: 8,
        color: "yellow",
      };
    }
    // Added Temple and Stupa styles
    else if (
      selectedLayers.includes("buildings-Temple") &&
      BuildingType === "Temple"
    ) {
      return {
        weight: 6, // Slightly less prominent than government/schools
        color: "brown",
      };
    } else if (
      selectedLayers.includes("buildings-Stupa") &&
      BuildingType === "Stupa"
    ) {
      return {
        weight: 6,
        color: "cyan",
      };
    }
    // Residential is the base; it's shown if 'buildings-Residential' is active
    // OR if any other building layer is active (to act as the base)
    else if (
      selectedLayers.includes("buildings-Residential") &&
      BuildingType === "Residential"
    ) {
      return {
        weight: 2,
        color: "red", // Default color for residential
      };
    }
    return { opacity: 0, fillOpacity: 0 }; // Make it invisible otherwise
  };

  const ForestStyle = {
    weight: 1.5,
    color: "green",
  };

  const RiverStyle = {
    weight: 5,
    color: "lightblue",
  };

  const BorderStyle = {
    weight: 3,
    color: "red",
  };

  const PublicStyle = {
    weight: 3,
    color: "purple",
  };

  const NapiStyle = {
    weight: 3,
    color: "blue",
  };

  const onEachPublic = (feature, layer) => {
    const { TYPE, Name } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${TYPE}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
    `);
  };

  const onEachRoad = (feature, layer) => {
    const { Type, Name, Details } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${Type}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
      <b>Details:</b> ${Details || "N/A"}<br/>
    `);
  };

  const onEachForest = (feature, layer) => {
    const { Forest_Nam } = feature.properties;
    layer.bindPopup(`
      <b>Forest Name:</b> ${Forest_Nam || "N/A"}<br/>
    `);
  };

  const onEachBuilding = (feature, layer) => {
    const { Type, House_No, Name } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${Type || "N/A"}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
      <b>House No:</b> ${House_No || "N/A"}<br/>
    `);
  };

  const onEachRiver = (feature, layer) => {
    const { Name_River } = feature.properties;
    layer.bindPopup(`
      <b>Id:</b> ${Name_River || "N/A"}<br/>
    `);
  };

  const filterRoads = () => {
    return selectedLayers.includes("roads");
  };

  // Modified filterBuildings to always include Residential if any building layer is active,
  // and also include Temple/Stupa if their layers are active.
  const filterBuildings = (feature) => {
    const buildingType = feature.properties.Type;

    // Check if any specific building type is selected, or if residential is specifically selected
    const anyBuildingLayerSelected =
      selectedLayers.includes("buildings-Residential") ||
      selectedLayers.includes("buildings-School") ||
      selectedLayers.includes("buildings-Government") ||
      selectedLayers.includes("buildings-HealthPost") ||
      selectedLayers.includes("buildings-Hotel") ||
      selectedLayers.includes("buildings-Temple") || // Added Temple
      selectedLayers.includes("buildings-Stupa"); // Added Stupa

    if (!anyBuildingLayerSelected) {
      return false; // If no building layers are selected at all, hide everything
    }

    // Always include Residential if any building layer is active
    if (buildingType === "Residential") {
      return true;
    }

    // Otherwise, include the building only if its specific type is selected
    return (
      (selectedLayers.includes("buildings-School") &&
        buildingType === "School") ||
      (selectedLayers.includes("buildings-Government") &&
        buildingType === "Government Office") ||
      (selectedLayers.includes("buildings-HealthPost") &&
        buildingType === "Health Post") ||
      (selectedLayers.includes("buildings-Hotel") &&
        buildingType === "Hotel") ||
      (selectedLayers.includes("buildings-Temple") &&
        buildingType === "Temple") || // Added Temple
      (selectedLayers.includes("buildings-Stupa") && buildingType === "Stupa") // Added Stupa
    );
  };

  const memoizedMapContainer = useMemo(
    () => (
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        zoomControl={true}
        className="map"
        ref={setMap}
      >
        {map && (
          <ResetMapButton
            map={map}
            resetCenter={initialPosition}
            resetZoom={initialZoom}
          />
        )}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetViewOnClick />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              attribution="&copy; Google"
            />
            <SetViewOnClick />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Roads Layer */}
        {selectedLayers.includes("roads") && (
          <GeoJSON
            data={roadData}
            style={roadStyle}
            onEachFeature={onEachRoad}
            filter={filterRoads}
          />
        )}

        {/* Forest Layer */}
        {selectedLayers.includes("forest") && (
          <GeoJSON
            data={ForestData}
            style={ForestStyle}
            onEachFeature={onEachForest}
          />
        )}

        {/* Buildings Layer: Renders if ANY building-related layer is selected */}
        {(selectedLayers.includes("buildings-Residential") ||
          selectedLayers.includes("buildings-School") ||
          selectedLayers.includes("buildings-Government") ||
          selectedLayers.includes("buildings-HealthPost") ||
          selectedLayers.includes("buildings-Hotel") ||
          selectedLayers.includes("buildings-Temple") || // Added Temple
          selectedLayers.includes("buildings-Stupa")) && ( // Added Stupa
          <GeoJSON
            data={BuildingData}
            style={BuildingStyle} // Styles specific types, with Residential as base
            onEachFeature={onEachBuilding}
            filter={filterBuildings} // Filters to include Residential if any building layer is active
          />
        )}

        {/* River Layer */}
        {selectedLayers.includes("river") && (
          <GeoJSON
            data={RiverData}
            style={RiverStyle}
            onEachFeature={onEachRiver}
          />
        )}
        {selectedLayers.includes("border") && (
          <GeoJSON data={BorderData} style={BorderStyle} />
        )}
        {selectedLayers.includes("public") && (
          <GeoJSON
            data={PublicData}
            style={PublicStyle}
            onEachFeature={onEachPublic}
          />
        )}
        {selectedLayers.includes("napi") && (
          <GeoJSON data={NapiData} style={NapiStyle} />
        )}
      </MapContainer>
    ),
    [
      map,
      initialPosition,
      initialZoom,
      selectedLayers,
      roadStyle,
      BuildingStyle,
      filterRoads,
      filterBuildings,
    ]
  );

  return <div className="map-area">{memoizedMapContainer}</div>;
}

export default Map;
