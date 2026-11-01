"use client";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("deen");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "deen";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    // 👇 deen (light) থেকে hope-dark (dark) এ যাওয়া
    const newTheme = theme === "deen" ? "hope-dark" : "deen";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle text-base-content"
      aria-label="Toggle Theme"
    >
      {theme === "deen" ? <FiMoon size={22} /> : <FiSun size={22} />}
    </button>
  );
}