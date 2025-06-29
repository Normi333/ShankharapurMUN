// import React, { useState, useMemo, useCallback } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   GeoJSON,
//   LayersControl,
//   useMapEvent,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "../css/map.css";
// import { FaHome } from "react-icons/fa"; // Import the Home icon

// import roadData from "../data/Roads_Clip.json";
// import ForestData from "../data/Forest_Clip.json";
// import BuildingData from "../data/Buildings_Clip.json";
// import RiverData from "../data/River_Clip.json";
// import BorderData from "../data/Current_Border.json";
// import PublicData from "../data/Public_Place_Clip.json";
// import NapiData from "../data/Napi_Border_Clip.json";

// // SetViewOnClick is used for click-to-pan functionality
// function SetViewOnClick() {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: true, // Always animate on click
//     });
//   });
//   return null;
// }

// // Component for the Reset button functionality
// function ResetMapButton({ map, resetCenter, resetZoom }) {
//   const handleReset = useCallback(() => {
//     if (map) {
//       map.setView(resetCenter, resetZoom);
//     }
//   }, [map, resetCenter, resetZoom]); // Dependencies for useCallback

//   if (!map) {
//     return null; // Don't render the button until map instance is available
//   }

//   return (
//     <div
//       style={{
//         position: "absolute",
//         // Position just below the zoom controls (top-left)
//         top: "90px", // Adjusted from 10px (top margin) + 60-70px (approx height of zoom controls) + 10px (spacing)
//         left: "20px", // Aligned with the left side of the zoom control
//         zIndex: 1000, // Ensure it's above other map elements
//       }}
//     >
//       <button
//         onClick={handleReset}
//         title="नक्सा रिसेट गर्नुहोस्" // Tooltip for accessibility
//         className="p-2 bg-white text-blue-600 border border-gray-300 rounded-md cursor-pointer shadow-md flex items-center justify-center w-9 h-9 text-base hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
//       >
//         <FaHome size={20} /> {/* Home icon */}
//       </button>
//     </div>
//   );
// }

// function Map({ selectedLayers }) {
//   const [map, setMap] = useState(null);

//   const initialPosition = [27.77558, 85.518073];
//   const initialZoom = 14;

//   const roadStyle = () => {
//     if (selectedLayers.includes("roads")) {
//       return {
//         weight: 2,
//         color: "black", // Default color for all roads
//       };
//     }
//     return { opacity: 0, fillOpacity: 0 }; // Invisible if "roads" is not selected
//   };

//   const PublicStyle = (feature) => {
//     const PublicType = feature.properties.Type;
//     if (
//       selectedLayers.includes("paragliding") &&
//       PublicType === "Paragliding"
//     ) {
//       return {
//         weight: 2,
//         color: "red",
//       };
//     } else if (
//       selectedLayers.includes("sarbajanik-jagga") &&
//       PublicType === "Sarbajanik Jagga"
//     ) {
//       return {
//         weight: 2,
//         color: "blue",
//       };
//     } else if (
//       selectedLayers.include("sarbajanik-bhawan") &&
//       PublicType === "Sarbajanik Bhawan"
//     ) {
//       return {
//         weight: 2,
//         color: "green",
//       };
//     } else if (
//       selectedLayers.include("football-ground") &&
//       PublicType === "Football Ground"
//     ) {
//       return {
//         weight: 2,
//         color: "yellow",
//       };
//     }
//     return { opacity: 0, fillOpacity: 0 }; // Invisible otherwise
//   };

//   // Modified BuildingStyle to prioritize specific types, including Temple and Stupa
//   const BuildingStyle = (feature) => {
//     const BuildingType = feature.properties.Type;

