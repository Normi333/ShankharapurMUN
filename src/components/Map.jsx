import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/map.css";

import roadData from "../data/Roads_map.json";
import ForestData from "../data/Forest2_map.json";
import BuildingData from "../data/Buildings_map.json";
import RiverData from "../data/River_map.json";

function Map({ selectedLayers }) {
  const position = [27.770975, 85.517033];

  const roadStyle = (feature) => {
    const roadType = feature.properties.Type;
    if (selectedLayers.includes("roads-Internal") && roadType === "Internal") {
      return {
        weight: 3,
        color: "purple",
      };
    } else if (
      selectedLayers.includes("roads-External") &&
      roadType === "External"
    ) {
      return {
        weight: 3,
        color: "orange",
      };
    }
    // If "roads-all" is selected, apply a default style for roads not explicitly toggled
    // Or, if no specific road type is selected but "roads-all" is, apply a general style.
    if (selectedLayers.includes("roads-all")) {
      return {
        weight: 2,
        color: "yellow",
      };
    }
    // If neither specific types nor "roads-all" is selected, don't display
    return { opacity: 0, fillOpacity: 0 }; // Make it invisible
  };

  const BuildingStyle = (feature) => {
    const BuildingType = feature.properties.Type;
    if (
      selectedLayers.includes("buildings-Residential") &&
      BuildingType === "Residential"
    ) {
      return {
        weight: 2,
        color: "red",
      };
    } else if (
      selectedLayers.includes("buildings-Government-Agro Office") &&
      BuildingType === "Government-Agro Office"
    ) {
      return {
        weight: 8,
        color: "blue",
      };
    } else if (
      selectedLayers.includes("buildings-Government") &&
      BuildingType === "Government office"
    ) {
      return {
        weight: 8,
        color: "green",
      };
    } else if (
      selectedLayers.includes("buildings-Finance") &&
      BuildingType === "Finance Company"
    ) {
      return {
        weight: 8,
        color: "purple",
      };
    } else if (
      selectedLayers.includes("buildings-Hotel") &&
      BuildingType === "Hotels"
    ) {
      return {
        weight: 8,
        color: "yellow",
      };
    }
    // Similar to roads, handle "buildings-all"
    if (selectedLayers.includes("buildings-all")) {
      return {
        weight: 2,
        color: "gray", // Default color for buildings
      };
    }
    return { opacity: 0, fillOpacity: 0 }; // Make it invisible
  };

  const ForestStyle = {
    weight: 1.5,
    color: "green",
  };

  const RiverStyle = {
    weight: 3,
    color: "blue",
  };

  const onEachRoad = (feature, layer) => {
    const { FID, Id, Type, Name, Details } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>ID:</b> ${Id}<br/>
      <b>Type:</b> ${Type}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
      <b>Details:</b> ${Details || "N/A"}<br/>
    `);
  };

  const onEachForest = (feature, layer) => {
    const { FID, Id } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Id:</b> ${Id}<br/>
    `);
  };

  const onEachBuilding = (feature, layer) => {
    const { FID, Id, Type } = feature.properties; // Use 'Type' as defined in your style function
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Id:</b> ${Id}<br/>
      <b>Type:</b> ${Type || "N/A"}<br/>
    `);
  };

  const onEachRiver = (feature, layer) => {
    const { FID, Id } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Id:</b> ${Id}<br/>
    `);
  };

  // Filter function for GeoJSON data based on selected layers
  const filterRoads = (feature) => {
    const roadType = feature.properties.Type;
    return (
      selectedLayers.includes("roads-all") ||
      (selectedLayers.includes("roads-Internal") && roadType === "Internal") ||
      (selectedLayers.includes("roads-External") && roadType === "External")
    );
  };

  const filterBuildings = (feature) => {
    const buildingType = feature.properties.Type;
    return (
      selectedLayers.includes("buildings-all") ||
      (selectedLayers.includes("buildings-Residential") &&
        buildingType === "Residential") ||
      (selectedLayers.includes("buildings-Government-Agro Office") &&
        buildingType === "Government-Agro Office") ||
      (selectedLayers.includes("buildings-Government") &&
        buildingType === "Government office") ||
      (selectedLayers.includes("buildings-Finance") &&
        buildingType === "Finance Company") ||
      (selectedLayers.includes("buildings-Hotel") && buildingType === "Hotels")
    );
  };

  return (
    <div className="map-area">
      <MapContainer
        center={position}
        zoom={14}
        zoomControl={false}
        className="map"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              attribution="&copy; Google"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Roads Layer */}
        {(selectedLayers.includes("roads-all") ||
          selectedLayers.includes("roads-Internal") ||
          selectedLayers.includes("roads-External")) && (
          <GeoJSON
            data={roadData}
            style={roadStyle} // Apply dynamic styling based on selected sub-types
            onEachFeature={onEachRoad}
            filter={filterRoads} // Filter which features to display
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

        {/* Buildings Layer */}
        {(selectedLayers.includes("buildings-all") ||
          selectedLayers.includes("buildings-Residential") ||
          selectedLayers.includes("buildings-Government-Agro Office") ||
          selectedLayers.includes("buildings-Government") ||
          selectedLayers.includes("buildings-Finance") ||
          selectedLayers.includes("buildings-Hotel")) && (
          <GeoJSON
            data={BuildingData}
            style={BuildingStyle} // Apply dynamic styling based on selected sub-types
            onEachFeature={onEachBuilding}
            filter={filterBuildings} // Filter which features to display
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
      </MapContainer>
    </div>
  );
}

export default Map;
