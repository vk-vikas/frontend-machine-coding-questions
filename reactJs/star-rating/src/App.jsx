import { useState } from "react";

import "./App.css";
import StarRating from "./components/StarRating";

function App() {
  const [rating, setRating] = useState(3);
  const handleChange = (value) => {
    setRating(value);
  };
  return (
    <div>
      <StarRating rating={rating} size={23} onChange={handleChange} />
      <p>Current Rating: {rating}</p>
    </div>
  );
}

export default App;
