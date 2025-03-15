"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const t = useTranslations(); // 🌍 Use translations based on language
  const [showWelcome, setShowWelcome] = useState(true);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 8000); // 🛠 Show welcome screen for 8 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const confettiArray = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 3}s`, // 🛠 Slower confetti effect
      delay: `${Math.random() * 1}s`,
    }));
    setConfetti(confettiArray);
  }, []);

  return (
    <div className={styles.container}>
      {showWelcome ? (
        <div className={styles.welcomeScreen}>
          <h1 className={styles.welcomeTitle1}>{t("welcome1")}</h1>
          <h1 className={styles.welcomeTitle2}>{t("welcome2")}</h1>
          <h1 className={styles.welcomeTitle3}>{t("welcome3")}</h1>
          <p className={styles.welcomeText}>{t("welcome4")}</p>

          {confetti.map((piece) => (
            <div
              key={piece.id}
              className={styles.confetti}
              style={{
                left: piece.left,
                animationDuration: piece.animationDuration,
                animationDelay: piece.delay,
              }}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
