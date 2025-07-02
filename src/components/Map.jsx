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
// import { FaHome } from "react-icons/fa";

// import roadData from "../data/Roads_Clip.json";
// import ForestData from "../data/Forest_Clip.json";
// import BuildingData from "../data/Buildings_Clip.json";
// import RiverData from "../data/River_Clip.json";
// import BorderData from "../data/Current_Border.json";
// import PublicData from "../data/Public_Place_Clip.json";
// import NapiData from "../data/Napi_Border_Clip.json";

// function SetViewOnClick() {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: true,
//     });
//   });
//   return null;
// }

// function ResetMapButton({ map, resetCenter, resetZoom }) {
//   const handleReset = useCallback(() => {
//     if (map) {
//       map.setView(resetCenter, resetZoom);
//     }
//   }, [map, resetCenter, resetZoom]);

//   if (!map) {
//     return null;
//   }

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "90px",
//         left: "20px",
//         zIndex: 1000,
//       }}
//     >
//       <button
//         onClick={handleReset}
//         title="नक्सा रिसेट गर्नुहोस्"
//         className="p-2 bg-white text-blue-600 border border-gray-300 rounded-md cursor-pointer shadow-md flex items-center justify-center w-9 h-9 text-base hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
//       >
//         <FaHome size={20} />
//       </button>
//     </div>
//   );
// }

// function Map({ selectedLayers }) {
//   const [map, setMap] = useState(null);

//   const initialPosition = [27.77558, 85.518073];
//   const initialZoom = 14;

//   const roadStyle = useCallback(() => {
//     if (selectedLayers.includes("roads")) {
//       return {
//         weight: 2,
//         color: "black",
//       };
//     }
//     // This return is redundant if filter is used, but harmless.
//     // However, if you remove filter, this becomes critical again.
//     return { opacity: 0, fillOpacity: 0 };
//   }, [selectedLayers]);

//   // --- CRITICAL CHANGE 1: PublicStyle no longer hides features ---
//   // It only defines the color for the feature type it's given
//   const PublicStyle = useCallback(
//     (feature) => {
//       const PublicType = feature.properties.TYPE;

//       // You can remove all PublicStyle console logs now.
//       // They did their job perfectly!

//       if (PublicType === "Paragliding") {
//         return {
//           weight: 3,
//           color: "red",
//         };
//       } else if (PublicType === "Sarbajanik Jagga") {
//         return {
//           weight: 3,
//           color: "violet",
//         };
//       } else if (PublicType === "Sarbajanik Bhawan") {
//         return {
//           weight: 3,
//           color: "blue",
//         };
//       } else if (PublicType === "Football Ground") {
//         return {
//           weight: 3,
//           color: "green",
//         };
//       }
//       // Default style if type doesn't match (should be filtered out by filterPublic)
//       return { opacity: 0, fillOpacity: 0 };
//     },
//     [] // --- No dependency on selectedLayers here anymore ---
//   );

//   const BuildingStyle = useCallback(
//     (feature) => {
//       const BuildingType = feature.properties.Type;

//       if (
//         selectedLayers.includes("buildings-School") &&
//         BuildingType === "School"
//       ) {
//         return {
//           weight: 8,
//           color: "blue",
//         };
//       } else if (
//         selectedLayers.includes("buildings-Government") &&
//         BuildingType === "Government Office"
//       ) {
//         return {
//           weight: 8,
//           color: "green",
//         };
//       } else if (
//         selectedLayers.includes("buildings-HealthPost") &&
//         BuildingType === "Health Post"
//       ) {
//         return {
//           weight: 8,
//           color: "purple",
//         };
//       } else if (
//         selectedLayers.includes("buildings-Hotel") &&
//         BuildingType === "Hotel"
//       ) {
//         return {
//           weight: 8,
//           color: "yellow",
//         };
//       } else if (
//         selectedLayers.includes("buildings-Temple") &&
//         BuildingType === "Temple"
//       ) {
//         return {
//           weight: 6,
//           color: "brown",
//         };
//       } else if (
//         selectedLayers.includes("buildings-Stupa") &&
//         BuildingType === "Stupa"
//       ) {
//         return {
//           weight: 6,
//           color: "gray",
//         };
//       } else if (
//         selectedLayers.includes("buildings-Residential") &&
//         BuildingType === "Residential"
//       ) {
//         return {
//           weight: 2,
//           color: "red",
//         };
//       }
//       return { opacity: 0, fillOpacity: 0 };
//     },
//     [selectedLayers]
//   );

//   const ForestStyle = useMemo(
//     () => ({
//       weight: 1.5,
//       color: "green",
//     }),
//     []
//   );

//   const RiverStyle = useMemo(
//     () => ({
//       weight: 5,
//       color: "lightblue",
//     }),
//     []
//   );

//   const NapiStyle = useMemo(
//     () => ({
//       weight: 3,
//       color: "red",
//     }),
//     []
//   );

//   const BorderStyle = useMemo(
//     () => ({
//       weight: 3,
//       color: "blue",
//     }),
//     []
//   );

//   const onEachPublic = useCallback((feature, layer) => {
//     const { TYPE, Name } = feature.properties;
//     layer.bindPopup(`
//       <b>प्रकार:</b> ${TYPE || "N/A"}<br/>
//       <b>नाम:</b> ${Name || "N/A"}<br/>
//     `);
//   }, []);

