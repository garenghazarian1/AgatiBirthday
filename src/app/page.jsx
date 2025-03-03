"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
// import QRCodeGenerator from "@/components/QRCodeGenerator/QRCodeGenerator";
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
    <div>
      <LanguageSwitcher />
      <Invitation />
      <CountdownTimer />
      <RSVPForm />
      {/* <QRCodeGenerator /> */}
    </div>
  );
}
