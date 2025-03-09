"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentImage, setCurrentImage] = useState("/ani.jpg");
  const [fade, setFade] = useState(false);
  const [title, setTitle] = useState(""); // ✅ Fix hydration mismatch
  const [subtitle, setSubtitle] = useState(""); // ✅ Fix hydration mismatch

  useEffect(() => {
    document.body.style.overflow = "hidden"; // ✅ Disable scrolling

    setTimeout(() => {
      setIsAnimating(false); // ✅ Remove overlay after animation completes
      document.body.style.overflow = "auto"; // ✅ Restore scrolling
    }, 2000); // ✅ Matches animation duration
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

  // ✅ Fix hydration mismatch by setting translations after mount
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
          {/* Image with 3D Effect */}
          <Image
            src="/001.png"
            alt="Cross"
            width={500}
            height={500}
            className={`${styles.invitationImage} ${styles.imageAnimate}`}
            loading="lazy" // ✅ Lazy loading for better performance
          />

          {/* Title Sliding from Left */}
          <h2 className={`${styles.title} ${styles.titleAnimateLeft}`}>
            {title}
          </h2>

          <div className={`${styles.decorativeContainer} ${styles.fadeIn}`}>
            <div className={styles.decorativeShape}>
              <Image
                src={currentImage}
                alt="Ani or Agati"
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