//   const onEachRoad = useCallback((feature, layer) => {
//     const { Name } = feature.properties;
//     layer.bindPopup(`
//       <b>रोडको नाम:</b> ${Name || "N/A"}<br/>
//     `);
//   }, []);

//   const onEachForest = useCallback((feature, layer) => {
//     const { Forest_Nam } = feature.properties;
//     layer.bindPopup(`
//       <b>जंगलको नाम:</b> ${Forest_Nam || "N/A"}<br/>
//     `);
//   }, []);

//   const onEachBuilding = useCallback((feature, layer) => {
//     const { Type, House_No, Name } = feature.properties;
//     layer.bindPopup(`
//       <b>प्रकार:</b> ${Type || "N/A"}<br/>
//       <b>नाम:</b> ${Name || "N/A"}<br/>
//       <b>घर नम्बर</b> ${House_No || "N/A"}<br/>
//     `);
//   }, []);

//   const onEachRiver = useCallback((feature, layer) => {
//     const { Name_River } = feature.properties;
//     layer.bindPopup(`
//       <b>नदिको नाम:</b> ${Name_River || "N/A"}<br/>
//     `);
//   }, []);

//   const filterRoads = useCallback(() => {
//     return selectedLayers.includes("roads");
//   }, [selectedLayers]); // Corrected dependency array

//   // --- CRITICAL CHANGE 2: New filter function for Public Places ---
//   const filterPublic = useCallback(
//     (feature) => {
//       const PublicType = feature.properties.TYPE;
//       // Only return true if the specific type of this feature is in selectedLayers
//       return (
//         (selectedLayers.includes("paragliding") &&
//           PublicType === "Paragliding") ||
//         (selectedLayers.includes("sarbajanik-jagga") &&
//           PublicType === "Sarbajanik Jagga") ||
//         (selectedLayers.includes("sarbajanik-bhawan") &&
//           PublicType === "Sarbajanik Bhawan") ||
//         (selectedLayers.includes("football-ground") &&
//           PublicType === "Football Ground")
//       );
//     },
//     [selectedLayers] // --- This dependency is crucial ---
//   );

//   const filterBuildings = useCallback(
//     (feature) => {
//       const buildingType = feature.properties.Type;

//       const anyBuildingLayerSelected =
//         selectedLayers.includes("buildings-Residential") ||
//         selectedLayers.includes("buildings-School") ||
//         selectedLayers.includes("buildings-Government") ||
//         selectedLayers.includes("buildings-HealthPost") ||
//         selectedLayers.includes("buildings-Hotel") ||
//         selectedLayers.includes("buildings-Temple") ||
//         selectedLayers.includes("buildings-Stupa");

//       if (!anyBuildingLayerSelected) {
//         return false;
//       }

//       if (
//         selectedLayers.includes("buildings-Residential") &&
//         buildingType === "Residential"
//       ) {
//         return true;
//       }

//       return (
//         (selectedLayers.includes("buildings-School") &&
//           buildingType === "School") ||
//         (selectedLayers.includes("buildings-Government") &&
//           buildingType === "Government Office") ||
//         (selectedLayers.includes("buildings-HealthPost") &&
//           buildingType === "Health Post") ||
//         (selectedLayers.includes("buildings-Hotel") &&
//           buildingType === "Hotel") ||
//         (selectedLayers.includes("buildings-Temple") &&
//           buildingType === "Temple") ||
//         (selectedLayers.includes("buildings-Stupa") && buildingType === "Stupa")
//       );
//     },
//     [selectedLayers]
//   );

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
//             filter={filterRoads} // Use filter for roads as well
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
//           selectedLayers.includes("buildings-Temple") ||
//           selectedLayers.includes("buildings-Stupa")) && (
//           <GeoJSON
//             data={BuildingData}
//             style={BuildingStyle}
//             onEachFeature={onEachBuilding}
//             filter={filterBuildings}
//           />
//         )}

//         {/* Public Layer: NOW USES filter={filterPublic} */}
//         {(selectedLayers.includes("paragliding") ||
//           selectedLayers.includes("sarbajanik-jagga") ||
//           selectedLayers.includes("sarbajanik-bhawan") ||
//           selectedLayers.includes("football-ground")) && (
//           <GeoJSON
//             data={PublicData}
//             style={PublicStyle} // PublicStyle now just defines colors
//             onEachFeature={onEachPublic}
//             filter={filterPublic} // --- CRITICAL CHANGE 3: Apply the new filter ---
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
//         {selectedLayers.includes("napi") && (
//           <GeoJSON data={BorderData} style={NapiStyle} />
//         )}
//         {selectedLayers.includes("border") && (
//           <GeoJSON data={NapiData} style={BorderStyle} />
//         )}
//       </MapContainer>
//     ),
//     [
//       map,
//       initialPosition,
//       initialZoom,
//       selectedLayers,
//       roadStyle,
//       PublicStyle, // PublicStyle is still a dependency because it's passed to GeoJSON
//       BuildingStyle,
//       ForestStyle,
//       RiverStyle,
//       BorderStyle,
//       NapiStyle,
//       onEachPublic,
//       onEachRoad,
//       onEachForest,
//       onEachBuilding,
//       onEachRiver,
//       filterRoads,
//       filterBuildings,
//       filterPublic, // --- ADD filterPublic as a dependency ---
//     ]
//   );

