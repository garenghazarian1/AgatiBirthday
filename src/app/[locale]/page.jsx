"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const t = useTranslations(); // ✅ Must be called at the top level

  console.log("✅ HomePage is rendering...");

  return (
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
  );
}
