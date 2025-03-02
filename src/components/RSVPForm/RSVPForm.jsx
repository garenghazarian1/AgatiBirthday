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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/rsvp`, // ✅ Uses correct API URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, guests }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);
    } else {
      setError(data.error || "Error submitting RSVP. Please try again.");
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
