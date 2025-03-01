"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import QRCodeGenerator from "@/components/QRCodeGenerator/QRCodeGenerator";

console.log("✅ HomePage is rendering...");

export default function HomePage() {
  const t = useTranslations();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* <h1>{t("welcome")}</h1>
      <p>{t("invite")}</p> */}
      <LanguageSwitcher />
      <Invitation />
      <CountdownTimer />
      <RSVPForm />
      <QRCodeGenerator />
    </div>
  );
}
