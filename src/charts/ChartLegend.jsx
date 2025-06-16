import React from "react";
import "../css/ChartLegend.css";

const ChartLegend = ({
  labels,
  colors,
  hoveredIndex,
  onClick,
  hiddenItems,
}) => {
  return (
    <div className="chart-legend-container">
      <ul className="chart-legend">
        {labels.map((label, i) => (
          <li
            key={i}
            className={`${hoveredIndex === i ? "highlighted" : ""}${
              hiddenItems[i] ? "hidden" : ""
            }`}
            style={{ color: colors[i], cursor: "pointer" }}
            onClick={() => onClick?.(i)}
          >
            <span
              className="legend-color"
              style={{
                backgroundColor: colors[i],
                opacity: hiddenItems[i] ? 0.3 : 1,
              }}
            ></span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartLegend;
