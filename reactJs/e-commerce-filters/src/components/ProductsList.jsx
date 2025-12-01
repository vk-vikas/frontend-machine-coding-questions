import { useFilters } from "../context/FiltersContext";
import productsData from "../data/productsData";

export default function ProductsList() {
  const { filters } = useFilters();

  const filtered = productsData
    .filter((p) =>
      filters.categories.length
        ? filters.categories.includes(p.category)
        : true
    )
    .filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .filter((p) => (filters.rating ? p.rating >= filters.rating : true))
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh") return a.price - b.price;
      if (filters.sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ flex: 1 }}>
      <h2>Products ({filtered.length})</h2>
      {filtered.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 10,
            borderRadius: 4,
          }}
        >
          <div style={{ fontWeight: "bold" }}>{p.title}</div>
          <div>Category: {p.category}</div>
          <div>Rating: ⭐ {p.rating}</div>
          <div>Price: ₹{p.price}</div>
        </div>
      ))}
    </div>
  );
}