//   return <div className="map-area">{memoizedMapContainer}</div>;
// }

// export default Map;
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState, useMemo, useCallback, useEffect } from "react";
// import {
//   MapContainer,
//   WMSTileLayer,
//   TileLayer,
//   GeoJSON,
//   LayersControl,
//   useMapEvent,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "../css/map.css";
// import { FaHome } from "react-icons/fa";

// function SetViewOnClick() {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: true,
//     });
//   });
//   return null;
// }

// function ResetMapButton({ map, resetCenter, resetZoom }) {
//   const handleReset = useCallback(() => {
//     if (map) {
//       map.setView(resetCenter, resetZoom);
//     }
//   }, [map, resetCenter, resetZoom]);

//   if (!map) return null;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "90px",
//         left: "20px",
//         zIndex: 1000,
//       }}
//     >
//       <button
//         onClick={handleReset}
//         title="नक्सा रिसेट गर्नुहोस्"
//         className="p-2 bg-white text-blue-600 border border-gray-300 rounded-md cursor-pointer shadow-md flex items-center justify-center w-9 h-9 text-base hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
//       >
//         <FaHome size={20} />
//       </button>
//     </div>
//   );
// }

// function Map({ selectedLayers }) {
//   const [map, setMap] = useState(null);

//   const [dynamicGeoJSONData, setDynamicGeoJSONData] = useState({});
//   const [loadingStates, setLoadingStates] = useState({});
//   const [errorStates, setErrorStates] = useState({});

//   const initialPosition = [27.77558, 85.518073];
//   const initialZoom = 14;

//   const geoserverWFSUrl = "http://maps.phnx.com.np:9090/geoserver/ows";

//   // Define all your dynamic layers with their GeoServer typeNames and default styles
//   // IMPORTANT: For grouped layers (Buildings, Public Places), define the *base* layer
//   // and then individual "sub-layers" with their filter properties and specific styles.
//   const dynamicLayersConfig = useMemo(
//     () => [
//       // Borders
//       {
//         id: "border",
//         typeName: "shankharapur:Napi_Border",
//         style: { weight: 3, color: "blue", fillOpacity: 0.1 },
//         displayName: "Border Data", // Added for loading messages
//       },
//       {
//         id: "napi",
//         typeName: "shankharapur:Shanakarapur_Map",
//         style: { weight: 3, color: "red", fillOpacity: 0.1 },
//         displayName: "Napi Map", // Added for loading messages
//       },
//       // Roads
//       {
//         id: "roads",
//         typeName: "shankharapur:FINAL_ROADS_CLIPPED",
//         style: { weight: 2, color: "black", fillOpacity: 0.1 },
//         displayName: "Roads Data", // Added for loading messages
//       },
//       // Natural Features
//       {
//         id: "forest",
//         typeName: "shankharapur:FOREST_CLIPPED",
//         style: { weight: 1.5, color: "darkgreen", fillOpacity: 0.5 },
//         displayName: "Forest Data", // Added for loading messages
//       },
//       {
//         id: "river",
//         typeName: "shankharapur:River",
//         style: { weight: 5, color: "cyan", fillOpacity: 0.1 },
//         displayName: "River Data", // Added for loading messages
//       },
//       // Grouped Layers - Define the base layer and its sub-layers
//       {
//         id: "buildings", // Base ID for fetching all building data
//         typeName: "shankharapur:Buildings_Clipped",
//         displayName: "Buildings Data",
//         isGroup: true,
//         subLayers: [
//           {
//             id: "buildings-Residential",
//             filterProperty: "Type",
//             filterValue: "Residential",
//             style: { weight: 2, color: "red", fillOpacity: 0.7 },
//             displayName: "Residential Buildings",
//           },
//           {
//             id: "buildings-School",
//             filterProperty: "Type",
//             filterValue: "School",
//             style: { weight: 8, color: "blue", fillOpacity: 0.7 },
//             displayName: "School Buildings",
//           },
//           {
//             id: "buildings-Government",
//             filterProperty: "Type",
//             filterValue: "Government Office",
//             style: { weight: 8, color: "green", fillOpacity: 0.7 },
//             displayName: "Government Buildings",
//           },
//           {
//             id: "buildings-HealthPost",
//             filterProperty: "Type",
//             filterValue: "Health Post",
//             style: { weight: 8, color: "purple", fillOpacity: 0.7 },
//             displayName: "Health Post Buildings",
//           },
//           {
//             id: "buildings-Hotel",
//             filterProperty: "Type",
//             filterValue: "Hotel",
//             style: { weight: 8, color: "yellow", fillOpacity: 0.7 },
//             displayName: "Hotel Buildings",
//           },
//           {
//             id: "buildings-Temple",
//             filterProperty: "Type",
//             filterValue: "Temple",
//             style: { weight: 6, color: "brown", fillOpacity: 0.7 },
//             displayName: "Temple Buildings",
//           },
//           {
//             id: "buildings-Stupa",
//             filterProperty: "Type",
//             filterValue: "Stupa",
//             style: { weight: 6, color: "gray", fillOpacity: 0.7 },
//             displayName: "Stupa Buildings",
//           },
//         ],
//       },
//       {
//         id: "public-places", // Base ID for fetching all public place data
//         typeName: "shankharapur:Public_Place",
//         displayName: "Public Places Data",
//         isGroup: true,
//         subLayers: [
//           {
//             id: "paragliding",
//             filterProperty: "TYPE",
//             filterValue: "Paraglading",
//             style: { weight: 3, color: "orange", fillOpacity: 0.7 },
//             displayName: "Paragliding Area",
//           },
//           {
//             id: "sarbajanik-jagga",
//             filterProperty: "TYPE",
//             filterValue: "Sarbajanik Jagga",
//             style: { weight: 3, color: "violet", fillOpacity: 0.7 },
//             displayName: "Sarbajanik Jagga",
//           },
//           {
//             id: "sarbajanik-bhawan",
//             filterProperty: "TYPE",
//             filterValue: "Sarbajanik Bhawan",
//             style: { weight: 3, color: "darkblue", fillOpacity: 0.7 },
//             displayName: "Sarbajanik Bhawan",
//           },
//           {
//             id: "football-ground",
//             filterProperty: "TYPE",
//             filterValue: "Football Ground",
//             style: { weight: 3, color: "lightgreen", fillOpacity: 0.7 },
//             displayName: "Football Ground",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   // Helper to flatten dynamicLayersConfig for easier lookup of all individual IDs
//   const allLayerIds = useMemo(() => {
//     const ids = [];
//     dynamicLayersConfig.forEach((layer) => {
//       if (layer.isGroup && layer.subLayers) {
//         layer.subLayers.forEach((sub) => ids.push(sub.id));
//       } else {
//         ids.push(layer.id);
//       }
//     });
//     return ids;
//   }, [dynamicLayersConfig]);

