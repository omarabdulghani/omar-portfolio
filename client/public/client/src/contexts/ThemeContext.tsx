import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type DefaultTheme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "portfolio_theme_choice";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: DefaultTheme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored as Theme;
    if (defaultTheme === "system") return getSystemTheme();
    return defaultTheme as Theme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Persist only when user explicitly toggles (so first visit follows system)
  const toggleTheme = switchable
    ? () => {
        setTheme((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem(THEME_STORAGE_KEY, next);
          return next;
        });
      }
    : undefined;

  // React to system preference changes when user hasn't set a preference
  useEffect(() => {
    if (!switchable || typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [switchable]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
