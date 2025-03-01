"use client";

import { QRCodeCanvas } from "qrcode.react"; // Use named import
import styles from "./QRCodeGenerator.module.css";

export default function QRCodeGenerator() {
  const eventUrl = "https://your-invitation-page.com"; // Replace with actual event link

  return (
    <div className={styles.container}>
      <h2>📱 Scan to View Invitation</h2>
      <QRCodeCanvas value={eventUrl} size={150} />
    </div>
  );
}
