"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import styles from "./InvitationContent.module.css";

export default function InvitationContent() {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p className={styles.loading}>Loading invitation...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <Image
          src="/001.png"
          alt="Cross"
          width={500}
          height={500}
          className={styles.invitationImage}
          priority
        />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{t("invitationTitle")}</h2>
          <p className={styles.subtitle}>{t("invitationSubtitle")}</p>
          <p className={styles.details}>{t("invitationMessage")}</p>
          <p className={styles.details}>{t("invitationDetails")}</p>
          <p className={styles.details}>{t("invitationLocation")}</p>
          <Link
            href="https://www.google.com/maps?q=576R+PGF,+Vagharshapat,+Armenia"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.googleMapsLink}
            aria-label="View location on Google Maps"
          >
            {t("googleMapsLink")}
          </Link>
        </div>
      </div>
    </>
  );
}
