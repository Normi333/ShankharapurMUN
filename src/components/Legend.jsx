// import { ro } from "date-fns/locale/ro";
// import "../css/Legend.css";

// const legendItems = {
//   border: { label: "Border", className: "border" },
//   forest: { label: "Forest", className: "forest" },
//   buildings: { label: "Buildings", className: "buildings" },
//   river: { label: "River", className: "river" },
//   "roads-all": { label: "Roads (All)", className: "roads-all" },
//   "roads-Internal": { label: "Roads (Internal)", className: "roads-Internal" },
//   "roads-External": { label: "Roads (External)", className: "roads-External" },
//   "buildings-all": { label: "Buildings (All)", className: "buildings-all" },
//   "buildings-Residential": {
//     label: "Buildings (Residential)",
//     className: "buildings-Residential",
//   },
//   "buildings-School": {
//     label: "Buildings (School)",
//     className: "buildings-School", // Note: Class names often avoid spaces
//   },
//   "buildings-Government": {
//     label: "Buildings (Government)",
//     className: "buildings-Government",
//   },
//   "buildings-HealthPost": {
//     label: "Buildings (Health Post)",
//     className: "buildings-HealthPost",
//   },
//   "buildings-Hotel": {
//     label: "Buildings (Hotel)",
//     className: "buildings-Hotel",
//   },
// };

// function Legend({ selectedLayers }) {
//   const visibleLegends = selectedLayers.filter((key) => legendItems[key]);

//   return (
//     <div className="legend-box">
//       <strong>Legend</strong>
//       {visibleLegends.map((key) => (
//         <div className="legend-item" key={key}>
//           <span className={`legend-color ${legendItems[key].className}`} />
//           {legendItems[key].label}
//         </div>
//       ))}
//       {visibleLegends.length === 0 && (
//         <div style={{ color: "#bbb" }}>No layers selected</div>
//       )}
//     </div>
//   );
// }

// export default Legend;

import "../css/Legend.css"; // Ensure this CSS file is correctly styled for the new classes

const legendItems = {
  border: { label: "Border", className: "border" },
  forest: { label: "Forest", className: "forest" },
  river: { label: "River", className: "river" },
  public: { label: "Public Place", className: "public" }, // Added public place
  napi: { label: "Napi Border", className: "napi" }, // Added Napi Border

  // Updated Road layer: Single 'roads' option
  roads: { label: "Roads", className: "roads" }, // This will represent all roads

  // Updated Building layers: Specific types only, no 'buildings-all'
  // Note: The 'buildings' generic entry is removed as it's no longer a direct layer
  "buildings-Residential": {
    label: "Residential Buildings", // Updated label for clarity
    className: "buildings-Residential",
  },
  "buildings-School": {
    label: "School Buildings", // Updated label for clarity
    className: "buildings-School",
  },
  "buildings-Government": {
    label: "Government Offices", // Updated label for clarity
    className: "buildings-Government",
  },
  "buildings-HealthPost": {
    label: "Health Posts", // Updated label for clarity
    className: "buildings-HealthPost",
  },
  "buildings-Hotel": {
    label: "Hotels", // Updated label for clarity
    className: "buildings-Hotel",
  },
};

function Legend({ selectedLayers }) {
  // Filter for only the selected layers that have a corresponding legend item
  const visibleLegends = selectedLayers.filter((key) => legendItems[key]);

  return (
    <div className="legend-box">
      <strong>Legend</strong>
      {visibleLegends.length > 0 ? (
        visibleLegends.map((key) => (
          <div className="legend-item" key={key}>
            {/* The span uses the className defined in legendItems for styling */}
            <span className={`legend-color ${legendItems[key].className}`} />
            {legendItems[key].label}
          </div>
        ))
      ) : (
        <div style={{ color: "#bbb", fontSize: "0.9em", padding: "5px 0" }}>
          No layers selected
        </div>
      )}
    </div>
  );
}

export default Legend;
