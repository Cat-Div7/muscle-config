export function generateThemeToggle(isTypeScript: boolean): string {
  // Add Types Saftey in case TypeScript is selected [ Later ]
  return `
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // You can replace this with ContextAPI later
  const [dark, setDark] = useState(() => {
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