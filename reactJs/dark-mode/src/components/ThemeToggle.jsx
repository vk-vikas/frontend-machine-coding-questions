import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: "1px solid gray",
        cursor: "pointer",
        background: "transparent",
      }}
    >
      {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
