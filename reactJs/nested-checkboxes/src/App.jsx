import { useState } from "react";
import "./App.css";
import Checkboxes from "./components/Checkboxes";

const checkboxesData = [
  {
    id: 1,
    name: "fruit",
    children: [{ id: 2, name: "apple" }],
  },
  {
    id: 3,
    name: "vegetable",
    children: [
      { id: 4, name: "potato" },
      {
        id: 6,
        name: "tomato",
        children: [
          { id: 7, name: "local" },
          { id: 8, name: "cherry" },
        ],
      },
    ],
  },
];

function App() {
  const [checked, setChecked] = useState({ 1: true });

  return (
    <>
      <Checkboxes
        checked={checked}
        setChecked={setChecked}
        data={checkboxesData}
        rootNodes={checkboxesData}
      />
    </>
  );
}

export default App;
