"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("user-locale") || "en";
      setCurrentLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (newLocale === currentLocale) return; // Avoid unnecessary reloads
    const newPath = pathname.startsWith(`/${currentLocale}`)
      ? pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`)
      : `/${newLocale}${pathname}`;

    localStorage.setItem("user-locale", newLocale); // Save selected language
    setCurrentLocale(newLocale);
    router.push(newPath);
  };

  return (
    <div className="flex space-x-2 p-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`p-2 border rounded ${
          currentLocale === "en" ? "bg-gray-300" : ""
        }`}
      >
        🇬🇧 English
      </button>
      <button
        onClick={() => changeLanguage("am")}
        className={`p-2 border rounded ${
          currentLocale === "am" ? "bg-gray-300" : ""
        }`}
      >
        🇦🇲 Հայերեն
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`p-2 border rounded ${
          currentLocale === "ar" ? "bg-gray-300" : ""
        }`}
      >
        🇦🇪 العربية
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className={`p-2 border rounded ${
          currentLocale === "ru" ? "bg-gray-300" : ""
        }`}
      >
        🇷🇺 Русский
      </button>
      <button
        onClick={() => changeLanguage("de")}
        className={`p-2 border rounded ${
          currentLocale === "de" ? "bg-gray-300" : ""
        }`}
      >
        🇩🇪 Deutsch
      </button>
    </div>
  );
}
