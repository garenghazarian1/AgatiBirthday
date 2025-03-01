"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale) => {
    const newPath = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, "")}`; // Keep the same path, just change the locale
    if (typeof window !== "undefined") {
      localStorage.setItem("user-locale", newLocale); // Save selected language
    }
    router.push(newPath);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage("en")}
        className="p-2 border rounded"
      >
        🇬🇧 English
      </button>
      <button
        onClick={() => changeLanguage("am")}
        className="p-2 border rounded"
      >
        🇦🇲 Հայերեն
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className="p-2 border rounded"
      >
        🇦🇪 العربية
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className="p-2 border rounded"
      >
        🇷🇺 Русский
      </button>
    </div>
  );
}
