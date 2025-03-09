"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import { useMessages } from "../lib/i18n";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "@/app/[locale]/HomePage.module.css";

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
      <div className={styles.scrollContainer}>
        <LanguageSwitcher />

        <section className={styles.section}>
          <Invitation />
        </section>

        <section className={styles.section}>
          <InvitationContent />
        </section>

        <section className={styles.section}>
          <RSVPForm />
        </section>

        <section className={styles.section}>
          <FlipClock eventDate="2025-07-30T10:00:00" />
        </section>
      </div>
    </>
  );
}