//     // Specific types take precedence
//     if (
//       selectedLayers.includes("buildings-School") &&
//       BuildingType === "School"
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
//       selectedLayers.includes("buildings-HealthPost") &&
//       BuildingType === "Health Post"
//     ) {
//       return {
//         weight: 8,
//         color: "purple",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Hotel") &&
//       BuildingType === "Hotel"
//     ) {
//       return {
//         weight: 8,
//         color: "yellow",
//       };
//     }
//     // Added Temple and Stupa styles
//     else if (
//       selectedLayers.includes("buildings-Temple") &&
//       BuildingType === "Temple"
//     ) {
//       return {
//         weight: 6, // Slightly less prominent than government/schools
//         color: "brown",
//       };
//     } else if (
//       selectedLayers.includes("buildings-Stupa") &&
//       BuildingType === "Stupa"
//     ) {
//       return {
//         weight: 6,
//         color: "cyan",
//       };
//     }
//     // Residential is the base; it's shown if 'buildings-Residential' is active
//     // OR if any other building layer is active (to act as the base)
//     else if (
//       selectedLayers.includes("buildings-Residential") &&
//       BuildingType === "Residential"
//     ) {
//       return {
//         weight: 2,
//         color: "red", // Default color for residential
//       };
//     }
//     return { opacity: 0, fillOpacity: 0 }; // Make it invisible otherwise
//   };

//   const ForestStyle = {
//     weight: 1.5,
//     color: "green",
//   };

//   const RiverStyle = {
//     weight: 5,
//     color: "lightblue",
//   };

//   const BorderStyle = {
//     weight: 3,
//     color: "red",
//   };

//   const NapiStyle = {
//     weight: 3,
//     color: "blue",
//   };

//   const onEachPublic = (feature, layer) => {
//     const { TYPE, Name } = feature.properties;
//     layer.bindPopup(`
//       <b>Type:</b> ${TYPE}<br/>
//       <b>Name:</b> ${Name || "N/A"}<br/>
//     `);
//   };

//   const onEachRoad = (feature, layer) => {
//     const { Type, Name, Details } = feature.properties;
//     layer.bindPopup(`
//       <b>Type:</b> ${Type}<br/>
//       <b>Name:</b> ${Name || "N/A"}<br/>
//       <b>Details:</b> ${Details || "N/A"}<br/>
//     `);
//   };

//   const onEachForest = (feature, layer) => {
//     const { Forest_Nam } = feature.properties;
//     layer.bindPopup(`
//       <b>Forest Name:</b> ${Forest_Nam || "N/A"}<br/>
//     `);
//   };

//   const onEachBuilding = (feature, layer) => {
//     const { Type, House_No, Name } = feature.properties;
//     layer.bindPopup(`
//       <b>Type:</b> ${Type || "N/A"}<br/>
//       <b>Name:</b> ${Name || "N/A"}<br/>
//       <b>House No:</b> ${House_No || "N/A"}<br/>
//     `);
//   };

//   const onEachRiver = (feature, layer) => {
//     const { Name_River } = feature.properties;
//     layer.bindPopup(`
//       <b>Id:</b> ${Name_River || "N/A"}<br/>
//     `);
//   };

//   const filterRoads = () => {
//     return selectedLayers.includes("roads");
//   };

//   // Modified filterBuildings to always include Residential if any building layer is active,
//   // and also include Temple/Stupa if their layers are active.
//   const filterBuildings = (feature) => {
//     const buildingType = feature.properties.Type;

//     // Check if any specific building type is selected, or if residential is specifically selected
//     const anyBuildingLayerSelected =
//       selectedLayers.includes("buildings-Residential") ||
//       selectedLayers.includes("buildings-School") ||
//       selectedLayers.includes("buildings-Government") ||
//       selectedLayers.includes("buildings-HealthPost") ||
//       selectedLayers.includes("buildings-Hotel") ||
//       selectedLayers.includes("buildings-Temple") || // Added Temple
//       selectedLayers.includes("buildings-Stupa"); // Added Stupa

//     if (!anyBuildingLayerSelected) {
//       return false; // If no building layers are selected at all, hide everything
//     }

//     // Always include Residential if any building layer is active
//     if (buildingType === "Residential") {
//       return true;
//     }

