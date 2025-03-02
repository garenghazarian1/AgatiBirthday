"use client";

import { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.css";

export default function CountdownTimer() {
  // ✅ Set the baptism date to July 30, 2025, at 10:00 AM
  const eventDate = new Date("2025-07-30T10:00:00");

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let difference = eventDate - now;

      if (difference > 0) {
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30); // Approximate months
        const days = totalDays % 30; // Remaining days after months

        setTimeLeft({
          months,
          days,
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }); // Stop countdown at 0
      }
    };

    updateTimer(); // Run once immediately
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>⏳ Countdown to Baptism:</h2>
      <p className={styles.timer}>
        {timeLeft.months} months {timeLeft.days} days {timeLeft.hours}h{" "}
        {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}
