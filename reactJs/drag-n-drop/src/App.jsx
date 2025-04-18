import { useState } from "react";

import "./App.css";
import Notes from "./components/Notes";
const notesData = [
  {
    id: 1,
    text: "This is the first note",
  },
  {
    id: 2,
    text: "This is the second note",
  },
];
function App() {
  const [notes, setNotes] = useState(notesData);
  return (
    <>
      <Notes notes={notes} setNotes={setNotes} />
    </>
  );
}

export default App;
