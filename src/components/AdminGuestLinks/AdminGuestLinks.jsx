"use client";

import { useState } from "react";
import styles from "./AdminGuestLinks.module.css";

export default function AdminGuestLinks() {
  const [guests, setGuests] = useState([""]); // ✅ Start with one empty input
  const [generatedLinks, setGeneratedLinks] = useState([]);

  const handleAddGuest = () => {
    setGuests([...guests, ""]); // ✅ Add a new empty input field
  };

  const handleRemoveGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);
    setGuests(updatedGuests);
  };

  const handleInputChange = (index, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = value;
    setGuests(updatedGuests);
  };

  const generateLinks = () => {
    const baseUrl = window.location.origin;
    const links = guests
      .filter((name) => name.trim() !== "")
      .map((name) => `${baseUrl}/am?name=${encodeURIComponent(name)}`);

    setGeneratedLinks(links);
  };

  return (
    <div className={styles.container}>
      <h2>🎟 Generate Personalized Invitations</h2>
      <p>Enter guest names and generate unique invitation links.</p>

      <div className={styles.guestList}>
        {guests.map((guest, index) => (
          <div key={index} className={styles.guestItem}>
            <input
              type="text"
              value={guest}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter guest name"
              className={styles.input}
            />
            <button
              onClick={() => handleRemoveGuest(index)}
              className={styles.removeButton}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleAddGuest} className={styles.addButton}>
        ➕ Add Guest
      </button>
      <button onClick={generateLinks} className={styles.generateButton}>
        🔗 Generate Links
      </button>

      {generatedLinks.length > 0 && (
        <div className={styles.linksContainer}>
          <h3>📢 Share These Links</h3>
          {generatedLinks.map((link, index) => (
            <div key={index} className={styles.linkItem}>
              <input
                type="text"
                value={link}
                readOnly
                className={styles.linkInput}
              />
              <button
                onClick={() => navigator.clipboard.writeText(link)}
                className={styles.copyButton}
              >
                📋 Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
