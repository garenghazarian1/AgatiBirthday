"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PhotoCarousel.module.css";

export default function PhotoCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const images = [
    "/photos/a1.jpg",
    "/photos/a2.jpg",
    "/photos/a3.jpg",
    "/photos/a5.jpg",
    "/photos/a6.jpg",
    "/photos/a8.jpg",
    "/photos/a10.jpg",
    "/photos/a11.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`${styles.card} ${styles.cardAnimate}`}>
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
    </div>
  );
}
