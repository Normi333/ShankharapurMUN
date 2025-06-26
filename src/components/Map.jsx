// import {
//   MapContainer,
//   TileLayer,
//   GeoJSON,
//   LayersControl,
//   useMapEvent,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "../css/map.css";

// import roadData from "../data/2nd_roads_shakarapur.json";
// import ForestData from "../data/Forest_shankarapur.json";
// import BuildingData from "../data/Buildings_shankarapur.json";
// import RiverData from "../data/River_Shankarapur.json";
// import BorderData from "../data/Border_Shankarapur.json";

// function SetViewOnClick({ animateRef }) {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       // animate: animateRef.current || false,
//       animate: true,
//     });
//   });

//   return null;
// }

// function Map({ selectedLayers }) {
//   // const animateRef = useRef(false);

//   const position = [27.77558, 85.518073];

//   const roadStyle = (feature) => {
//     const roadType = feature.properties.Type;
//     if (selectedLayers.includes("roads-Internal") && roadType === "Internal") {
//       return {
//         weight: 3,
//         color: "yellow",
//       };
//     } else if (
//       selectedLayers.includes("roads-External") &&
//       roadType === "External"
//     ) {
//       return {
//         weight: 3,
//         color: "orange",
//       };
//     }
//     // If "roads-all" is selected, apply a default style for roads not explicitly toggled
//     // Or, if no specific road type is selected but "roads-all" is, apply a general style.
//     if (selectedLayers.includes("roads-all")) {
//       return {
//         weight: 2,
//         color: "black",
//       };
//     }
//     // If neither specific types nor "roads-all" is selected, don't display
//     return { opacity: 0, fillOpacity: 0 }; // Make it invisible
//   };

//   const BuildingStyle = (feature) => {
//     const BuildingType = feature.properties.Type;
//     if (
//       selectedLayers.includes("buildings-Residential") &&
//       BuildingType === "Residential"
//     ) {
//       return {
//         weight: 2,
//         color: "red",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Government-Agro Office") &&
//       BuildingType === "Government Agro Office"
//     ) {
//       return {
//         weight: 8,
//         color: "blue",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Government") &&
//       BuildingType === "Government Office"
//     ) {
//       return {
//         weight: 8,
//         color: "green",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Finance") &&
//       BuildingType === "Finance Company"
//     ) {
//       return {
//         weight: 8,
//         color: "purple",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Hotel") &&
//       BuildingType === "Hotels"
//     ) {
//       return {
//         weight: 8,
//         color: "yellow",
//       };
//     }
//     // Similar to roads, handle "buildings-all"
//     if (selectedLayers.includes("buildings-all")) {
//       return {
//         weight: 2,
//         color: "gray", // Default color for buildings
//       };
//     }
//     return { opacity: 0, fillOpacity: 0 }; // Make it invisible
//   };

//   const ForestStyle = {
//     weight: 1.5,
//     color: "green",
//   };

//   const RiverStyle = {
//     weight: 3,
//     color: "blue",
//   };

//   const BorderStyle = {
//     weight: 3,
//     color: "red",
//   };

//   const onEachRoad = (feature, layer) => {
//     const { FID, Id, Type, Name, Details } = feature.properties;
//     layer.bindPopup(`
//       <b>FID:</b> ${FID}<br/>
//       <b>ID:</b> ${Id}<br/>
//       <b>Type:</b> ${Type}<br/>
//       <b>Name:</b> ${Name || "N/A"}<br/>
//       <b>Details:</b> ${Details || "N/A"}<br/>
//     `);
//   };

//   const onEachForest = (feature, layer) => {
//     const { FID, Forest_Nam } = feature.properties;
//     layer.bindPopup(`
//       <b>FID:</b> ${FID}<br/>
//       <b>Forest Name:</b> ${Forest_Nam || "N/A"}<br/>
//     `);
//   };

//   const onEachBuilding = (feature, layer) => {
//     const { FID, Id, Type, House_No } = feature.properties; // Use 'Type' as defined in your style function
//     layer.bindPopup(`
//       <b>FID:</b> ${FID}<br/>
//       <b>Id:</b> ${Id}<br/>
//       <b>Type:</b> ${Type || "N/A"}<br/>
//       <b>House No:</b> ${House_No || "N/A"}<br/>
//     `);
//   };

//   const onEachRiver = (feature, layer) => {
//     const { FID, Id, Name_River } = feature.properties;
//     layer.bindPopup(`
//       <b>FID:</b> ${FID}<br/>
//       <b>Id:</b> ${Id}<br/>
//       <b>Id:</b> ${Name_River || "N/A"}<br/>
//     `);
//   };

//   // Filter function for GeoJSON data based on selected layers
//   const filterRoads = (feature) => {
//     const roadType = feature.properties.Type;
//     return (
//       selectedLayers.includes("roads-all") ||
//       (selectedLayers.includes("roads-Internal") && roadType === "Internal") ||
//       (selectedLayers.includes("roads-External") && roadType === "External")
//     );
//   };

//   const filterBuildings = (feature) => {
//     const buildingType = feature.properties.Type;
//     return (
//       selectedLayers.includes("buildings-all") ||
//       (selectedLayers.includes("buildings-Residential") &&
//         buildingType === "Residential") ||
//       (selectedLayers.includes("buildings-Government-Agro Office") &&
//         buildingType === "Government Agro Office") ||
//       (selectedLayers.includes("buildings-Government") &&
//         buildingType === "Government Office") ||
//       (selectedLayers.includes("buildings-Finance") &&
//         buildingType === "Finance Company") ||
//       (selectedLayers.includes("buildings-Hotel") && buildingType === "Hotels")
//     );
//   };

