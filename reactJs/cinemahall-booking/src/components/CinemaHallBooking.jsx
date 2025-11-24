import React, { useMemo, useState } from "react";

export default function CinemaHallBooking({
  layout = { rows: 10, seatsPerRow: 32, aislePosition: 6 },
  seatTypes = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    vip: { name: "VIP", price: 350, rows: [6, 7, 8, 9, 10] },
  },
  bookedSeats = [],
  currency = "₹",
  onBookingComplete = () => {},
  title = "Cinema Hall Booking",
  subtitle = "Select your preferred seats",
}) {
  const { rows, seatsPerRow, aislePosition } = layout;
  const [selected, setSelected] = useState([]);

  /** Human-readable palette */
  const typeColorMap = useMemo(() => {
    const palette = ["lightblue", "khaki", "lightcoral", "lightgreen", "plum"];
    const map = {};
    Object.keys(seatTypes).forEach((type, i) => {
      map[type] = palette[i % palette.length];
    });
    return map;
  }, [seatTypes]);

  /** Row → seat type */
  const seatTypeMap = useMemo(() => {
    const map = {};
    Object.keys(seatTypes).forEach((type) => {
      seatTypes[type].rows.forEach((r) => (map[r] = type));
    });
    return map;
  }, [seatTypes]);

  /** Seat ID like A1 */
  const getSeatId = (row, col) => `${String.fromCharCode(65 + row)}${col + 1}`;

  const getTypeByRow = (row) => seatTypes[seatTypeMap[row]];

  /** Select/deselect seat */
  const toggleSeat = (row, col) => {
    const id = getSeatId(row, col);
    if (bookedSeats.includes(id)) return;

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    return selected.reduce((sum, id) => {
      const row = id.charCodeAt(0) - 65;
      return sum + getTypeByRow(row).price;
    }, 0);
  }, [selected]);

  /** Individual seat renderer */
  const renderSeat = (row, col) => {
    const id = getSeatId(row, col);
    const typeKey = seatTypeMap[row];
    const baseColor = typeColorMap[typeKey];

    const isBooked = bookedSeats.includes(id);
    const isSelected = selected.includes(id);

    return (
      <button
        key={id}
        onClick={() => toggleSeat(row, col)}
        title={`${id} - ${getTypeByRow(row)?.name}`}
        style={{
          width: 28,
          height: 28,
          margin: 3,
          borderRadius: 4,
          border: "1px solid #555",
          cursor: isBooked ? "not-allowed" : "pointer",
          backgroundColor: isBooked
            ? "lightgray"
            : isSelected
            ? "lightseagreen"
            : baseColor,
        }}
      />
    );
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 900, width: "100%" }}>
        <h2>{title}</h2>
        <p style={{ opacity: 0.7 }}>{subtitle}</p>

        {/* SCROLLABLE SEAT REGION (horizontal + vertical) */}
        <div
          style={{
            textAlign: "center",
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "60vh", // vertical scroll constraint
            paddingBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "inline-block" }}>
            {/* Screen */}
            <div
              style={{
                width: "100%",
                height: 35,
                background: "#ddd",
                borderRadius: 6,
                margin: "20px 0",
                textAlign: "center",
                lineHeight: "35px",
                fontWeight: "bold",
              }}
            >
              Screen
            </div>

            {/* Seat Layout */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Array.from({ length: rows }).map((_, row) => (
                <div
                  key={row}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* Row Label */}
                  <div
                    style={{
                      width: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                      textAlign: "center",
                    }}
                  >
                    {String.fromCharCode(65 + row)}
                  </div>

                  {/* Left section */}
                  <div style={{ display: "flex" }}>
                    {Array.from({ length: aislePosition }).map((_, col) =>
                      renderSeat(row, col)
                    )}
                  </div>

                  {/* AISLE GAP */}
                  <div
                    style={{
                      width: 40,
                      display: "inline-block",
                      margin: "0 8px",
                    }}
                  />

                  {/* Right section */}
                  <div style={{ display: "flex" }}>
                    {Array.from({
                      length: seatsPerRow - aislePosition,
                    }).map((_, i) => renderSeat(row, aislePosition + i))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEGEND */}
        <div style={{ marginTop: 25 }}>
          <h3>Seat Categories</h3>

          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {Object.keys(seatTypes).map((type) => {
              const info = seatTypes[type];
              return (
                <div
                  key={type}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    background: "#f5f5f5",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: typeColorMap[type],
                      borderRadius: 4,
                      border: "1px solid #444",
                    }}
                  ></div>
                  <span>
                    {info.name} ({currency}
                    {info.price})
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginTop: 25 }}>
          <h3>Selected Seats</h3>
          <p>{selected.length ? selected.join(", ") : "None"}</p>

          <h3>Total</h3>
          <strong>
            {currency}
            {totalPrice}
          </strong>

          <br />
          <button
            style={{
              marginTop: 20,
              padding: "8px 16px",
              background: selected.length ? "steelblue" : "#999",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: selected.length ? "pointer" : "not-allowed",
            }}
            disabled={!selected.length}
            onClick={() =>
              onBookingComplete({ selectedSeats: selected, totalPrice })
            }
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
}
