"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

export const themes = {
  light: "winter",
  dark: "night",
};

const ThemeController = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.getAttribute("data-theme") === themes.dark
      );
    }
    return false;
  });

  useEffect(() => {
    themeChange(false);

    const updateThemeState = () => {
      setIsDark(
        document.documentElement.getAttribute("data-theme") === themes.dark
      );
    };

    updateThemeState(); // Initial state

    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? themes.light : themes.dark;
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="flex items-center cursor-pointer space-x-2">
      <input
        type="checkbox"
        className="hidden"
        onChange={toggleTheme}
        checked={isDark}
      />
      <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 flex items-center">
        <div
          className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {/* Sun Icon (Light Mode) */}
          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          {/* Moon Icon (Dark Mode) */}
          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-4 h-4 absolute transition-opacity duration-300 ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </div>
      </div>
    </label>
  );
};

export default ThemeController;
