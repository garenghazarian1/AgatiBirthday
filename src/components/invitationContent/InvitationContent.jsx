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
        {/* Church Location */}
        <p className={`${styles.details} ${isVisible ? styles.visible : ""}`}>
          {t("invitationLocationChurch")}
        </p>
        <Link
          href="https://www.google.com/maps?q=576R+PGF,+Vagharshapat,+Armenia"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.googleMapsLink} ${
            isVisible ? styles.visible : ""
          }`}
          aria-label="View church location on Google Maps"
        >
          {t("googleMapsLinkChurch")}
        </Link>

        {/* Hall Location */}
        <p className={`${styles.details} ${isVisible ? styles.visible : ""}`}>
          {t("invitationLocationHall")}
        </p>
        <Link
          href="https://www.google.com/maps/place/Lianna+Garden+Hall/@40.1644476,44.3933191,16.75z/data=!4m7!3m6!1s0x406abf20058b7395:0xc8881d319e6d89ca!4b1!8m2!3d40.1649513!4d44.3920288!16s%2Fg%2F11ktyzthbv"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.googleMapsLink} ${
            isVisible ? styles.visible : ""
          }`}
          aria-label="View hall location on Google Maps"
        >
          {t("googleMapsLinkHall")}
        </Link>
      </div>
    </div>
  );
}
