"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { useMessages } from "../lib/i18n";

export default function HomePage() {
  // Set English (`en`) as the default locale
  const defaultLocale = "en";
  const [messages, setMessages] = useState(useMessages(defaultLocale));

  useEffect(() => {
    setMessages(useMessages(defaultLocale)); // Load default locale messages
  }, []);

  const t = (key) => messages[key] || key; // Fallback for missing translations

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{t("welcome")}</h1>
      <p>{t("invite")}</p>
      <LanguageSwitcher />
    </div>
  );
}
