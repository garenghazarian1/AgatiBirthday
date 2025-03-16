"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // ✅ Array of 11 images (cycling images)
  const images = Array.from({ length: 11 }, (_, i) => `/photos/a${i + 1}.jpg`);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // ✅ Disable scrolling during animation

    setTimeout(() => {
      setIsAnimating(false);
      document.body.style.overflow = "auto"; // ✅ Restore scrolling
    }, 2000);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    setTitle(t("cardTitle"));
    setSubtitle(t("cardSubtitle"));
  }, [t]);

  return (
    <>
      {/* Overlay to prevent white screen */}
      {isAnimating && <div className={styles.loadingOverlay}></div>}

      <div className={styles.celebrationBackground}>
        <div className={`${styles.card} ${styles.cardAnimate}`}>
          {/* ✅ Static Cross Image */}
          <Image
            src="/001.png"
            alt="Cross"
            width={500}
            height={500}
            className={`${styles.invitationImage} ${styles.imageAnimate}`}
            loading="lazy"
          />

          {/* Title Sliding from Left */}
          <h2 className={`${styles.title} ${styles.titleAnimateLeft}`}>
            {title}
          </h2>

          {/* ✅ Rotating 11 Photos (Ani & Agati) */}
          <div className={`${styles.decorativeContainer} ${styles.fadeIn}`}>
            <div className={styles.decorativeShape}>
              <Image
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                width={500}
                height={500}
                className={`${styles.person} ${
                  fade ? styles.fadeOut : styles.fadeIn
                }`}
                loading="lazy"
              />
            </div>
          </div>

          {/* Subtitle Sliding from Right */}
          <h3 className={`${styles.title} ${styles.titleAnimateRight}`}>
            {subtitle}
          </h3>
        </div>
      </div>
    </>
  );
}
