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

  useEffect(() => {
    document.body.style.overflow = "hidden"; // ✅ Disable scroll during animation

    setTimeout(() => {
      setIsAnimating(false); // ✅ Remove overlay after animation completes
      document.body.style.overflow = "auto"; // ✅ Restore scroll
    }, 2000); // ✅ Matches the animation duration
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
            priority
          />

          {/* Title Sliding from Left */}
          <h2 className={`${styles.title} ${styles.titleAnimateLeft}`}>
            {t("cardTitle")}
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
                priority
              />
            </div>
          </div>

          {/* Subtitle Sliding from Right */}
          <h2 className={`${styles.title} ${styles.titleAnimateRight}`}>
            {t("cardSubtitle")}
          </h2>
        </div>
      </div>
    </>
  );
}
