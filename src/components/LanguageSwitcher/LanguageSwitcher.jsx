"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./LanguageSwitcher.module.css";

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
      background: "black",
      border: "2px solid gold",
      borderRadius: "15px",
      padding: "10px",
      fontSize: "0.8rem",
      color: "#FFD700", // Gold text
      boxShadow: state.isFocused
        ? "0px 0px 15px rgba(255, 215, 0, 0.6)" // Gold glow when focused
        : "none",
      transition: "all 0.3s ease-in-out",
    }),

    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.8rem",
      color: "#FFD700", // Gold text
      fontWeight: "bold",
      textShadow: "0px 0px 6px rgba(255, 215, 0, 0.5)", // Subtle glow
    }),

    menu: (provided) => ({
      ...provided,
      background: "black",
      border: "1px solid gold",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.4)", // Soft gold glow
      padding: "10px",
      zIndex: 1000,
    }),

    option: (provided, state) => ({
      ...provided,
      padding: "12px",
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
      padding: "8px",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 215, 0, 0.6)", // Faded gold placeholder
      fontWeight: "bold",
    }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* <h2 className={styles.remark}>🌎 Choose Your Language</h2> */}
        {/* ✅ New Heading */}
        <Select
          options={languageOptions}
          onChange={changeLanguage}
          value={languageOptions.find(
            (option) => option.value === currentLocale
          )}
          styles={customStyles}
          menuPlacement="auto" // ✅ Prevents dropdown from getting cut off
        ></Select>
      </div>
    </div>
  );
}
