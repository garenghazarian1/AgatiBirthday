"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./Invite.module.css"; // ✅ Import styles

export default function InvitePage() {
  return (
    <Suspense fallback={<p>Loading invitation...</p>}>
      <InviteContent />
    </Suspense>
  );
}

function InviteContent() {
  const searchParams = useSearchParams();

  // ✅ Decode URL parameters safely
  const name = decodeURIComponent(searchParams.get("name") || "Guest");
  const email = decodeURIComponent(searchParams.get("email") || "N/A");
  const guests = decodeURIComponent(searchParams.get("guests") || "0");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 You're Invited! 🎉</h1>
      <p className={styles.text}>
        Hello, <strong className={styles.name}>{name}</strong>!
      </p>
      <p className={styles.text}>
        We are delighted to invite you to <strong>Ani & Agati's Baptism</strong>
        .
      </p>
      <p className={styles.text}>
        📧 <strong>Email:</strong> {email}
      </p>
      <p className={styles.text}>
        👥 <strong>Number of Guests:</strong> {guests}
      </p>
      <p className={styles.text}>
        📍 <strong>Location:</strong> Etchmiadzin Cathedral, Armenia
      </p>
      <p className={styles.text}>
        📅 <strong>Date:</strong> July 30, 2025
      </p>
    </div>
  );
}
