"use client";

import { useSearchParams } from "next/navigation";
import styles from "./Invite.module.css";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const email = searchParams.get("email") || "No Email";
  const guests = searchParams.get("guests") || "0";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>You're Invited! 🎉</h1>
      <p className={styles.text}>
        Hello, <strong>{name}</strong>!
      </p>
      <p className={styles.text}>
        We are delighted to invite you to Ani & Agati’s Baptism.
      </p>
      <p className={styles.text}>📧 Email: {email}</p>
      <p className={styles.text}>👥 Number of Guests: {guests}</p>
      <p className={styles.text}>📍 Location: Etchmiadzin Cathedral, Armenia</p>
      <p className={styles.text}>📅 Date: July 30, 2025</p>
    </div>
  );
}