//     // Otherwise, include the building only if its specific type is selected
//     return (
//       (selectedLayers.includes("buildings-School") &&
//         buildingType === "School") ||
//       (selectedLayers.includes("buildings-Government") &&
//         buildingType === "Government Office") ||
//       (selectedLayers.includes("buildings-HealthPost") &&
//         buildingType === "Health Post") ||
//       (selectedLayers.includes("buildings-Hotel") &&
//         buildingType === "Hotel") ||
//       (selectedLayers.includes("buildings-Temple") &&
//         buildingType === "Temple") || // Added Temple
//       (selectedLayers.includes("buildings-Stupa") && buildingType === "Stupa") // Added Stupa
//     );
//   };

//   const filterPublic = (feature) => {
//     const publicType = feature.properties.Type;

//     // Check if the 'public' layer is selected at all
//     const isPublicLayerSelected =
//       selectedLayers.includes("paragliding") ||
//       selectedLayers.includes("sarbajanik-jagga") ||
//       selectedLayers.includes("sarbajanik-bhawan") ||
//       selectedLayers.includes("football-ground");

//     if (!isPublicLayerSelected) {
//       return false; // If 'public' layer is not selected, hide everything
//     }
//     // Allow only known public types
//     return (
//       publicType === "Paragliding" ||
//       publicType === "Sarbajanik Jagga" ||
//       publicType === "Sarbajanik Bhawan" ||
//       publicType === "Football Ground"
//     );
//   };

//   const memoizedMapContainer = useMemo(
//     () => (
//       <MapContainer
//         center={initialPosition}
//         zoom={initialZoom}
//         zoomControl={true}
//         className="map"
//         ref={setMap}
//       >
//         {map && (
//           <ResetMapButton
//             map={map}
//             resetCenter={initialPosition}
//             resetZoom={initialZoom}
//           />
//         )}

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
//         {selectedLayers.includes("roads") && (
//           <GeoJSON
//             data={roadData}
//             style={roadStyle}
//             onEachFeature={onEachRoad}
//             filter={filterRoads}
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

//         {/* Buildings Layer: Renders if ANY building-related layer is selected */}
//         {(selectedLayers.includes("buildings-Residential") ||
//           selectedLayers.includes("buildings-School") ||
//           selectedLayers.includes("buildings-Government") ||
//           selectedLayers.includes("buildings-HealthPost") ||
//           selectedLayers.includes("buildings-Hotel") ||
//           selectedLayers.includes("buildings-Temple") || // Added Temple
//           selectedLayers.includes("buildings-Stupa")) && ( // Added Stupa
//           <GeoJSON
//             data={BuildingData}
//             style={BuildingStyle} // Styles specific types, with Residential as base
//             onEachFeature={onEachBuilding}
//             filter={filterBuildings} // Filters to include Residential if any building layer is active
//           />
//         )}

//         {(selectedLayers.includes("paragliding") ||
//           selectedLayers.includes("sarbajanik-jagga") ||
//           selectedLayers.includes("sarbajanik-bhawan") ||
//           selectedLayers.includes("football-ground")) && (
//           <GeoJSON
//             data={PublicData}
//             style={PublicStyle}
//             onEachFeature={onEachPublic}
//             filter={filterPublic}
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
//         {selectedLayers.includes("napi") && (
//           <GeoJSON data={NapiData} style={NapiStyle} />
//         )}
//       </MapContainer>
//     ),
//     [
//       map,
//       initialPosition,
//       initialZoom,
//       selectedLayers,
//       roadStyle,
//       BuildingStyle,
//       filterRoads,
//       filterBuildings,
//     ]
//   );

//   return <div className="map-area">{memoizedMapContainer}</div>;
// }

// export default Map;

// Map.jsx

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
import { FaHome } from "react-icons/fa";

