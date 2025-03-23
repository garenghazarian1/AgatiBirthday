"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useTranslations } from "next-intl";
import styles from "./RSVPForm.module.css";
import RSVPInvitationPDF from "@/components/InvitationPDF";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";

function RSVPFormContent() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (urlName) {
      setName(decodeURIComponent(urlName));
    }
  }, [searchParams]);

  const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rsvp`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!API_URL || API_URL.includes("undefined")) {
      setError("Server error: API URL is not configured.");
      setLoading(false);
      return;
    }

    const trimmedName = name.trim();
    const guestsNumber = parseInt(guests, 10);

    if (!trimmedName) {
      setError("❌ Name is required.");
      setLoading(false);
      return;
    }

    if (
      isNaN(guestsNumber) ||
      guestsNumber < 1 ||
      !Number.isInteger(guestsNumber)
    ) {
      setError("❌ Guests must be a whole number greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          guests: guestsNumber,
          comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`❌ Error: ${errorData.error || response.statusText}`);
      }

      triggerConfetti();

      setTimeout(() => {
        setSubmitted(true);
      }, 1500);
    } catch (error) {
      setError(error.message || t("errorMessages"));
    }

    setLoading(false);
  };

  const generateGoogleCalendarLink = () => {
    const eventTitle = encodeURIComponent("Ani & Agati's Baptism");
    const eventDetails = encodeURIComponent(
      "Join us to celebrate the baptism of Ani & Agati! 🎉"
    );
    const location = encodeURIComponent("Etchmiadzin Cathedral, Armenia");
    const startDateTime = "20250730T100000Z";
    const endDateTime = "20250730T140000Z";
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&location=${location}&dates=${startDateTime}/${endDateTime}`;
  };

  return (
    <div
      ref={sectionRef}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>{t("rsvpTitle")}</h2>

      {!submitted ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`${styles.form} ${
            isKeyboardOpen ? styles.keyboardOpen : ""
          }`}
        >
          {/* <label className={styles.label}>
            {t("rsvpForm.nameLabel")} <span className={styles.required}>*</span>
          </label> */}
          <input
            type="text"
            placeholder={t("rsvpForm.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />

          {/* <label className={styles.label}>
            {t("rsvpForm.guestsLabel")}{" "}
            <span className={styles.required}>*</span>
          </label> */}
          <input
            ref={inputRef}
            type="number"
            placeholder={t("rsvpForm.guestsPlaceholder")}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles.input}
            required
            inputMode="numeric"
            onFocus={() =>
              formRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />

          {/* <label className={styles.label}>{t("rsvpForm.commentLabel")}</label> */}
          <textarea
            placeholder={t("rsvpForm.commentPlaceholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
          ></textarea>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? t("rsvpForm.submitting") : t("rsvpForm.submitButton")}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      ) : (
        <div className={styles.confirmationContainer}>
          <p className={styles.confirmation}>✅ {t("rsvpMessage")}</p>
          <RSVPInvitationPDF name={name} guests={guests} comment={comment} />

          <a
            href={generateGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.calendarButton}
          >
            📅 Add to Google Calendar
          </a>
        </div>
      )}
      <PhotoCarousel />
    </div>
  );
}

export default function RSVPForm() {
  return (
    <Suspense
      fallback={
        <div className={styles.downloadContainer}>Loading RSVP Form...</div>
      }
    >
      <RSVPFormContent />
    </Suspense>
  );
}
