"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p className={styles.loading}>Loading invitation...</p>;
  }

  const handleRSVP = () => {
    alert(t("rsvpMessage"));
  };

  return (
    <div className={`${styles.card} ${styles.shimmerBorder}`}>
      <h1 className={styles.title}>{t("invitationTitle")}</h1>
      <p className={styles.subtitle}>{t("invitationSubtitle")}</p>
      <p className={styles.details}>{t("invitationDetails")}</p>

      {/* Google Maps Link */}
      <Link
        href="https://www.google.com/maps?q=576R+PGF,+Vagharshapat,+Armenia"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.googleMapsLink}
        aria-label="View location on Google Maps"
      >
        📍 {t("googleMapsLink")}
      </Link>

      {/* Embedded Google Map */}
      <div className={styles.mapContainer}>
        <iframe
          title="Etchmiadzin Cathedral Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.2186482758763!2d44.291!3d40.161861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcfce370c197%3A0x69f406c27837b640!2sEchmiadzin%20Cathedral!5e0!3m2!1sen!2sam!4v1712000000000"
          width="100%"
          height="300"
          className={styles.mapIframe}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* RSVP Button */}
      <button className={styles.rsvpButton} onClick={handleRSVP}>
        {t("rsvpButton")}
      </button>
    </div>
  );
}
