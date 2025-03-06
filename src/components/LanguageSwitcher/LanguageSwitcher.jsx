"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./LanguageSwitcher.module.css";
// import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
// import FlipClock from "@/components/FlipClock/FlipClock";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState("am");
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
    { value: "am", label: "Am" },
    { value: "en", label: "En" },
    { value: "ar", label: "Ar" },
    { value: "ru", label: "Ru" },
    { value: "de", label: "De" },
  ];

  // **🌟 Updated Mobile-First Styling**
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "rgba(0, 0, 0, 0.0)",
      border: "none",
      borderRadius: "none",
      // padding: "0.5rem",
      fontSize: "0.8rem",
      color: "#FFD700", // Gold text

      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove blue border
      borderColor: state.isFocused ? "#FFD700" : "transparent", // Optional: Add gold border when focused
      "&:hover": {
        borderColor: "#FFD700", // Gold border on hover
      },
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
      background: "rgba(255, 255, 255, 0.8)",
      border: "1px solid gold",
      borderRadius: "1rem",
      boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.4)", // Soft gold glow
      width: "100%",
      height: "auto",
      // padding: "0.8px",
      zIndex: 1000,
    }),

    option: (provided, state) => ({
      ...provided,
      // padding: "0.8rem",
      fontSize: "0.8rem",
      color: state.isFocused ? "#FFD700" : "black", // Gold on focus, Silver default
      fontWeight: state.isFocused ? "bold" : "normal",
      borderRadius: "10px",
      // background: state.isFocused ? "rgba(255, 215, 0, 0.2)" : "transparent",
      background: state.isFocused ? "rgba(255, 255, 255, 0.8)" : "transparent",

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
    <>
      <div className={styles.container}>
        {/* <CountdownTimer /> */}

        {/* <FlipClock eventDate="2025-07-30T10:00:00" /> */}

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
    </>
  );
}

// const languageOptions = [
//   { value: "am", label: "Am" },
//   { value: "en", label: "En" },
//   { value: "ar", label: "Ar" },
//   { value: "ru", label: "Ru" },
//   { value: "de", label: "De" },
// ];
