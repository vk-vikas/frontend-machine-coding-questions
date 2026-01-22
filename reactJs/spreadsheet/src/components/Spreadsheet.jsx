import React, { useState, useCallback, useRef } from "react";
import "./sheets.css";

const ROWS = 10;
const COLS = 10;

// Helper to convert column index → A, B, C...
const getColumnLabel = (col) => String.fromCharCode("A".charCodeAt(0) + col);

// selected = { row: 2, col: 1 }  // B3

// data = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "ABC", ""]
// ]

export default function Spreadsheet() {
  const [data, setData] = useState(() =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ""))
  );

  const [selected, setSelected] = useState({ row: 0, col: 0 });
  const [editing, setEditing] = useState(false);

  // ref used to manually restore focus after editing
  const containerRef = useRef(null);

  const handleCellClick = (row, col) => {
    setSelected({ row, col });
    setEditing(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData((prev) => {
      const copy = prev.map((r) => [...r]); // no direct mutation of state
      copy[selected.row][selected.col] = value;
      return copy;
    });
  };

  const handleKeyDown = useCallback(
    (e) => {
      const { row, col } = selected;

      if (e.key === "Enter") {
        setEditing(true);
        return;
      }

      let nextRow = row;
      let nextCol = col;

      // clamp navigation to grid boundaries
      if (e.key === "ArrowDown") nextRow = Math.min(row + 1, ROWS - 1);
      if (e.key === "ArrowUp") nextRow = Math.max(row - 1, 0);
      if (e.key === "ArrowRight") nextCol = Math.min(col + 1, COLS - 1);
      if (e.key === "ArrowLeft") nextCol = Math.max(col - 1, 0);

      // update selection only if it actually changed
      if (nextRow !== row || nextCol !== col) {
        setSelected({ row: nextRow, col: nextCol });
        setEditing(false);
      }
    },
    [selected]
  );

  return (
    <div
      className="spreadsheet"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: COLS }).map((_, col) => (
              <th key={col}>{getColumnLabel(col)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((rowData, row) => (
            <tr key={row}>
              <th>{row + 1}</th>
              {rowData.map((cell, col) => {
                const isSelected = selected.row === row && selected.col === col;

                return (
                  <td
                    key={col}
                    className={isSelected ? "selected" : ""}
                    onClick={() => handleCellClick(row, col)}
                  >
                    {isSelected && editing ? (
                      // <input
                      //   autoFocus
                      //   value={cell}
                      //   onChange={handleChange}
                      //   onBlur={() => setEditing(false)}
                      // />
                      <input
                        autoFocus
                        value={cell}
                        onChange={handleChange}
                        onBlur={() => {
                          setEditing(false);
                          containerRef.current?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key.startsWith("Arrow")) {
                            setEditing(false);
                            containerRef.current?.focus();
                          }
                        }}
                      />
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
