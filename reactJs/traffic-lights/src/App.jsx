import { useState } from "react";
import "./App.css";
import TrafficLight from "./components/TrafficLight";

const configData = [
  {
    color: "red",
    duration: 3000,
    lightUpOrder: 3,
    displayOrder: 1,
  },
  {
    color: "yellow",
    duration: 1000,
    lightUpOrder: 2,
    displayOrder: 2,
  },
  {
    color: "green",
    duration: 5000,
    lightUpOrder: 1,
    displayOrder: 3,
  },
  {
    color: "blue",
    duration: 2000,
    lightUpOrder: 4,
    displayOrder: 4,
  },
];
function App() {
  return (
    <>
      <TrafficLight data={configData} />
    </>
  );
}

export default App;
