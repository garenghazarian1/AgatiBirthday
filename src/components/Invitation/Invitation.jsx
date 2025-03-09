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
  const [currentImage, setCurrentImage] = useState("/ani.jpg");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === "/ani.jpg" ? "/agati.jpg" : "/ani.jpg"
        );
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  if (!isMounted) {
    return <p className={styles.loading}>Loading invitation...</p>;
  }

  return (
    <>
      <div className={styles.celebrationBackground}>
        <LanguageSwitcher />

        <div className={`${styles.card} `}>
          <Image
            src="/001.png"
            alt="Cross"
            width={500}
            height={500}
            className={styles.invitationImage}
            priority
          />
          <h2 className={styles.title}>{t("cardTitle")}</h2>
          <div className={styles.decorativeContainer}>
            <div className={styles.decorativeShape}>
              <Image
                src={currentImage}
                alt="Ani or Agati"
                width={500}
                height={500}
                className={`${styles.person} ${
                  fade ? styles.fadeOut : styles.fadeIn
                }`}
                priority
              />
            </div>
          </div>
          <h2 className={styles.title}>{t("cardSubtitle")}</h2>

          {/* <div className={styles.textContainer}>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
