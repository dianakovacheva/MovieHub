"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only render theme switch on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update data-theme attribute when theme changes
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <label className="swap swap-rotate btn btn-ghost">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      {/* sun icon */}
      <Sun className="swap-off" />

      {/* moon icon */}
      <Moon className="swap-on" />
    </label>
  );
}