//   // Generic function to fetch WFS data
//   const fetchWFSData = useCallback(
//     async (layerId, typeName) => {
//       if (loadingStates[layerId] || dynamicGeoJSONData[layerId]) {
//         return;
//       }

//       const wfsRequestUrl = `${geoserverWFSUrl}?service=WFS&version=1.1.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json`;

//       setLoadingStates((prev) => ({ ...prev, [layerId]: true }));
//       setErrorStates((prev) => ({ ...prev, [layerId]: null }));
//       console.log(`Fetching ${layerId} WFS data from:`, wfsRequestUrl);

//       try {
//         const response = await fetch(wfsRequestUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(`${layerId} WFS data fetched successfully:`, data);
//         setDynamicGeoJSONData((prev) => ({ ...prev, [layerId]: data }));
//       } catch (error) {
//         console.error(`Error fetching ${layerId} WFS data:`, error);
//         setErrorStates((prev) => ({ ...prev, [layerId]: error.message }));
//       } finally {
//         setLoadingStates((prev) => ({ ...prev, [layerId]: false }));
//       }
//     },
//     [geoserverWFSUrl, loadingStates, dynamicGeoJSONData]
//   );

//   // useEffect to trigger fetches for selected layers
//   useEffect(() => {
//     dynamicLayersConfig.forEach((layer) => {
//       if (layer.isGroup) {
//         // For grouped layers, check if any of its sub-layers are selected
//         const isAnySubLayerSelected = layer.subLayers.some((subLayer) =>
//           selectedLayers.includes(subLayer.id)
//         );
//         if (isAnySubLayerSelected) {
//           fetchWFSData(layer.id, layer.typeName); // Fetch the base data
//         }
//       } else {
//         // For individual layers, check if it's selected directly
//         if (selectedLayers.includes(layer.id)) {
//           fetchWFSData(layer.id, layer.typeName);
//         }
//       }
//     });
//   }, [selectedLayers, dynamicLayersConfig, fetchWFSData]);

//   // Consolidated onEachFeature handler for popups
//   const onEachFeatureGeneric = useCallback((feature, layer) => {
//     const properties = feature.properties;
//     if (properties) {
//       let popupContent =
//         "<table style='width: 100%; border-collapse: collapse;'>";
//       for (const key in properties) {
//         if (Object.prototype.hasOwnProperty.call(properties, key)) {
//           popupContent += `<tr><td style='padding: 4px; border: 1px solid #ddd; font-weight: bold;'>${key}:</td><td style='padding: 4px; border: 1px solid #ddd;'>${
//             properties[key] || "N/A"
//           }</td></tr>`;
//         }
//       }
//       popupContent += "</table>";
//       layer.bindPopup(popupContent);
//     }
//   }, []);

//   // Smart style function for grouped layers
//   const getGroupedLayerStyle = useCallback(
//     (baseLayerId, feature) => {
//       const defaultHiddenStyle = {
//         opacity: 0,
//         fillOpacity: 0,
//         weight: 0,
//         clickable: false, // Make feature not clickable when hidden
//       };

//       if (baseLayerId === "public-places") {
//         console.log(
//           "Public Place Feature:",
//           feature.properties.TYPE,
//           "Selected:",
//           selectedLayers
//         );
//       }

