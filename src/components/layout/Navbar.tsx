"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [hideOnMobile, setHideOnMobile] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    queueMicrotask(() => setIsDark(theme === "dark"));
    if (!savedTheme) localStorage.setItem("theme", theme);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setIsDark(checked);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex justify-center sticky top-2 items-center gap-[25px] w-full z-10">
      <div className="w-[70%] sm:w-[80%] border flex items-center sm:justify-center justify-end bg-gray-10/50 backdrop-blur-sm rounded-3xl py-2 px-4">
        <div className="flex items-center sm:gap-8 gap-5">
          <div className="flex items-center gap-4">
            <ul
              className={`w-[90%] sm:w-full sm:flex-row flex-col sm:bg-transparent bg-base-200 backdrop-blur-sm sm:static fixed top-12 left-[5%] rounded-2xl sm:border-transparent border mx-auto items-center text-base sm:p-0 p-2 gap-2 sm:gap-4 ${
                hideOnMobile ? "hidden" : "flex"
              } sm:flex`}
            >
              <li>
                <Link href="/#profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:underline">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:underline">
                  Experience
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex sm:hidden"
              onClick={() => setHideOnMobile(!hideOnMobile)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <button type="button" className="flex" aria-label="Toggle theme">
              <label className="toggle text-base-content toggle-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={(e) => handleThemeChange(e.target.checked)}
                  className="theme-controller"
                />
                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </g>
                </svg>
                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </g>
                </svg>
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
