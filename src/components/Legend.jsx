import { ro } from "date-fns/locale/ro";
import "../css/Legend.css";

const legendItems = {
  forest: { label: "Forest", className: "forest" },
  buildings: { label: "Buildings", className: "buildings" },
  river: { label: "River", className: "river" },
  "roads-all": { label: "Roads (All)", className: "roads-all" },
  "roads-Internal": { label: "Roads (Internal)", className: "roads-Internal" },
  "roads-External": { label: "Roads (External)", className: "roads-External" },
  "buildings-all": { label: "Buildings (All)", className: "buildings-all" },
  "buildings-Residential": {
    label: "Buildings (Residential)",
    className: "buildings-Residential",
  },
  "buildings-Government-Agro Office": {
    label: "Buildings (Govt. Agro Office)",
    className: "buildings-Government-Agro-Office", // Note: Class names often avoid spaces
  },
  "buildings-Government": {
    label: "Buildings (Government)",
    className: "buildings-Government",
  },
  "buildings-Finance": {
    label: "Buildings (Finance)",
    className: "buildings-Finance",
  },
  "buildings-Hotel": {
    label: "Buildings (Hotel)",
    className: "buildings-Hotel",
  },
};

function Legend({ selectedLayers }) {
  const visibleLegends = selectedLayers.filter((key) => legendItems[key]);

  return (
    <div className="legend-box">
      <strong>Legend</strong>
      {visibleLegends.map((key) => (
        <div className="legend-item" key={key}>
          <span className={`legend-color ${legendItems[key].className}`} />
          {legendItems[key].label}
        </div>
      ))}
      {visibleLegends.length === 0 && (
        <div style={{ color: "#bbb" }}>No layers selected</div>
      )}
    </div>
  );
}

export default Legend;
