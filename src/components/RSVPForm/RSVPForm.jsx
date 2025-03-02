"use client";

import { useState } from "react";
import styles from "./RSVPForm.module.css";
import InvitationPDF from "@/components/InvitationPDF";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, guests }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Error submitting RSVP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎉 RSVP to Ani & Agati&apos;s Baptism</h2>

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
        </form>
      ) : (
        <>
          <p className={styles.confirmation}>
            ✅ Thank you for RSVPing, {name}!
          </p>
          <InvitationPDF name={name} email={email} guests={guests} />
        </>
      )}
    </div>
  );
}
