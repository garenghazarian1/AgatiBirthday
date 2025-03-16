"use client";

import { useState, useEffect } from "react";
import styles from "./BackgroundMusic.module.css";

export default function BackgroundMusic() {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = new Audio("/music/gnunk.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.5; // Adjust volume as needed
    setAudio(audioElement);

    // ✅ Load user preference from localStorage
    const savedMuteState = localStorage.getItem("musicMuted");

    // ⏳ Delay autoplay by 2 seconds (only if the user didn't mute before)
    if (savedMuteState !== "true") {
      setTimeout(() => {
        audioElement
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => console.warn("Autoplay blocked by the browser."));
      }, 2000);
    }
  }, []);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => console.warn("Play error:", err));
      }
      setIsPlaying(!isPlaying);
      localStorage.setItem("musicMuted", !isPlaying);
    }
  };

  return (
    <div className={styles.musicContainer}>
      <button
        className={`${styles.musicButton} ${isPlaying ? styles.active : ""}`}
        onClick={toggleAudio}
        aria-label="Toggle background music"
      >
        {isPlaying ? "🔊" : "🔈"}
      </button>
    </div>
  );
}
