"use client";

import { useState } from "react";
import styles from "./RSVPForm.module.css";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Ensure NEXT_PUBLIC_BASE_URL is used correctly
  const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rsvp`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, guests }),
      });

      if (!response.ok) {
        throw new Error(`❌ Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSubmitted(true);
    } catch (error) {
      console.error("❌ API Call Error:", error);
      setError(error.message || "Failed to submit RSVP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎉 RSVP to Ani & Agati's Baptism</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit RSVP"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      ) : (
        <p className={styles.confirmation}>✅ Thank you for RSVPing!</p>
      )}
    </div>
  );
}
