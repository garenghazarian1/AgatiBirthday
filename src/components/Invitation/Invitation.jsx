"use client";

import { useTranslations } from "next-intl";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();

  const handleRSVP = () => {
    alert(t("rsvpMessage")); // You can replace this with a real RSVP form
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("invitationTitle")}</h1>
      <p className={styles.subtitle}>{t("invitationSubtitle")}</p>
      <p className={styles.details}>{t("invitationDetails")}</p>
      <button className={styles.rsvpButton} onClick={handleRSVP}>
        {t("rsvpButton")}
      </button>
    </div>
  );
}
