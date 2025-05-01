import React, { useEffect, useState } from "react";
import Light from "./Light";

const TrafficLight = ({ data }) => {
  const getDisplayOrder = (randomOrderConfigData) => {
    // toSorted fn to sort the data based on displayOrder, it returns a new array unlike sort which sorts the original array
    return randomOrderConfigData.toSorted(
      (a, b) => a.displayOrder - b.displayOrder
    );
  };

  const getLightUpOrder = (randomOrderConfigData) => {
    return randomOrderConfigData.toSorted(
      (a, b) => a.lightUpOrder - b.lightUpOrder
    );
  };
  const a = getDisplayOrder(data);
  const b = getLightUpOrder(data);
  const [displayOrder, setDisplayOrder] = useState(a);
  const [lightUpOrder, setLightUpOrder] = useState(b);
  const [activeLightData, setActiveLightData] = useState(b[0]);

  useEffect(() => {
    setTimeout(() => {
      // findeIndex fn to find the index of the current active light
      const currentIndex = lightUpOrder.findIndex(
        (l) => l.color === activeLightData.color
      );
      const nextIndex = currentIndex + 1;
      const nextLightData = lightUpOrder[nextIndex] ?? lightUpOrder[0];
      setActiveLightData(nextLightData);
    }, [activeLightData.duration]);
  }, [activeLightData]);

  return (
    <div className="traffic-light">
      {displayOrder.map((item) => (
        <Light
          key={item.color}
          color={item.color}
          activeColor={activeLightData.color}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
