"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { themes } from "./ThemeController";

const ThemeLogo = () => {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme) {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme = document.documentElement.getAttribute("data-theme");
          if (newTheme) {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/" className="w-24">
      <img
        src={theme === themes.dark ? "/new-logo-white.png" : "/new-logo.png"}
        alt="site logo"
      />
    </Link>
  );
};

export default ThemeLogo;
