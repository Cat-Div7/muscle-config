export function generateThemeToggle(isTypeScript: boolean): string {
  const stateType = isTypeScript ? "<boolean>" : "";

  return `
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState${stateType}(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 border rounded"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
`.trim();
}