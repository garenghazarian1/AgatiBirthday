import en from "../../locales/en.json";
import am from "@/../locales/am.json";
import ar from "@/../locales/ar.json";
import ru from "@/../locales/ru.json";
import de from "@/../locales/de.json";

console.log("✅ i18n.js loaded translations");
const messages = { en, am, ar, ru, de };

export function useMessages(locale) {
  return messages[locale] || messages["en"]; // Fallback to English if locale not found
}
