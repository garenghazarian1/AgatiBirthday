"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMessages } from "../lib/i18n";

export default function IntlProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const supportedLocales = ["am", "en", "ar", "ru", "de"];
  const defaultLocale = "en";

  // ✅ Function to detect user language from localStorage or browser settings
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

  // ✅ Extract locale from URL or use detected language
  const urlLocale = pathname.split("/")[1];
  const initialLocale = supportedLocales.includes(urlLocale)
    ? urlLocale
    : detectUserLanguage();

  // ✅ State for current locale & messages
  const [locale, setLocale] = useState(initialLocale);
  const messages = useMessages(locale);

  // ✅ Effect to update locale if URL changes
  useEffect(() => {
    if (supportedLocales.includes(urlLocale)) {
      setLocale(urlLocale);
      localStorage.setItem("user-locale", urlLocale);
    }
  }, [urlLocale]);

  console.log("✅ IntlProvider is rendering");
  console.log("🔹 Locale Detected:", locale);
  console.log("🔹 Messages Loaded:", messages);

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      defaultLocale={defaultLocale}
      timeZone="Europe/Berlin"
    >
      {children}
    </NextIntlClientProvider>
  );
}
