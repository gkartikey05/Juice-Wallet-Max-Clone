"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "../utils/utils";

interface ThemeToggleProps {
  className?: string;
}

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const persisted = window.localStorage.getItem("theme");
  if (persisted === "light" || persisted === "dark") return persisted;
  return "light";
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">(() =>
    getPreferredTheme()
  );

  // Apply theme to documentElement and persist
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // No system preference sync: default is light unless user chooses otherwise

  const handleThemeChange = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={handleThemeChange}
      className={cn(
        "relative w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
        className
      )}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Sun className="absolute inset-0 h-full w-full transition-all duration-300 opacity-100 rotate-0 dark:opacity-0 dark:-rotate-90" />
      <Moon className="absolute inset-0 h-full w-full transition-all duration-300 opacity-0 rotate-90 dark:opacity-100 dark:rotate-0" />
    </button>
  );
}
