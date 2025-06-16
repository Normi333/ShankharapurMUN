import React from "react";
import "../css/Skeleton.css";

const Skeleton = ({ height = 200, width = "100%" }) => {
  return (
    <div
      className="skeleton"
      style={{
        height: `${height}px`,
        width: width,
      }}
    ></div>
  );
};

export default Skeleton;