//       const baseConfig = dynamicLayersConfig.find(
//         (config) => config.id === baseLayerId
//       );
//       if (!baseConfig || !baseConfig.isGroup || !baseConfig.subLayers) {
//         return defaultHiddenStyle; // Should not happen for grouped layers
//       }

//       // Find the sub-layer configuration that matches the feature's properties and is selected
//       for (const subLayerConfig of baseConfig.subLayers) {
//         if (selectedLayers.includes(subLayerConfig.id)) {
//           if (
//             feature.properties[subLayerConfig.filterProperty] ===
//             subLayerConfig.filterValue
//           ) {
//             return { ...subLayerConfig.style, clickable: true }; // Apply style if it matches and is selected
//           }
//         }
//       }

//       return defaultHiddenStyle; // If no matching sub-layer is selected, hide the feature
//     },
//     [selectedLayers, dynamicLayersConfig]
//   );

//   // Filter function for grouped layers - to prevent non-selected features from even being added
//   const filterGroupedFeatures = useCallback(
//     (baseLayerId, feature) => {
//       const baseConfig = dynamicLayersConfig.find(
//         (config) => config.id === baseLayerId
//       );
//       if (!baseConfig || !baseConfig.isGroup || !baseConfig.subLayers) {
//         return false; // Should not happen
//       }

//       // Check if any selected sub-layer matches this feature's properties
//       return baseConfig.subLayers.some(
//         (subLayerConfig) =>
//           selectedLayers.includes(subLayerConfig.id) &&
//           feature.properties[subLayerConfig.filterProperty] ===
//             subLayerConfig.filterValue
//       );
//     },
//     [selectedLayers, dynamicLayersConfig]
//   );

//   const wmsLayerEventHandlers = useMemo(
//     () => ({
//       add: () => {
//         console.log(
//           'WMSTileLayer "Drone Image Ward 2" has been added to the map and is being fetched.'
//         );
//       },
//     }),
//     []
//   );

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

//           <LayersControl.BaseLayer name="Drone Image Ward 2">
//             <WMSTileLayer
//               url="http://maps.phnx.com.np:9090/geoserver/ows"
//               layers="shankharapur:basemap_ward_2"
//               format="image/jpeg"
//               version="1.1.0"
//               transparent={false}
//               tiled={true}
//               attribution="My GeoServer Data"
//               eventHandlers={wmsLayerEventHandlers}
//             />
//             <SetViewOnClick />
//           </LayersControl.BaseLayer>
//         </LayersControl>

//         {/* Dynamically rendered GeoJSON layers */}
//         {dynamicLayersConfig.map((layerConfig) => {
//           const isBaseLayerActive =
//             layerConfig.isGroup &&
//             layerConfig.subLayers.some((sub) =>
//               selectedLayers.includes(sub.id)
//             );
//           const isIndividualLayerActive =
//             !layerConfig.isGroup && selectedLayers.includes(layerConfig.id);

//           const dataToRender = dynamicGeoJSONData[layerConfig.id];

//           // Render a GeoJSON component if the layer (or any of its sub-layers) is selected
//           // AND data is available AND not currently loading for this base layer.
//           if (
//             (isBaseLayerActive || isIndividualLayerActive) &&
//             dataToRender &&
//             !loadingStates[layerConfig.id]
//           ) {
//             if (layerConfig.isGroup) {
//               return (
//                 <GeoJSON
//                   key={layerConfig.id} // Key off the base ID for grouped layers
//                   data={dataToRender}
//                   style={(feature) =>
//                     getGroupedLayerStyle(layerConfig.id, feature)
//                   }
//                   onEachFeature={onEachFeatureGeneric}
//                   filter={(feature) =>
//                     filterGroupedFeatures(layerConfig.id, feature)
//                   }
//                 />
//               );
//             } else {
//               // For non-grouped layers, just render if selected and data is available
//               return (
//                 <GeoJSON
//                   key={layerConfig.id}
//                   data={dataToRender}
//                   style={layerConfig.style}
//                   onEachFeature={onEachFeatureGeneric}
//                 />
//               );
//             }
//           }
//           return null; // Don't render if not selected or data not available
//         })}

//         {/* Display loading/error messages for dynamic layers */}
//         {allLayerIds.map((layerId) => {
//           const config = dynamicLayersConfig.find(
//             (lc) =>
//               lc.id === layerId || lc.subLayers?.some((sl) => sl.id === layerId)
//           );
//           let baseLayerId = layerId; // Assume it's a base layer initially
//           let displayName = config?.displayName;

//           // If it's a sub-layer, find its base and determine display name
//           if (
//             config &&
//             config.isGroup &&
//             config.subLayers?.some((sl) => sl.id === layerId)
//           ) {
//             const subConfig = config.subLayers.find((sl) => sl.id === layerId);
//             baseLayerId = config.id; // Use the base layer ID for loading state checks
//             displayName = subConfig?.displayName;
//           } else if (!config) {
//             // If it's a sub-layer not found directly in dynamicLayersConfig (e.g., "buildings-Residential")
//             for (const lc of dynamicLayersConfig) {
//               if (lc.isGroup && lc.subLayers) {
//                 const subConfig = lc.subLayers.find((sl) => sl.id === layerId);
//                 if (subConfig) {
//                   baseLayerId = lc.id;
//                   displayName = subConfig.displayName;
//                   break;
//                 }
//               }
//             }
//           }

