"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./FlipClock.module.css";

export default function FlipClock({ eventDate }) {
  const t = useTranslations();
  const [timeLeft, setTimeLeft] = useState({});
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(eventDate);
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / (1000 * 60)) % 60),
          s: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { d: 0, h: 0, m: 0, s: 0 };
      }
    };

    // Initialize time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${styles.flipClockContainer} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <h2 className={styles.headline}>{t("flipClockTitle")}</h2>

      <div className={styles.flipUnitsWrapper}>
        {Object.entries(timeLeft).map(([unit, value]) => {
          const displayValue = value < 10 ? `0${value}` : value;
          return (
            <div key={unit} className={styles.flipUnit}>
              <div className={styles.flipCard}>
                <div className={styles.flipFront}>{displayValue}</div>
                <div className={styles.flipBack}>{displayValue}</div>
              </div>
              <span className={styles.label}>{t(unit.toLowerCase())}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
