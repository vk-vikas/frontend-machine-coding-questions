import { useEffect, useRef, useState } from "react";
import "./styles.css";

function MultiSelectDropdown({ options, placeholder = "Select", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const ref = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (option) =>
    selected.some((item) => item.value === option.value);

  const toggleOption = (option) => {
    let updated;
    if (isSelected(option)) {
      updated = selected.filter((item) => item.value !== option.value);
    } else {
      updated = [...selected, option];
    }
    setSelected(updated);
    onChange?.(updated.map((item) => item.value));
  };

  const removeTag = (value) => {
    const updated = selected.filter((item) => item.value !== value);
    setSelected(updated);
    onChange?.(updated.map((item) => item.value));
  };

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ width: 250, position: "relative" }}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          border: "1px solid #ccc",
          padding: "6px",
          minHeight: "36px",
          cursor: "pointer",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {selected.length === 0 && (
          <span style={{ color: "#888" }}>{placeholder}</span>
        )}

        {selected.map((item) => (
          <span
            key={item.value}
            style={{
              border: "1px solid #aaa",
              padding: "2px 6px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {item.label}
            <span
              onClick={(e) => {
                e.stopPropagation();
                removeTag(item.value);
              }}
              style={{ cursor: "pointer" }}
            >
              ×
            </span>
          </span>
        ))}
      </div>

      {isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%",
            background: "#fff",
            maxHeight: 160,
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          <input
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
              onClick={() => toggleOption(option)}
              style={{
                background: isSelected(option) ? "pink" : "#fff",
              }}
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

export default MultiSelectDropdown;
