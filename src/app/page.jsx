"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import { useMessages } from "@/lib/i18n";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "./[locale]/HomePage.module.css";

// ✅ Separate GuestNameFetcher component to prevent hydration mismatch
function GuestNameFetcher({ setGuestName }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (urlName) {
      setGuestName(decodeURIComponent(urlName)); // Fix encoding issues
    }
  }, [searchParams]);

  return null;
}

export default function HomePage({ params }) {
  const locale = params.locale || "am"; // ✅ Get locale from dynamic route
  const messages = useMessages(locale); // ✅ Fetch localized messages
  const [guestName, setGuestName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 8000); // ⏳ Keep the welcome screen for 8 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const confettiArray = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 3}s`,
      delay: `${Math.random() * 1}s`,
    }));
    setConfetti(confettiArray);
  }, []);

  // ✅ Function for translating text
  const t = (key) => messages[key] || key;

  return (
    <div className={styles.container}>
      {/* ✅ Suspense for fetching guest name safely */}
      <Suspense fallback={<div>Loading guest name...</div>}>
        <GuestNameFetcher setGuestName={setGuestName} />
      </Suspense>

      {/* AutoScroll Component */}
      <AutoScroll />

      {showWelcome ? (
        <div className={styles.welcomeScreen}>
          {guestName && (
            <h2 className={styles.welcomeTitleName}>🎉 {guestName} 🎉</h2>
          )}
          <h2 className={styles.welcomeTitle1}>{t("welcome1")}</h2>
          <h2 className={styles.welcomeTitle2}>{t("welcome2")}</h2>
          <h2 className={styles.welcomeTitle3}>{t("welcome3")}</h2>
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
          <section id="section2" className={styles.section}>
            <Invitation />
          </section>
          <section id="section3" className={styles.section}>
            <InvitationContent />
          </section>
          <section id="rsvpSection" className={styles.section}>
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
