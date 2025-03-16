"use client";

import { useEffect } from "react";

export default function AutoScroll() {
  useEffect(() => {
    const scrollToSection = (sectionId, delay) => {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, delay);
    };

    scrollToSection("section2", 5000);
    scrollToSection("section3", 13000);
    scrollToSection("rsvpSection", 25000);
  }, []);

  return null;
}
