import React from "react";

const Light = ({ color, activeColor }) => {
  const opacity = color === activeColor ? 1 : 0.3;
  console.log("c", color, "a", activeColor);
  return (
    <div
      className="light"
      style={{ backgroundColor: color, opacity: opacity }}
    ></div>
  );
};

export default Light;
