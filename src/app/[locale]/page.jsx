"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import QRCodeGenerator from "@/components/QRCodeGenerator/QRCodeGenerator";

console.log("✅ HomePage is rendering...");

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <Invitation />
      <CountdownTimer />
      <RSVPForm />
      {/* <QRCodeGenerator /> */}
    </div>
  );
}
