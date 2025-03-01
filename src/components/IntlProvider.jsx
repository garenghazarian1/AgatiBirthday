"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMessages } from "../lib/i18n";

export default function IntlProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const supportedLocales = ["en", "am", "ar", "ru"];
  const defaultLocale = "en";

  // Get language from localStorage or browser
  const detectUserLanguage = () => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("user-locale");
      if (savedLocale && supportedLocales.includes(savedLocale))
        return savedLocale;

      const browserLang = navigator.language.split("-")[0];
      return supportedLocales.includes(browserLang)
        ? browserLang
        : defaultLocale;
    }
    return defaultLocale;
  };

  const [locale, setLocale] = useState(
    pathname.split("/")[1] || detectUserLanguage()
  );
  const [messages, setMessages] = useState(useMessages(locale));

  useEffect(() => {
    setMessages(useMessages(locale)); // Update messages when locale changes
  }, [locale]);

  useEffect(() => {
    const urlLocale = pathname.split("/")[1];
    if (urlLocale && supportedLocales.includes(urlLocale)) {
      setLocale(urlLocale);
      localStorage.setItem("user-locale", urlLocale); // Save selected language
    }
  }, [pathname]);

  console.log("✅ IntlProvider is rendering");
  console.log("🔹 Locale Detected:", locale);
  console.log("🔹 Messages Loaded:", messages);

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      defaultLocale="en"
      timeZone="Europe/Berlin"
    >
      {children}
    </NextIntlClientProvider>
  );
}
