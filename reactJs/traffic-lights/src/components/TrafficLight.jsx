import React, { useEffect, useState, useRef } from 'react';
// import "./style.css";

const defaultSequence = [
  { color: 'red', duration: 3000, renderOrder: 0, lightUpOrder: 0 },
  { color: 'yellow', duration: 1000, renderOrder: 1, lightUpOrder: 1 },
  { color: 'green', duration: 2000, renderOrder: 2, lightUpOrder: 2 },
];

const TrafficLight = ({ sequence = defaultSequence }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Sorted for controlling light-up order
  const lightUpSequence = [...sequence].sort(
    (a, b) => a.lightUpOrder - b.lightUpOrder
  );

  // Sorted for layout rendering
  const layoutSequence = [...sequence].sort(
    (a, b) => a.renderOrder - b.renderOrder
  );

  useEffect(() => {
    const { duration } = lightUpSequence[activeIndex];

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % lightUpSequence.length);
    }, duration);

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, lightUpSequence]);

  const activeColor = lightUpSequence[activeIndex].color;

  return (
    <div
      style={{
        border: '1px solid black',
        width: 'fit-content',
        padding: '20px',
      }}
    >
      {layoutSequence.map((light, index) => {
        const isActive = light.color === activeColor;
        return (
          <div
            key={index}
            style={{
              backgroundColor: isActive ? light.color : '#444',
              width: '100px',
              height: '100px',
              borderRadius: '100%',
            }}
          />
        );
      })}
    </div>
  );
};

export default TrafficLight;
