"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Invitation from "@/components/Invitation/Invitation";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
// import QRCodeGenerator from "@/components/QRCodeGenerator/QRCodeGenerator";

export default function HomePage() {
  const t = useTranslations(); // ✅ Must be called at the top level

  console.log("✅ HomePage is rendering...");

  return (
    <>
      <LanguageSwitcher />
      <Invitation />
      <CountdownTimer />
      <RSVPForm />
      {/* <QRCodeGenerator /> */}
    </>
  );
}
