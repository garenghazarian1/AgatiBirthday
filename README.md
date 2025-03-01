This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Next.js Multilingual Invitation App

## 📌 Project Overview

This project is a **multilingual event invitation app** built with **Next.js** and **next-intl**. It allows users to **switch between multiple languages** dynamically and handles **localized routes**.

---

## 🚀 How to Set Up and Run the Project

### **1️⃣ Install Next.js**

Create a new Next.js app:

```bash
npx create-next-app@latest my-invitation-app
cd my-invitation-app
```

### **2️⃣ Install Required Dependencies**

Install `next-intl` for translation handling:

```bash
npm install next-intl
```

---

## 📂 Project Structure

```
/my-invitation-app
│── /locales          # Translation files
│   ├── en.json
│   ├── am.json
│   ├── ar.json
│   ├── ru.json
│── /src
│   ├── /app
│   │   ├── /[locale]   # Dynamic locale-based routing
│   │   │   ├── page.jsx
│   │   ├── layout.jsx
│   ├── /components
│   │   ├── LanguageSwitcher.jsx
│   │   ├── IntlProvider.jsx
│   ├── /lib
│   │   ├── i18n.js
│── package.json
│── next.config.js
│── README.md
```

---

## **🌍 Adding Multilingual Support**

### **3️⃣ Create Translation Files**

Inside the `/locales` folder, create JSON files:

**📂 locales/en.json**

```json
{
  "welcome": "Welcome to our Event",
  "invite": "You're invited!",
  "rsvp": "Please RSVP below."
}
```

**📂 locales/am.json** (Armenian)

```json
{
  "welcome": "Բարի գալուստ մեր միջոցառմանը",
  "invite": "Դուք հրավիրված եք!",
  "rsvp": "Խնդրում ենք պատասխանել ստորև:"
}
```

**📂 locales/ar.json** (Arabic)

```json
{
  "welcome": "مرحبًا بكم في حدثنا",
  "invite": "أنت مدعو!",
  "rsvp": "يرجى الرد أدناه."
}
```

**📂 locales/ru.json** (Russian)

```json
{
  "welcome": "Добро пожаловать на наше мероприятие",
  "invite": "Вы приглашены!",
  "rsvp": "Пожалуйста, подтвердите участие ниже."
}
```

---

## **🔧 Setting Up Translation Handling**

### **4️⃣ Create `i18n.js` to Load Messages**

Inside `/src/lib/i18n.js`, add:

```javascript
import en from "../../locales/en.json";
import am from "../../locales/am.json";
import ar from "../../locales/ar.json";
import ru from "../../locales/ru.json";

console.log("✅ i18n.js loaded translations");

const messages = { en, am, ar, ru };

export function useMessages(locale) {
  console.log("🔹 useMessages called with locale:", locale);
  return messages[locale] || messages["en"];
}
```

---

## **🌐 Creating a Global Translation Provider**

### **5️⃣ Create `IntlProvider.jsx`**

Inside `/src/components/IntlProvider.jsx`, add:

```javascript
"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import { useMessages } from "../lib/i18n";

export default function IntlProvider({ children }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const messages = useMessages(locale);

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
```

---

## **🔗 Setting Up Dynamic Routing**

### **6️⃣ Update `layout.jsx`**

Modify `src/app/layout.jsx`:

```javascript
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IntlProvider from "../components/IntlProvider";

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale || "en"}>
      <body>
        <IntlProvider>{children}</IntlProvider>
      </body>
    </html>
  );
}
```

### **7️⃣ Move `page.jsx` Into a Locale Folder**

Move `src/app/page.jsx` to `src/app/[locale]/page.jsx`:

```javascript
"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default function HomePage({ params }) {
  const locale = params.locale || "en";
  const t = useTranslations();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("invite")}</p>
      <LanguageSwitcher />
    </div>
  );
}
```

---

## **🎨 Adding Language Switcher**

### **8️⃣ Create `LanguageSwitcher.jsx`**

Inside `/src/components/LanguageSwitcher.jsx`, add:

```javascript
"use client";

import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (newLocale) => {
    router.push(`/${newLocale}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>🇬🇧 English</button>
      <button onClick={() => changeLanguage("am")}>🇦🇲 Հայերեն</button>
      <button onClick={() => changeLanguage("ar")}>🇦🇪 العربية</button>
      <button onClick={() => changeLanguage("ru")}>🇷🇺 Русский</button>
    </div>
  );
}
```

---

## **🚀 Running the Project**

```bash
npm run dev
```

Then open:

- `http://localhost:3000/en`
- `http://localhost:3000/ru`
- `http://localhost:3000/am`
- `http://localhost:3000/ar`

Your Next.js multilingual app is now ready! 🎉🚀
