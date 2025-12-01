import Filters from "./components/Filters.jsx";
import ProductsList from "./components/ProductsList.jsx";
import { FiltersProvider } from "./context/FiltersContext";

export default function App() {
  return (
    <FiltersProvider>
      <div style={{ display: "flex", padding: 20, gap: 20 }}>
        <Filters />
        <ProductsList />
      </div>
    </FiltersProvider>
  );
}