//           if (selectedLayers.includes(layerId) && loadingStates[baseLayerId]) {
//             return (
//               <div
//                 key={`loading-${layerId}`}
//                 style={{
//                   position: "absolute",
//                   top: `${10 + allLayerIds.indexOf(layerId) * 30}px`, // Adjust position dynamically
//                   right: "10px",
//                   zIndex: 1000,
//                   background: "white",
//                   padding: "5px",
//                   borderRadius: "5px",
//                   fontSize: "12px",
//                 }}
//               >
//                 Loading {displayName || layerId.replace(/-/g, " ")} Data...
//               </div>
//             );
//           }
//           if (selectedLayers.includes(layerId) && errorStates[baseLayerId]) {
//             return (
//               <div
//                 key={`error-${layerId}`}
//                 style={{
//                   position: "absolute",
//                   top: `${10 + allLayerIds.indexOf(layerId) * 30}px`, // Adjust position dynamically
//                   right: "10px",
//                   zIndex: 1000,
//                   background: "white",
//                   padding: "5px",
//                   borderRadius: "5px",
//                   color: "red",
//                   fontSize: "12px",
//                 }}
//               >
//                 Error loading {displayName || layerId.replace(/-/g, " ")} Data:{" "}
//                 {errorStates[baseLayerId]}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </MapContainer>
//     ),
//     [
//       map,
//       initialPosition,
//       initialZoom,
//       selectedLayers,
//       wmsLayerEventHandlers,
//       dynamicGeoJSONData,
//       loadingStates,
//       errorStates,
//       dynamicLayersConfig,
//       onEachFeatureGeneric,
//       getGroupedLayerStyle,
//       filterGroupedFeatures,
//       allLayerIds, // Include allLayerIds in dependency array
//     ]
//   );

//   return <div className="map-area">{memoizedMapContainer}</div>;
// }

// export default Map;

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  MapContainer,
  WMSTileLayer,
  TileLayer,
  GeoJSON,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/map.css";
