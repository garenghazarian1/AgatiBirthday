"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import { useMessages } from "../lib/i18n";

export default function HomePage() {
  const defaultLocale = "am";

  // ✅ Load messages ONCE during the initial render
  const [messages, setMessages] = useState(() => useMessages(defaultLocale));

  useEffect(() => {
    setMessages(useMessages(defaultLocale)); // Ensure it's synced on client
  }, []);

  // ✅ Ensure translations work properly
  const t = (key) => messages[key] || key;

  return (
    <>
      <LanguageSwitcher />
      <Invitation />
      <CountdownTimer />
      <RSVPForm />
    </>
  );
}
