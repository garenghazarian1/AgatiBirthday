"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import styles from "./Invitation.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Invitation() {
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
      <div className={styles.celebrationBackground}>
        <LanguageSwitcher />

        <div className={`${styles.card} ${styles.shimmerBorder}`}>
          <Image
            src="/001.png"
            alt="kross"
            width={500}
            height={500}
            className={styles.invitationImage}
            priority
          />
          <div className={styles.decorativeContainer}>
            <div className={styles.decorativeShape}>
              <Image
                src="/ani.jpg"
                alt="Ani"
                width={500}
                height={500}
                className={styles.person}
                priority
              />
            </div>

            <div className={styles.decorativeShape}>
              <Image
                src="/agati.jpg"
                alt="Agati"
                width={500}
                height={500}
                className={styles.person}
                priority
              />
            </div>
          </div>

          <h1 className={styles.title}>{t("invitationTitle")}</h1>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{t("invitationSubtitle")}</p>
            <p className={styles.details}>{t("invitationMessage")}</p>

            <p className={styles.details}>{t("invitationDetails")}</p>
            <p className={styles.details}>{t("invitationLocation")}</p>

            {/* Google Maps Link */}
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
      </div>
    </>
  );
}