import { FaHome } from "react-icons/fa";

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

  if (!map) return null;

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

  const [dynamicGeoJSONData, setDynamicGeoJSONData] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [errorStates, setErrorStates] = useState({});

  const initialPosition = [27.77558, 85.518073];
  const initialZoom = 14;

  const geoserverWFSUrl = "http://maps.phnx.com.np:9090/geoserver/ows";

  const dynamicLayersConfig = useMemo(
    () => [
      // Borders
      {
        id: "border",
        typeName: "shankharapur:Napi_Border",
        style: { weight: 3, color: "blue", fillOpacity: 0.1 },
        displayName: "Border Data",
      },
      {
        id: "napi",
        typeName: "shankharapur:Shanakarapur_Map",
        style: { weight: 3, color: "red", fillOpacity: 0.1 },
        displayName: "Napi Map",
      },
      // Roads
      {
        id: "roads",
        typeName: "shankharapur:FINAL_ROADS_CLIPPED",
        style: { weight: 2, color: "black", fillOpacity: 0.1 },
        displayName: "Roads Data",
      },
      // Natural Features
      {
        id: "forest",
        typeName: "shankharapur:FOREST_CLIPPED",
        style: { weight: 1.5, color: "darkgreen", fillOpacity: 0.5 },
        displayName: "Forest Data",
      },
      {
        id: "river",
        typeName: "shankharapur:River",
        style: { weight: 5, color: "blue", fillOpacity: 0.1 },
        displayName: "River Data",
      },
      // Grouped Layers - Define the base layer and its sub-layers
      {
        id: "buildings", // Base ID for fetching all building data
        typeName: "shankharapur:Buildings_Clipped",
        displayName: "Buildings Data",
        isGroup: true,
        subLayers: [
          {
            id: "buildings-Residential",
            filterProperty: "Type",
            filterValue: "Residential",
            style: { weight: 2, color: "red", fillOpacity: 0.7 },
            displayName: "Residential Buildings",
          },
          {
            id: "buildings-School",
            filterProperty: "Type",
            filterValue: "School",
            style: { weight: 8, color: "blue", fillOpacity: 0.7 },
            displayName: "School Buildings",
          },
          {
            id: "buildings-Government",
            filterProperty: "Type",
            filterValue: "Government Office",
            style: { weight: 8, color: "green", fillOpacity: 0.7 },
            displayName: "Government Buildings",
          },
          {
            id: "buildings-HealthPost",
            filterProperty: "Type",
            filterValue: "Health Post",
            style: { weight: 8, color: "purple", fillOpacity: 0.7 },
            displayName: "Health Post Buildings",
          },
          {
            id: "buildings-Hotel",
            filterProperty: "Type",
            filterValue: "Hotel",
            style: { weight: 8, color: "yellow", fillOpacity: 0.7 },
            displayName: "Hotel Buildings",
          },
          {
            id: "buildings-Temple",
            filterProperty: "Type",
            filterValue: "Temple",
            style: { weight: 6, color: "brown", fillOpacity: 0.7 },
            displayName: "Temple Buildings",
          },
          {
            id: "buildings-Stupa",
            filterProperty: "Type",
            filterValue: "Stupa",
            style: { weight: 6, color: "gray", fillOpacity: 0.7 },
            displayName: "Stupa Buildings",
          },
        ],
      },
      {
        id: "public-places", // Base ID for fetching all public place data
        typeName: "shankharapur:Public_Place",
        displayName: "Public Places Data",
        isGroup: true,
        subLayers: [
          {
            id: "paragliding",
            filterProperty: "TYPE", // Confirmed this is the correct property name
            filterValue: "Paragliding", // Confirmed this is the correct value
            style: { weight: 3, color: "orange", fillOpacity: 0.7 },
            displayName: "Paragliding Area",
          },
          {
            id: "sarbajanik-jagga",
            filterProperty: "TYPE",
            filterValue: "Sarbajanik Jagga",
            style: { weight: 3, color: "violet", fillOpacity: 0.7 },
            displayName: "Sarbajanik Jagga",
          },
          {
            id: "sarbajanik-bhawan",
            filterProperty: "TYPE",
            filterValue: "Sarbajanik Bhawan",
            style: { weight: 3, color: "darkblue", fillOpacity: 0.7 },
            displayName: "Sarbajanik Bhawan",
          },
          {
            id: "football-ground",
            filterProperty: "TYPE",
            filterValue: "Football Ground",
            style: { weight: 3, color: "lightgreen", fillOpacity: 0.7 },
            displayName: "Football Ground",
          },
        ],
      },
    ],
    []
  );

  const allLayerIds = useMemo(() => {
    const ids = [];
    dynamicLayersConfig.forEach((layer) => {
      if (layer.isGroup && layer.subLayers) {
        layer.subLayers.forEach((sub) => ids.push(sub.id));
      } else {
        ids.push(layer.id);
      }
    });
    return ids;
  }, [dynamicLayersConfig]);

  const fetchWFSData = useCallback(
    async (layerId, typeName) => {
      if (loadingStates[layerId] || dynamicGeoJSONData[layerId]) {
        return;
      }

      const wfsRequestUrl = `${geoserverWFSUrl}?service=WFS&version=1.1.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json`;

      setLoadingStates((prev) => ({ ...prev, [layerId]: true }));
      setErrorStates((prev) => ({ ...prev, [layerId]: null }));
      console.log(`Fetching ${layerId} WFS data from:`, wfsRequestUrl);

      try {
        const response = await fetch(wfsRequestUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`${layerId} WFS data fetched successfully:`, data);
        setDynamicGeoJSONData((prev) => ({ ...prev, [layerId]: data }));
      } catch (error) {
        console.error(`Error fetching ${layerId} WFS data:`, error);
        setErrorStates((prev) => ({ ...prev, [layerId]: error.message }));
      } finally {
        setLoadingStates((prev) => ({ ...prev, [layerId]: false }));
      }
    },
    [geoserverWFSUrl, loadingStates, dynamicGeoJSONData]
  );

  useEffect(() => {
    dynamicLayersConfig.forEach((layer) => {
      if (layer.isGroup) {
        const isAnySubLayerSelected = layer.subLayers.some((subLayer) =>
          selectedLayers.includes(subLayer.id)
        );
        if (isAnySubLayerSelected) {
          fetchWFSData(layer.id, layer.typeName);
        }
      } else {
        if (selectedLayers.includes(layer.id)) {
          fetchWFSData(layer.id, layer.typeName);
        }
      }
    });
  }, [selectedLayers, dynamicLayersConfig, fetchWFSData]);

  const onEachFeatureGeneric = useCallback((feature, layer) => {
    const properties = feature.properties;
    if (properties) {
      let popupContent =
        "<table style='width: 100%; border-collapse: collapse;'>";
      for (const key in properties) {
        if (Object.prototype.hasOwnProperty.call(properties, key)) {
          popupContent += `<tr><td style='padding: 4px; border: 1px solid #ddd; font-weight: bold;'>${key}:</td><td style='padding: 4px; border: 1px solid #ddd;'>${
            properties[key] || "N/A"
          }</td></tr>`;
        }
      }
      popupContent += "</table>";
      layer.bindPopup(popupContent);
    }
  }, []);

  // --- REVISED getGroupedLayerStyle ---
  const getGroupedLayerStyle = useCallback(
    (baseLayerId, feature) => {
      const defaultHiddenStyle = {
        opacity: 0,
        fillOpacity: 0,
        weight: 0,
        clickable: false,
      };

      const baseConfig = dynamicLayersConfig.find(
        (config) => config.id === baseLayerId
      );
      if (!baseConfig || !baseConfig.isGroup || !baseConfig.subLayers) {
        return defaultHiddenStyle;
      }

      // Find the style for the first *selected* sub-layer that matches this feature's properties
      for (const subLayerConfig of baseConfig.subLayers) {
        if (
          selectedLayers.includes(subLayerConfig.id) && // Check if this specific sub-layer is selected
          feature.properties[subLayerConfig.filterProperty] ===
            subLayerConfig.filterValue
        ) {
          // If a match is found and it's selected, return its style
          return { ...subLayerConfig.style, clickable: true };
        }
      }

      // If no matching selected sub-layer is found for this feature, hide it
      return defaultHiddenStyle;
    },
    [selectedLayers, dynamicLayersConfig]
  );

  // --- REVISED filterGroupedFeatures ---
  const filterGroupedFeatures = useCallback(
    (baseLayerId, feature) => {
      const baseConfig = dynamicLayersConfig.find(
        (config) => config.id === baseLayerId
      );
      if (!baseConfig || !baseConfig.isGroup || !baseConfig.subLayers) {
        return false;
      }

      // Check if this feature matches *ANY* of the currently selected sub-layers
      return baseConfig.subLayers.some(
        (subLayerConfig) =>
          selectedLayers.includes(subLayerConfig.id) && // Check if this specific sub-layer is selected
          feature.properties[subLayerConfig.filterProperty] ===
            subLayerConfig.filterValue
      );
    },
    [selectedLayers, dynamicLayersConfig]
  );

  const wmsLayerEventHandlers = useMemo(
    () => ({
      add: () => {
        console.log(
          'WMSTileLayer "Drone Image Ward 2" has been added to the map and is being fetched.'
        );
      },
    }),
    []
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

          <LayersControl.BaseLayer name="Drone Image Ward 2">
            <WMSTileLayer
              url="http://maps.phnx.com.np:9090/geoserver/ows"
              layers="shankharapur:basemap_ward_2"
              format="image/jpeg"
              version="1.1.0"
              transparent={false}
              tiled={true}
              attribution="My GeoServer Data"
              eventHandlers={wmsLayerEventHandlers}
            />
            <SetViewOnClick />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Dynamically rendered GeoJSON layers */}
        {dynamicLayersConfig.map((layerConfig) => {
          const isBaseLayerActive =
            layerConfig.isGroup &&
            layerConfig.subLayers.some((sub) =>
              selectedLayers.includes(sub.id)
            );
          const isIndividualLayerActive =
            !layerConfig.isGroup && selectedLayers.includes(layerConfig.id);

          const dataToRender = dynamicGeoJSONData[layerConfig.id];

          if (
            (isBaseLayerActive || isIndividualLayerActive) &&
            dataToRender &&
            !loadingStates[layerConfig.id]
          ) {
            if (layerConfig.isGroup) {
              return (
                <GeoJSON
                  key={layerConfig.id}
                  data={dataToRender}
                  style={(feature) =>
                    getGroupedLayerStyle(layerConfig.id, feature)
                  }
                  onEachFeature={onEachFeatureGeneric}
                  filter={(feature) =>
                    filterGroupedFeatures(layerConfig.id, feature)
                  }
                />
              );
            } else {
              return (
                <GeoJSON
                  key={layerConfig.id}
                  data={dataToRender}
                  style={layerConfig.style}
                  onEachFeature={onEachFeatureGeneric}
                />
              );
            }
          }
          return null;
        })}

        {/* Display loading/error messages for dynamic layers */}
        {allLayerIds.map((layerId) => {
          const config = dynamicLayersConfig.find(
            (lc) =>
              lc.id === layerId || lc.subLayers?.some((sl) => sl.id === layerId)
          );
          let baseLayerId = layerId;
          let displayName = config?.displayName;

          if (
            config &&
            config.isGroup &&
            config.subLayers?.some((sl) => sl.id === layerId)
          ) {
            const subConfig = config.subLayers.find((sl) => sl.id === layerId);
            baseLayerId = config.id;
            displayName = subConfig?.displayName;
          } else if (!config) {
            for (const lc of dynamicLayersConfig) {
              if (lc.isGroup && lc.subLayers) {
                const subConfig = lc.subLayers.find((sl) => sl.id === layerId);
                if (subConfig) {
                  baseLayerId = lc.id;
                  displayName = subConfig.displayName;
                  break;
                }
              }
            }
          }

          if (selectedLayers.includes(layerId) && loadingStates[baseLayerId]) {
            return (
              <div
                key={`loading-${layerId}`}
                style={{
                  position: "absolute",
                  top: `${10 + allLayerIds.indexOf(layerId) * 30}px`,
                  right: "10px",
                  zIndex: 1000,
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                Loading {displayName || layerId.replace(/-/g, " ")} Data...
              </div>
            );
          }
          if (selectedLayers.includes(layerId) && errorStates[baseLayerId]) {
            return (
              <div
                key={`error-${layerId}`}
                style={{
                  position: "absolute",
                  top: `${10 + allLayerIds.indexOf(layerId) * 30}px`,
                  right: "10px",
                  zIndex: 1000,
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  color: "red",
                  fontSize: "12px",
                }}
              >
                Error loading {displayName || layerId.replace(/-/g, " ")} Data:{" "}
                {errorStates[baseLayerId]}
              </div>
            );
          }
          return null;
        })}
      </MapContainer>
    ),
    [
      map,
      initialPosition,
      initialZoom,
      selectedLayers,
      wmsLayerEventHandlers,
      dynamicGeoJSONData,
      loadingStates,
      errorStates,
      dynamicLayersConfig,
      onEachFeatureGeneric,
      getGroupedLayerStyle,
      filterGroupedFeatures,
      allLayerIds,
    ]
  );

  return <div className="map-area">{memoizedMapContainer}</div>;
}

export default Map;
