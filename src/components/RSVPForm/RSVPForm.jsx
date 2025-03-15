"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./RSVPForm.module.css";
import RSVPInvitationPDF from "@/components/InvitationPDF"; // ✅ Import the PDF component

export default function RSVPForm() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rsvp`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // ✅ Stop observing once visible
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!API_URL || API_URL.includes("undefined")) {
      console.error("❌ API_URL is not set correctly:", API_URL);
      setError("Server error: API URL is not configured.");
      setLoading(false); // ✅ Prevent loading from getting stuck
      return;
    }

    // Trim name input and validate guests
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
        }), // ✅ Send trimmed name
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`❌ Error: ${errorData.error || response.statusText}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("❌ API Call Error:", error);
      setError(error.message || t("errorMessages"));
    }

    setLoading(false);
  };

  return (
    <div
      ref={sectionRef}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>{t("rsvpTitle")}</h2>
      <p className={styles.requiredNotice}>* {t("requiredFieldsNotice")}</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field (Required) */}
          <label className={styles.label}>
            {t("rsvpForm.nameLabel")} <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            placeholder={t("rsvpForm.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />

          {/* Guests Number Field (Required) */}
          <label className={styles.label}>
            {t("rsvpForm.guestsLabel")}{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            placeholder={t("rsvpForm.guestsPlaceholder")}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles.input}
            required
          />

          {/* Comment Field (Optional) */}
          <label className={styles.label}>{t("rsvpForm.commentLabel")}</label>
          <textarea
            placeholder={t("rsvpForm.commentPlaceholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
          ></textarea>

          {/* Submit Button */}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? t("rsvpForm.submitting") : t("rsvpForm.submitButton")}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      ) : (
        <div className={styles.confirmationContainer}>
          <p className={styles.confirmation}>✅ {t("rsvpMessage")}</p>
          <RSVPInvitationPDF name={name} guests={guests} comment={comment} />
        </div>
      )}
    </div>
  );
}
