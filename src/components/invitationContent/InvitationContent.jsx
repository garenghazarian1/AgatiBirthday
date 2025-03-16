"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import styles from "./InvitationContent.module.css";

export default function InvitationContent() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [guestName, setGuestName] = useState("");

  // ✅ Read name from URL and set it for the RSVP form
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (urlName) {
      setGuestName(decodeURIComponent(urlName)); // Fix encoding issues
    }
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // ✅ Stops observing after animation starts
        }
      },
      { threshold: 0.3 } // ✅ Triggers when 30% of the section is in view
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <Image
        src="/001.png"
        alt="Cross"
        width={500}
        height={500}
        className={`${styles.invitationImage} ${
          isVisible ? styles.visible : ""
        }`}
        // priority
      />
      <div
        className={`${styles.textContainer} ${isVisible ? styles.visible : ""}`}
      >
        {guestName && (
          <h2 className={styles.welcomeTitleName}>🎉 {guestName} 🎉</h2>
        )}
        <h2 className={`${styles.title} ${isVisible ? styles.visible : ""}`}>
          {t("invitationTitle")}
        </h2>
        <p className={`${styles.subtitle} ${isVisible ? styles.visible : ""}`}>
          {t("invitationSubtitle")}
        </p>
        <p className={`${styles.details} ${isVisible ? styles.visible : ""}`}>
          {t("invitationMessage")}
        </p>
        <p className={`${styles.details} ${isVisible ? styles.visible : ""}`}>
          {t("invitationDetails")}
        </p>
        <p className={`${styles.details} ${isVisible ? styles.visible : ""}`}>
          {t("invitationLocation")}
        </p>
        <Link
          href="https://www.google.com/maps?q=576R+PGF,+Vagharshapat,+Armenia"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.googleMapsLink} ${
            isVisible ? styles.visible : ""
          }`}
          aria-label="View location on Google Maps"
        >
          {t("googleMapsLink")}
        </Link>
      </div>
    </div>
  );
}
