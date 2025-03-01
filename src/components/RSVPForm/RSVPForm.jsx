"use client";

import { useState, useEffect } from "react";
import styles from "./RSVPForm.module.css";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const savedResponses =
      JSON.parse(localStorage.getItem("rsvpResponses")) || [];
    setResponses(savedResponses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newResponse = { name, email, guests };
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    localStorage.setItem("rsvpResponses", JSON.stringify(updatedResponses));

    setSubmitted(true);
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
          <button type="submit" className={styles.button}>
            Submit RSVP
          </button>
        </form>
      ) : (
        <p className={styles.confirmation}>✅ Thank you for RSVPing!</p>
      )}
    </div>
  );
}