import roadData from "../data/Roads_Clip.json";
import ForestData from "../data/Forest_Clip.json";
import BuildingData from "../data/Buildings_Clip.json";
import RiverData from "../data/River_Clip.json";
import BorderData from "../data/Current_Border.json";
import PublicData from "../data/Public_Place_Clip.json";
import NapiData from "../data/Napi_Border_Clip.json";

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
}

function ResetMapButton({ map, resetCenter, resetZoom }) {
  const handleReset = useCallback(() => {
    if (map) {
      map.setView(resetCenter, resetZoom);
    }
  }, [map, resetCenter, resetZoom]);

  if (!map) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "90px",
        left: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={handleReset}
        title="नक्सा रिसेट गर्नुहोस्"
        className="p-2 bg-white text-blue-600 border border-gray-300 rounded-md cursor-pointer shadow-md flex items-center justify-center w-9 h-9 text-base hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
      >
        <FaHome size={20} />
      </button>
    </div>
  );
}

function Map({ selectedLayers }) {
  const [map, setMap] = useState(null);

  const initialPosition = [27.77558, 85.518073];
  const initialZoom = 14;

  const roadStyle = useCallback(() => {
    if (selectedLayers.includes("roads")) {
      return {
        weight: 2,
        color: "black",
      };
    }
    // This return is redundant if filter is used, but harmless.
    // However, if you remove filter, this becomes critical again.
    return { opacity: 0, fillOpacity: 0 };
  }, [selectedLayers]);

  // --- CRITICAL CHANGE 1: PublicStyle no longer hides features ---
  // It only defines the color for the feature type it's given
  const PublicStyle = useCallback(
    (feature) => {
      const PublicType = feature.properties.TYPE;

      // You can remove all PublicStyle console logs now.
      // They did their job perfectly!

      if (PublicType === "Paragliding") {
        return {
          weight: 3,
          color: "red",
        };
      } else if (PublicType === "Sarbajanik Jagga") {
        return {
          weight: 3,
          color: "violet",
        };
      } else if (PublicType === "Sarbajanik Bhawan") {
        return {
          weight: 3,
          color: "blue",
        };
      } else if (PublicType === "Football Ground") {
        return {
          weight: 3,
          color: "green",
        };
      }
      // Default style if type doesn't match (should be filtered out by filterPublic)
      return { opacity: 0, fillOpacity: 0 };
    },
    [] // --- No dependency on selectedLayers here anymore ---
  );

  const BuildingStyle = useCallback(
    (feature) => {
      const BuildingType = feature.properties.Type;

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
      } else if (
        selectedLayers.includes("buildings-Temple") &&
        BuildingType === "Temple"
      ) {
        return {
          weight: 6,
          color: "brown",
        };
      } else if (
        selectedLayers.includes("buildings-Stupa") &&
        BuildingType === "Stupa"
      ) {
        return {
          weight: 6,
          color: "gray",
        };
      } else if (
        selectedLayers.includes("buildings-Residential") &&
        BuildingType === "Residential"
      ) {
        return {
          weight: 2,
          color: "red",
        };
      }
      return { opacity: 0, fillOpacity: 0 };
    },
    [selectedLayers]
  );

  const ForestStyle = useMemo(
    () => ({
      weight: 1.5,
      color: "green",
    }),
    []
  );

  const RiverStyle = useMemo(
    () => ({
      weight: 5,
      color: "lightblue",
    }),
    []
  );

  const BorderStyle = useMemo(
    () => ({
      weight: 3,
      color: "red",
    }),
    []
  );

  const NapiStyle = useMemo(
    () => ({
      weight: 3,
      color: "blue",
    }),
    []
  );

  const onEachPublic = useCallback((feature, layer) => {
    const { TYPE, Name } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${TYPE || "N/A"}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
    `);
  }, []);

  const onEachRoad = useCallback((feature, layer) => {
    const { Type, Name, Details } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${Type}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
      <b>Details:</b> ${Details || "N/A"}<br/>
    `);
  }, []);

  const onEachForest = useCallback((feature, layer) => {
    const { Forest_Nam } = feature.properties;
    layer.bindPopup(`
      <b>Forest Name:</b> ${Forest_Nam || "N/A"}<br/>
    `);
  }, []);

  const onEachBuilding = useCallback((feature, layer) => {
    const { Type, House_No, Name } = feature.properties;
    layer.bindPopup(`
      <b>Type:</b> ${Type || "N/A"}<br/>
      <b>Name:</b> ${Name || "N/A"}<br/>
      <b>House No:</b> ${House_No || "N/A"}<br/>
    `);
  }, []);

  const onEachRiver = useCallback((feature, layer) => {
    const { Name_River } = feature.properties;
    layer.bindPopup(`
      <b>Id:</b> ${Name_River || "N/A"}<br/>
    `);
  }, []);

  const filterRoads = useCallback(() => {
    return selectedLayers.includes("roads");
  }, [selectedLayers]); // Corrected dependency array

  // --- CRITICAL CHANGE 2: New filter function for Public Places ---
  const filterPublic = useCallback(
    (feature) => {
      const PublicType = feature.properties.TYPE;
      // Only return true if the specific type of this feature is in selectedLayers
      return (
        (selectedLayers.includes("paragliding") &&
          PublicType === "Paragliding") ||
        (selectedLayers.includes("sarbajanik-jagga") &&
          PublicType === "Sarbajanik Jagga") ||
        (selectedLayers.includes("sarbajanik-bhawan") &&
          PublicType === "Sarbajanik Bhawan") ||
        (selectedLayers.includes("football-ground") &&
          PublicType === "Football Ground")
      );
    },
    [selectedLayers] // --- This dependency is crucial ---
  );

  const filterBuildings = useCallback(
    (feature) => {
      const buildingType = feature.properties.Type;

      const anyBuildingLayerSelected =
        selectedLayers.includes("buildings-Residential") ||
        selectedLayers.includes("buildings-School") ||
        selectedLayers.includes("buildings-Government") ||
        selectedLayers.includes("buildings-HealthPost") ||
        selectedLayers.includes("buildings-Hotel") ||
        selectedLayers.includes("buildings-Temple") ||
        selectedLayers.includes("buildings-Stupa");

      if (!anyBuildingLayerSelected) {
        return false;
      }

      if (
        selectedLayers.includes("buildings-Residential") &&
        buildingType === "Residential"
      ) {
        return true;
      }

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
          buildingType === "Temple") ||
        (selectedLayers.includes("buildings-Stupa") && buildingType === "Stupa")
      );
    },
    [selectedLayers]
  );

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
            filter={filterRoads} // Use filter for roads as well
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
          selectedLayers.includes("buildings-Temple") ||
          selectedLayers.includes("buildings-Stupa")) && (
          <GeoJSON
            data={BuildingData}
            style={BuildingStyle}
            onEachFeature={onEachBuilding}
            filter={filterBuildings}
          />
        )}

        {/* Public Layer: NOW USES filter={filterPublic} */}
        {(selectedLayers.includes("paragliding") ||
          selectedLayers.includes("sarbajanik-jagga") ||
          selectedLayers.includes("sarbajanik-bhawan") ||
          selectedLayers.includes("football-ground")) && (
          <GeoJSON
            data={PublicData}
            style={PublicStyle} // PublicStyle now just defines colors
            onEachFeature={onEachPublic}
            filter={filterPublic} // --- CRITICAL CHANGE 3: Apply the new filter ---
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
      PublicStyle, // PublicStyle is still a dependency because it's passed to GeoJSON
      BuildingStyle,
      ForestStyle,
      RiverStyle,
      BorderStyle,
      NapiStyle,
      onEachPublic,
      onEachRoad,
      onEachForest,
      onEachBuilding,
      onEachRiver,
      filterRoads,
      filterBuildings,
      filterPublic, // --- ADD filterPublic as a dependency ---
    ]
  );

  return <div className="map-area">{memoizedMapContainer}</div>;
}

export default Map;
