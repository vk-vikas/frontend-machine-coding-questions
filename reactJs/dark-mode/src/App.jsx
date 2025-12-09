import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: 20 }}>
        <h2>Dark / Light Theme Machine Coding</h2>

        <ThemeToggle />

        <p style={{ marginTop: 20 }}>
          Using Context + custom hook + localStorage + CSS variables.
        </p>
      </div>
    </ThemeProvider>
  );
}