import { useFilters } from "../context/FiltersContext";

export default function Filters() {
  const { filters, dispatch } = useFilters();

  const categories = ["Electronics", "Clothing", "Home", "Books"];

  return (
    <div
      style={{
        width: 250,
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 6,
        height: "fit-content",
      }}
    >
      <h3>Filters</h3>

      {/* Category */}
      <div style={{ marginBottom: 20 }}>
        <h4>Category</h4>
        {categories.map((cat) => (
          <label key={cat} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() =>
                dispatch({ type: "TOGGLE_CATEGORY", payload: cat })
              }
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 20 }}>
        <h4>Price Range</h4>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE",
              payload: { minPrice: Number(e.target.value) },
            })
          }
          style={{ width: "45%", marginRight: "10%" }}
        />
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE",
              payload: { maxPrice: Number(e.target.value) },
            })
          }
          style={{ width: "45%" }}
        />
      </div>

      {/* Rating */}
      <div style={{ marginBottom: 20 }}>
        <h4>Rating</h4>
        {[4, 3, 2, 1].map((r) => (
          <label key={r} style={{ display: "block" }}>
            <input
              type="radio"
              checked={filters.rating === r}
              onChange={() =>
                dispatch({ type: "SET_RATING", payload: r })
              }
            />
            {r} ★ & above
          </label>
        ))}
      </div>

      {/* Sort */}
      <div style={{ marginBottom: 20 }}>
        <h4>Sort By</h4>
        <label>
          <input
            type="radio"
            checked={filters.sortBy === "lowToHigh"}
            onChange={() => dispatch({ type: "SET_SORT", payload: "lowToHigh" })}
          />
          Price: Low → High
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={filters.sortBy === "highToLow"}
            onChange={() => dispatch({ type: "SET_SORT", payload: "highToLow" })}
          />
          Price: High → Low
        </label>
      </div>

      {/* Clear */}
      <button
        onClick={() => dispatch({ type: "CLEAR" })}
        style={{
          padding: "6px 10px",
          border: "1px solid black",
          background: "white",
          cursor: "pointer",
          borderRadius: 4,
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}