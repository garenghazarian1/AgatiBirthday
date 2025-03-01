"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

console.log("✅ HomePage is rendering...");

export default function HomePage() {
  const t = useTranslations();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{t("welcome")}</h1>
      <p>{t("invite")}</p>
      <LanguageSwitcher />
    </div>
  );
}
