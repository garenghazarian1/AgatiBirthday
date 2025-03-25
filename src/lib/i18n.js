import en from "../../locales/en.json";
import am from "../../locales/am.json";
import ar from "../../locales/ar.json";
import ru from "../../locales/ru.json";
import de from "../../locales/de.json";

console.log("✅ i18n.js loaded translations");

// 🌍 Set Armenian as the default locale
export const defaultLocale = "am";

const messages = { am, en, ar, ru, de };

export function useMessages(locale = defaultLocale) {
  return messages[locale] || messages[defaultLocale]; // ✅ Ensure consistent fallback
}
