"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Ensure this is correctly imported
import styles from "./QRCodeGenerator.module.css";

export default function QRCodeGenerator({ name, email, guests }) {
  console.log("🔍 Props Received in QRCodeGenerator:", { name, email, guests });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // ✅ Uses env for production/local switch
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (name && email && guests) {
      const encodedName = encodeURIComponent(name);
      const encodedEmail = encodeURIComponent(email);
      const invitationUrl = `${baseUrl}/invite?name=${encodedName}&email=${encodedEmail}&guests=${guests}`;
      console.log("✅ Generated QR Code URL:", invitationUrl); // ✅ Debugging output
      setQrValue(invitationUrl);
    } else {
      console.log("❌ Missing props: name, email, or guests");
    }
  }, [name, email, guests]);

  return (
    <div className={styles.qrContainer}>
      <h2 className={styles.title}>📲 Your Personalized Invitation</h2>
      {qrValue ? (
        <>
          <QRCodeCanvas value={qrValue} size={200} />
          <p className={styles.description}>
            Scan the QR code to view your invitation.
          </p>
        </>
      ) : (
        <p className={styles.loading}>Generating QR Code...</p>
      )}
    </div>
  );
}
