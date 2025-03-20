"use client";
import { useEffect, useState } from "react";
import { RiSunLine, RiMoonClearLine } from "@remixicon/react";

export default function Theme() {
  const [theme, setTheme] = useState<"silk" | "black">("silk");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "silk" | "black";
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "silk" ? "black" : "silk"));
  };

  return (
    <button className="btn btn-square btn-ghost" onClick={toggleTheme}>
      {theme === "silk" ? (
        <RiMoonClearLine size={20} />
      ) : (
        <RiSunLine size={20} />
      )}
    </button>
  );
}
