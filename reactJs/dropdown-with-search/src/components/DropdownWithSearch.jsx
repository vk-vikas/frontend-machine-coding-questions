import { useState, useRef, useEffect } from "react";
import "./styles.css";

function Dropdown({ options, placeholder = "Select", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const containerRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    onChange?.(option.value);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} style={{ width: 200, position: "relative" }}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        {selected ? selected.label : placeholder}
        {isOpen ? "^" : "<"}
      </div>

      {isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%",
            background: "#fff",
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "6px",
              boxSizing: "border-box",
            }}
          />

          {filteredOptions.length === 0 && (
            <div style={{ padding: "6px" }}>No results</div>
          )}

          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="dropdown-option"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
