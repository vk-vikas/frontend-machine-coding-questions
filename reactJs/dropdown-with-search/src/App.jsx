import "./App.css";
import Dropdown from "./components/DropdownWithSearch";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

const options = [
  { label: "India", value: "IN" },
  { label: "USA", value: "US" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
];

export default function App() {
  return (
    <MultiSelectDropdown
      options={options}
      placeholder="Select country"
      onChange={(value) => console.log(value)}
    />
  );
}