//   return (
//     <div className="map-area">
//       <MapContainer
//         center={position}
//         zoom={14}
//         zoomControl={false}
//         className="map"
//       >
//         <LayersControl position="topright">
//           <LayersControl.BaseLayer checked name="OpenStreetMap">
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <SetViewOnClick />
//           </LayersControl.BaseLayer>

//           <LayersControl.BaseLayer name="Google Satellite">
//             <TileLayer
//               url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
//               attribution="&copy; Google"
//             />
//             <SetViewOnClick />
//           </LayersControl.BaseLayer>
//         </LayersControl>

//         {/* Roads Layer */}
//         {(selectedLayers.includes("roads-all") ||
//           selectedLayers.includes("roads-Internal") ||
//           selectedLayers.includes("roads-External")) && (
//           <GeoJSON
//             data={roadData}
//             style={roadStyle} // Apply dynamic styling based on selected sub-types
//             onEachFeature={onEachRoad}
//             filter={filterRoads} // Filter which features to display
//           />
//         )}

//         {/* Forest Layer */}
//         {selectedLayers.includes("forest") && (
//           <GeoJSON
//             data={ForestData}
//             style={ForestStyle}
//             onEachFeature={onEachForest}
//           />
//         )}

//         {/* Buildings Layer */}
//         {(selectedLayers.includes("buildings-all") ||
//           selectedLayers.includes("buildings-Residential") ||
//           selectedLayers.includes("buildings-Government-Agro Office") ||
//           selectedLayers.includes("buildings-Government") ||
//           selectedLayers.includes("buildings-Finance") ||
//           selectedLayers.includes("buildings-Hotel")) && (
//           <GeoJSON
//             data={BuildingData}
//             style={BuildingStyle} // Apply dynamic styling based on selected sub-types
//             onEachFeature={onEachBuilding}
//             filter={filterBuildings} // Filter which features to display
//           />
//         )}

//         {/* River Layer */}
//         {selectedLayers.includes("river") && (
//           <GeoJSON
//             data={RiverData}
//             style={RiverStyle}
//             onEachFeature={onEachRiver}
//           />
//         )}
//         {selectedLayers.includes("border") && (
//           <GeoJSON data={BorderData} style={BorderStyle} />
//         )}
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;

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

  const roadStyle = (feature) => {
    const roadType = feature.properties.Type;
    if (selectedLayers.includes("roads-Internal") && roadType === "Internal") {
      return {
        weight: 3,
        color: "yellow",
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
    if (selectedLayers.includes("roads-all")) {
      return {
        weight: 2,
        color: "black",
      };
    }
    return { opacity: 0, fillOpacity: 0 };
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
      BuildingType === "Government Agro Office"
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
    if (selectedLayers.includes("buildings-all")) {
      return {
        weight: 2,
        color: "gray",
      };
    }
    return { opacity: 0, fillOpacity: 0 };
  };

  const ForestStyle = {
    weight: 1.5,
    color: "green",
  };

  const RiverStyle = {
    weight: 3,
    color: "blue",
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
    color: "orange",
  };

  const onEachPublic = (feature, layer) => {
    const { TYPE, Name } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${TYPE}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
    `);
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
    const { FID, Forest_Nam } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Forest Name:</b> ${Forest_Nam || "N/A"}<br/>
    `);
  };

  const onEachBuilding = (feature, layer) => {
    const { FID, Id, Type, House_No } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Id:</b> ${Id}<br/>
      <b>Type:</b> ${Type || "N/A"}<br/>
      <b>House No:</b> ${House_No || "N/A"}<br/>
    `);
  };

  const onEachRiver = (feature, layer) => {
    const { FID, Id, Name_River } = feature.properties;
    layer.bindPopup(`
      <b>FID:</b> ${FID}<br/>
      <b>Id:</b> ${Id}<br/>
      <b>Id:</b> ${Name_River || "N/A"}<br/>
    `);
  };

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
        buildingType === "Government Agro Office") ||
      (selectedLayers.includes("buildings-Government") &&
        buildingType === "Government Office") ||
      (selectedLayers.includes("buildings-Finance") &&
        buildingType === "Finance Company") ||
      (selectedLayers.includes("buildings-Hotel") && buildingType === "Hotels")
    );
  };

  const memoizedMapContainer = useMemo(
    () => (
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        zoomControl={true} // Keep zoomControl to true
        className="map"
        ref={setMap}
      >
        {/* Render the ResetMapButton here, passing the map instance and reset details */}
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
        {(selectedLayers.includes("roads-all") ||
          selectedLayers.includes("roads-Internal") ||
          selectedLayers.includes("roads-External")) && (
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

        {/* Buildings Layer */}
        {(selectedLayers.includes("buildings-all") ||
          selectedLayers.includes("buildings-Residential") ||
          selectedLayers.includes("buildings-Government-Agro Office") ||
          selectedLayers.includes("buildings-Government") ||
          selectedLayers.includes("buildings-Finance") ||
          selectedLayers.includes("buildings-Hotel")) && (
          <GeoJSON
            data={BuildingData}
            style={BuildingStyle}
            onEachFeature={onEachBuilding}
            filter={filterBuildings}
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
