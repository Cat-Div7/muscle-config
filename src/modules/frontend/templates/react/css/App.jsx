import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
      fontFamily: "var(--font-base, system-ui)",
      backgroundColor: "var(--bg, #ffffff)",
      color: "var(--text, #171717)",
    }}>
      <h1>CSS is ready 🎉</h1>

      <p style={{ color: "var(--color-muted, #555)" }}>
        Your CSS variables and reset are set up and ready to use.
      </p>

      <ThemeToggle />

      <button style={{
        padding: "0.5rem 1.25rem",
        backgroundColor: "var(--color-primary, #6366f1)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius, 0.5rem)",
        cursor: "pointer",
        fontSize: "1rem",
      }}>
        Everything is working
      </button>

      <small style={{ color: "var(--color-muted, #999)" }}>
        You can delete this demo and start building your app.
      </small>
    </div>
  );
}