"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./RSVPForm.module.css";
import RSVPInvitationPDF from "@/components/InvitationPDF"; // ✅ Import the PDF component

export default function RSVPForm() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, guests, comment }),
      });

      if (!response.ok) {
        throw new Error(`❌ Error: ${response.statusText}`);
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

          {/* Phone Number Field (Required) */}
          <label className={styles.label}>
            {t("rsvpForm.phoneLabel")}{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            placeholder={t("rsvpForm.phonePlaceholder")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
            required
          />

          {/* Email Field (Optional) */}
          <label className={styles.label}>{t("rsvpForm.emailLabel")}</label>
          <input
            type="email"
            placeholder={t("rsvpForm.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
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
          <RSVPInvitationPDF
            name={name}
            email={email}
            phone={phone}
            guests={guests}
            comment={comment}
          />
        </div>
      )}
    </div>
  );
}
