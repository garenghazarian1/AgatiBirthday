"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState("en");
  const [isMounted, setIsMounted] = useState(false); // ✅ Prevents hydration errors

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("user-locale") || "en";
      setCurrentLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (selectedOption) => {
    const newLocale = selectedOption.value;
    if (newLocale === currentLocale) return;

    const newPath = pathname.startsWith(`/${currentLocale}`)
      ? pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`)
      : `/${newLocale}${pathname}`;

    localStorage.setItem("user-locale", newLocale);
    setCurrentLocale(newLocale);
    router.push(newPath);
  };

  const languageOptions = [
    { value: "en", label: "En" },
    { value: "am", label: "Am" },
    { value: "ar", label: "Ar" },
    { value: "ru", label: "Ru" },
    { value: "de", label: "De" },
  ];

  // **🌟 Updated Mobile-First Styling**
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "rgba(0, 0, 0, 0.6)",
      border: "1px solid gold",
      borderRadius: "1rem",
      padding: "0.5rem",
      fontSize: "0.8rem",
      color: "#FFD700", // Gold text
      boxShadow: state.isFocused
        ? "0px 0px 15px rgba(255, 215, 0, 0.6)" // Gold glow when focused
        : "none",
    }),

    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.8rem",
      color: "#FFD700", // Gold text
      fontWeight: "bold",
    }),

    menu: (provided) => ({
      ...provided,
      display: "flex",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.9)",
      border: "1px solid gold",
      borderRadius: "1rem",
      boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.4)", // Soft gold glow
      padding: "0.8px",
      zIndex: 1000,
    }),

    option: (provided, state) => ({
      ...provided,
      padding: "0.8rem",
      fontSize: "0.8rem",
      color: state.isFocused ? "#FFD700" : "#C0C0C0", // Gold on focus, Silver default
      fontWeight: state.isFocused ? "bold" : "normal",
      borderRadius: "10px",
      background: state.isFocused ? "rgba(255, 215, 0, 0.2)" : "transparent",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#C0C0C0", // Silver icon
      transition: "all 0.3s ease-in-out",
      ":hover": {
        color: "#FFD700", // Gold on hover
      },
    }),

    menuList: (provided) => ({
      ...provided,
      padding: "0.5rem",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 215, 0, 0.6)", // Faded gold placeholder
      fontWeight: "bold",
    }),
  };
  if (!isMounted) return null; // ✅ Prevents hydration errors
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Select
          options={languageOptions}
          onChange={changeLanguage}
          value={languageOptions.find(
            (option) => option.value === currentLocale
          )}
          styles={customStyles}
          menuPlacement="auto"
        />
      </div>
    </div>
  );
}
