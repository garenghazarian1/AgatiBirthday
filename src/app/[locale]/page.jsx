"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [guestName, setGuestName] = useState("");

  // ✅ Read name from URL and set it for the RSVP form
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (urlName) {
      setGuestName(decodeURIComponent(urlName)); // Fix encoding issues
    }
  }, [searchParams]);

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
          {guestName && (
            <h2 className={styles.welcomeTitleName}>🎉 {guestName} 🎉</h2>
          )}
          <h2 className={styles.welcomeTitle1}>{t("welcome1")}</h2>
          <h2 className={styles.welcomeTitle2}>{t("welcome2")}</h2>
          <h2 className={styles.welcomeTitle3}>{t("welcome3")}</h2>
          {/* 🏆 Display Guest's Name if Available */}

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

// Personalized Invitation Links (/invite?name=John)
// 3️⃣ 📅 Google Calendar Integration
