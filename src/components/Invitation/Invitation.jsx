"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const t = useTranslations();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const shapeRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("/ani.jpg");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // ✅ GSAP Timeline for synchronized animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // ✅ 1. Fade in the entire section
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // ✅ 2. Staggered entry for title, subtitle, and image
    tl.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 },
      "-=0.5" // ✅ Overlaps the previous animation slightly
    );

    // ✅ 3. Decorative shape appears with a bounce effect
    tl.fromTo(
      shapeRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.8" // ✅ Overlaps the previous animation
    );

    // ✅ 4. Image fades in with a soft 3D rotation
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9, rotateY: -10 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.5, ease: "power3.out" },
      "-=1" // ✅ Ensures it appears at the same time as the shape
    );
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === "/ani.jpg" ? "/agati.jpg" : "/ani.jpg"
        );
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div ref={sectionRef} className={styles.celebrationBackground}>
      <div className={styles.card}>
        {/* Image with 3D Effect */}
        <Image
          ref={imageRef}
          src="/001.png"
          alt="Cross"
          width={500}
          height={500}
          className={styles.invitationImage}
          priority
        />

        {/* Title */}
        <h2 ref={titleRef} className={styles.title}>
          {t("cardTitle")}
        </h2>

        {/* Decorative shape + rotating image */}
        <div ref={shapeRef} className={styles.decorativeContainer}>
          <div className={styles.decorativeShape}>
            <Image
              src={currentImage}
              alt="Ani or Agati"
              width={500}
              height={500}
              className={`${styles.person} ${
                fade ? styles.fadeOut : styles.fadeIn
              }`}
              priority
            />
          </div>
        </div>

        {/* Subtitle (Now appearing with the title) */}
        <h2 ref={subtitleRef} className={styles.title}>
          {t("cardSubtitle")}
        </h2>
      </div>
    </div>
  );
}
