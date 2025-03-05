"use client";

import { useState, useEffect } from "react";
import styles from "./FlipClock.module.css";

export default function FlipClock({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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

  // Toggle between normal and fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      onClick={toggleFullscreen}
      className={
        isFullscreen ? styles.flipClockContainerFull : styles.flipClockContainer
      }
    >
      {isFullscreen && (
        <h2 className={styles.headline}>
          ⏳ Baptism Countdown: Ani &amp; Agati
        </h2>
      )}

      <div className={styles.flipUnitsWrapper}>
        {Object.entries(timeLeft).map(([unit, value]) => {
          const displayValue = value < 10 ? `0${value}` : value;
          return (
            <div key={unit} className={styles.flipUnit}>
              <div className={styles.flipCard}>
                <div className={styles.flipFront}>{displayValue}</div>
                <div className={styles.flipBack}>{displayValue}</div>
              </div>
              <span className={styles.label}>{unit.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
