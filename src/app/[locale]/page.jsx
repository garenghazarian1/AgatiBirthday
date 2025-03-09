"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import FlipClock from "@/components/FlipClock/FlipClock";
import InvitationContent from "@/components/invitationContent/InvitationContent";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const t = useTranslations();
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <LanguageSwitcher />

      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={styles.section}
      >
        <Invitation />
      </section>

      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={styles.section}
      >
        <InvitationContent />
      </section>

      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={styles.section}
      >
        <RSVPForm />
      </section>

      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={styles.section}
      >
        <FlipClock eventDate="2025-07-30T10:00:00" />
      </section>
    </div>
  );
}
