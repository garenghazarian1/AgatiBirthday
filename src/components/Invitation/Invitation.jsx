"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const images = [
    "/photos/a1.jpg",
    "/photos/a2.jpg",
    "/photos/a3.jpg",
    // "/photos/a4.jpg",
    "/photos/a5.jpg",
    "/photos/a6.jpg",
    // "/photos/a7.jpg",
    "/photos/a8.jpg",
    // "/photos/a9.jpg",
    "/photos/a10.jpg",
    "/photos/a11.jpg",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      setIsAnimating(false);
      document.body.style.overflow = "auto";
    }, 2000);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
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
      {isAnimating && <div className={styles.loadingOverlay}></div>}

      <div className={styles.celebrationBackground}>
        <div className={`${styles.card} ${styles.cardAnimate}`}>
          <Image
            src="/001.png"
            alt="Cross"
            width={500}
            height={500}
            className={`${styles.invitationImage} ${styles.imageAnimate}`}
            loading="lazy"
          />

          <h2 className={`${styles.title} ${styles.titleAnimateLeft}`}>
            {title}
          </h2>

          <div className={`${styles.decorativeContainer} ${styles.fadeIn}`}>
            <div className={styles.decorativeShape}>
              <Image
                src={images[currentImageIndex]}
                alt={`Ani or Agati ${currentImageIndex + 1}`}
                width={500}
                height={500}
                className={`${styles.person} ${
                  fade ? styles.fadeOut : styles.fadeIn
                }`}
                loading="lazy"
              />
            </div>
          </div>

          <h3 className={`${styles.title} ${styles.titleAnimateRight}`}>
            {subtitle}
          </h3>
        </div>
      </div>
    </>
  );
}
