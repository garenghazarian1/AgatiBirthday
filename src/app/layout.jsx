import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IntlProvider from "../components/IntlProvider"; // Import IntlProvider
import BackgroundMusic from "@/components/BackgroundMusic/BackgroundMusic";

console.log("✅ RootLayout is rendering...");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ani and Agati",
  description: "Baptism Invitation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundMusic />
        <IntlProvider>{children}</IntlProvider> {/* Wrap inside IntlProvider */}
      </body>
    </html>
  );
}
