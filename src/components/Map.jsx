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

// Component to set map view on click (remains the same)
function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
}

// Component for the Reset Map Button (remains the same)
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

  // State for managing the side panel
  const [selectedFeatureData, setSelectedFeatureData] = useState(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const initialPosition = [27.77558, 85.518073]; // Kathmandu, Nepal approximate center
  const initialZoom = 14;

  // const geoserverWFSUrl = "http://maps.phnx.com.np:9090/geoserver/ows";
  const geoserverOWSUrl = "https://maps.phnx.com.np/geoserver/ows";

  const dynamicLayersConfig = useMemo(
    () => [
      // Borders
      {
        id: "border",
        typeName: "shankharapur:Napi_Border",
        style: { weight: 3, color: "blue", fillOpacity: 0.1 },
        displayName: "Border Data",
        popupProperties: [
          { key: "name", displayName: "नाम" },
          // Add other border-specific properties as needed
        ],
      },
      {
        id: "napi",
        typeName: "shankharapur:Shanakarapur_Map",
        style: { weight: 3, color: "red", fillOpacity: 0.1 },
        displayName: "Napi Map",
        popupProperties: [
          // Add other Napi-specific properties as needed
        ],
      },
      // Roads
      {
        id: "roads",
        typeName: "shankharapur:FINAL_ROADS_CLIPPED",
        style: { weight: 2, color: "black", fillOpacity: 0.1 },
        displayName: "Roads Data",
        popupProperties: [
          { key: "Name", displayName: "सडकको नाम" }, // Specific for roads
          // Add other road-specific properties as needed
        ],
      },
      // Natural Features
      {
        id: "forest",
        typeName: "shankharapur:FOREST_CLIPPED",
        style: { weight: 1.5, color: "darkgreen", fillOpacity: 0.5 },
        displayName: "Forest Data",
        popupProperties: [
          { key: "Forest_Nam", displayName: "जंगलको नाम" }, // Specific for forest
          // Add other forest-specific properties as needed
        ],
      },
      {
        id: "river",
        typeName: "shankharapur:River",
        style: { weight: 5, color: "cyan", fillOpacity: 0.1 },
        displayName: "River Data",
        popupProperties: [
          { key: "Name_River", displayName: "नदिको नाम" }, // Specific for river
          // Add other river-specific properties as needed
        ],
      },
      {
        id: "buildings-Government",
        typeName: "shankharapur:Government_Office",
        style: { weight: 5, color: "green", fillOpacity: 0.1 },
        displayName: "Government Office",
        popupProperties: [
          { key: "Name", displayName: "कार्यालयको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },
      {
        id: "buildings-Residential",
        typeName: "shankharapur:Residential",
        style: { weight: 5, color: "red", fillOpacity: 0.1 },
        displayName: "Government Office",
        popupProperties: [
          { key: "Name", displayName: "घरधनीको नाम" }, // Specific for Residential Buildings
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },
      {
        id: "buildings-HealthPost",
        typeName: "shankharapur:Health_Post",
        style: { weight: 8, color: "purple", fillOpacity: 0.7 },
        displayName: "Health Post Buildings",
        popupProperties: [
          { key: "Name", displayName: "स्वास्थ्य चौकीको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },
      {
        id: "buildings-School",
        typeName: "shankharapur:School",
        style: { weight: 8, color: "blue", fillOpacity: 0.7 },
        displayName: "School Buildings",
        popupProperties: [
          { key: "Name", displayName: "विद्यालयको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },

      {
        id: "buildings-Hotel",
        typeName: "shankharapur:Hotel",
        style: { weight: 8, color: "yellow", fillOpacity: 0.7 },
        displayName: "Hotel Buildings",
        popupProperties: [
          { key: "Name", displayName: "होटलको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },
      {
        id: "buildings-Temple",
        typeName: "shankharapur:Temple",
        style: { weight: 6, color: "brown", fillOpacity: 0.7 },
        displayName: "Temple Buildings",
        popupProperties: [
          { key: "Name", displayName: "मन्दिरको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },

      {
        id: "buildings-Stupa",
        typeName: "shankharapur:Stupa",
        style: { weight: 6, color: "gray", fillOpacity: 0.7 },
        displayName: "Stupa Buildings",
        popupProperties: [
          { key: "Name", displayName: "स्तुपाको नाम" },
          { key: "House_No", displayName: "घरको नम्बर" },
          { key: "Type", displayName: "प्रकार" },
        ],
      },

      {
        id: "sarbajanik-bhawan",
        typeName: "shankharapur:Bhawan",
        style: { weight: 3, color: "darkblue", fillOpacity: 0.7 },
        displayName: "Sarbajanik Bhawan",
        popupProperties: [
          { key: "Name", displayName: "भवनको नाम" },
          { key: "TYPE", displayName: "प्रकार" },
        ],
      },

      {
        id: "sarbajanik-jagga",
        typeName: "shankharapur:publicLand",
        style: { weight: 3, color: "violet", fillOpacity: 0.7 },
        displayName: "Sarbajanik Jagga",
        popupProperties: [
          { key: "Name", displayName: "स्थानको नाम" },
          { key: "TYPE", displayName: "प्रकार" },
        ],
      },

      {
        id: "paragliding",
        typeName: "shankharapur:paragliding",
        style: { weight: 3, color: "orange", fillOpacity: 0.7 },
        displayName: "Paragliding Area",
        popupProperties: [
          { key: "Name", displayName: "स्थानको नाम" }, // Specific for Public Places
          { key: "TYPE", displayName: "प्रकार" },
        ],
      },
      {
        id: "football-ground",
        typeName: "shankharapur:Football_Ground",
        style: { weight: 3, color: "lightgreen", fillOpacity: 0.7 },
        displayName: "Football Ground",
        popupProperties: [
          { key: "Name", displayName: "मैदानको नाम" },
          { key: "TYPE", displayName: "प्रकार" },
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
      // Prevent refetching if already loading or data exists
      if (loadingStates[layerId] || dynamicGeoJSONData[layerId]) {
        return;
      }

      const wfsRequestUrl = `${geoserverOWSUrl}?service=WFS&version=1.1.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json`;

      setLoadingStates((prev) => ({ ...prev, [layerId]: true }));
      setErrorStates((prev) => ({ ...prev, [layerId]: null }));
      console.log(`Fetching ${layerId} WFS data from:`, wfsRequestUrl);

      try {
        const response = await fetch(wfsRequestUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`${layerId} WFS data fetched successfully.`);
        setDynamicGeoJSONData((prev) => ({ ...prev, [layerId]: data }));
      } catch (error) {
        console.error(`Error fetching ${layerId} WFS data:`, error);
        setErrorStates((prev) => ({ ...prev, [layerId]: error.message }));
      } finally {
        setLoadingStates((prev) => ({ ...prev, [layerId]: false }));
      }
    },
    [geoserverOWSUrl, loadingStates, dynamicGeoJSONData]
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

  // This function now handles updating the side panel state on feature click
  const getOnEachFeatureHandler = useCallback(
    (layerSpecificPopupProperties) => (feature, layer) => {
      // Attach a click listener to the Leaflet layer
      layer.on("click", () => {
        const properties = feature.properties;
        let displayProperties = [];

        // Use the layer-specific properties passed to this handler
        const propertiesToDisplay = layerSpecificPopupProperties || [];

        let propertiesFound = false;
        for (const propDef of propertiesToDisplay) {
          const { key, displayName } = propDef;
          // Check if the property exists and has a non-empty value
          if (
            Object.prototype.hasOwnProperty.call(properties, key) &&
            properties[key] !== null &&
            properties[key] !== undefined &&
            String(properties[key]).trim() !== ""
          ) {
            displayProperties.push({ displayName, value: properties[key] });
            propertiesFound = true;
          }
        }

        // Fallback: If no specific popupProperties were defined or none had values,
        // show all available properties from the feature.
        if (!propertiesFound && Object.keys(properties).length > 0) {
          for (const key in properties) {
            if (
              Object.prototype.hasOwnProperty.call(properties, key) &&
              properties[key] !== null &&
              properties[key] !== undefined &&
              String(properties[key]).trim() !== ""
            ) {
              // Simple conversion of key to display name (e.g., "Kitta_No" -> "Kitta No")
              const displayName = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
              displayProperties.push({ displayName, value: properties[key] });
            }
          }
        }

        setSelectedFeatureData({
          properties:
            displayProperties.length > 0
              ? displayProperties
              : [
                  {
                    displayName: "No detailed properties available.",
                    value: "",
                  },
                ],
        });
        setSidePanelOpen(true);
      });
      // IMPORTANT: Remove layer.bindPopup() if you want to use the side panel instead
      // layer.bindPopup(popupContent);
    },
    []
  );

  // Function to close the side panel
  const closeSidePanel = useCallback(() => {
    setSelectedFeatureData(null);
    setSidePanelOpen(false);
  }, []);

  // Smart style function for grouped layers (unchanged)
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

      for (const subLayerConfig of baseConfig.subLayers) {
        if (
          selectedLayers.includes(subLayerConfig.id) &&
          feature.properties &&
          feature.properties[subLayerConfig.filterProperty] ===
            subLayerConfig.filterValue
        ) {
          return { ...subLayerConfig.style, clickable: true };
        }
      }

      return defaultHiddenStyle;
    },
    [selectedLayers, dynamicLayersConfig]
  );

  // Filter function for grouped layers (unchanged)
  const filterGroupedFeatures = useCallback(
    (baseLayerId, feature) => {
      const baseConfig = dynamicLayersConfig.find(
        (config) => config.id === baseLayerId
      );
      if (!baseConfig || !baseConfig.isGroup || !baseConfig.subLayers) {
        return false;
      }

      return baseConfig.subLayers.some(
        (subLayerConfig) =>
          selectedLayers.includes(subLayerConfig.id) &&
          feature.properties &&
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
              url="https://maps.phnx.com.np/geoserver/shankharapur/wms?tiled=true"
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
                  onEachFeature={(feature, layer) => {
                    const baseConfigForPopup = dynamicLayersConfig.find(
                      (c) => c.id === layerConfig.id
                    );
                    if (
                      baseConfigForPopup &&
                      baseConfigForPopup.isGroup &&
                      baseConfigForPopup.subLayers
                    ) {
                      const matchingSubLayer =
                        baseConfigForPopup.subLayers.find(
                          (sub) =>
                            feature.properties &&
                            feature.properties[sub.filterProperty] ===
                              sub.filterValue
                        );

                      if (matchingSubLayer) {
                        getOnEachFeatureHandler(
                          matchingSubLayer.popupProperties
                        )(feature, layer);
                      } else {
                        // Fallback if no matching sub-layer config is found for the feature type
                        getOnEachFeatureHandler([])(feature, layer);
                      }
                    } else {
                      // This else block handles cases where a grouped layer somehow doesn't have sub-layers (shouldn't happen)
                      getOnEachFeatureHandler([])(feature, layer);
                    }
                  }}
                  filter={(feature) =>
                    filterGroupedFeatures(layerConfig.id, feature)
                  }
                />
              );
            } else {
              // For non-grouped layers, use their specific popupProperties
              return (
                <GeoJSON
                  key={layerConfig.id}
                  data={dataToRender}
                  style={layerConfig.style}
                  onEachFeature={getOnEachFeatureHandler(
                    layerConfig.popupProperties
                  )}
                />
              );
            }
          }
          return null;
        })}

        {/* Display loading/error messages for dynamic layers */}
        {allLayerIds.map((layerId) => {
          let baseConfig = dynamicLayersConfig.find((lc) => lc.id === layerId);
          let subConfig = null;

          if (!baseConfig) {
            for (const lc of dynamicLayersConfig) {
              if (lc.isGroup && lc.subLayers) {
                const foundSub = lc.subLayers.find((sl) => sl.id === layerId);
                if (foundSub) {
                  baseConfig = lc;
                  subConfig = foundSub;
                  break;
                }
              }
            }
          }

          const currentBaseLayerId = baseConfig ? baseConfig.id : layerId;
          const displayName = subConfig
            ? subConfig.displayName
            : baseConfig?.displayName || layerId.replace(/-/g, " ");

          if (
            selectedLayers.includes(layerId) &&
            loadingStates[currentBaseLayerId]
          ) {
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
                Loading {displayName} Data...
              </div>
            );
          }
          if (
            selectedLayers.includes(layerId) &&
            errorStates[currentBaseLayerId]
          ) {
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
                Error loading {displayName} Data:{" "}
                {errorStates[currentBaseLayerId]}
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
      getOnEachFeatureHandler,
      getGroupedLayerStyle,
      filterGroupedFeatures,
      allLayerIds,
    ]
  );

  return (
    <div className="map-area">
      {memoizedMapContainer}

      {/* Side Panel for Feature Details */}
      {/* Conditional rendering for animation: opacity and scale */}
      <div
        className={`absolute top-[90px] right-[10px] w-80 h-fit max-h-[80%] bg-white z-[1001] shadow-lg rounded-lg p-6 flex flex-col transition-all duration-300 ease-out
          ${
            sidePanelOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">विवरण</h3>
          <button
            onClick={closeSidePanel}
            className="text-gray-500 hover:text-gray-700 text-3xl font-light leading-none transition-colors duration-200"
            title="Close"
          >
            &times;
          </button>
        </div>
        {selectedFeatureData &&
        selectedFeatureData.properties.length > 0 &&
        selectedFeatureData.properties[0].value !== "" ? (
          <div className="flex-grow overflow-y-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <tbody>
                {selectedFeatureData.properties.map((prop, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-2 px-3 font-medium bg-gray-50">
                      {prop.displayName}:
                    </td>
                    <td className="py-2 px-3">{prop.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">यस तहको लागि कुनै सम्पत्ति छैन।</p>
        )}
      </div>
    </div>
  );
}

export default Map;
