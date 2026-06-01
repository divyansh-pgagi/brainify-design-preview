import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "brAInify — The way you learn is about to change",
  description:
    "brAInify isn't another course platform. It's a complete AI-powered learning ecosystem that guides you from foundation to mastery. Live in 175 countries · 11 languages.",
  keywords: ["AI learning", "online courses", "AI education", "learning ecosystem", "certification", "brAInify"],
  openGraph: {
    title: "brAInify — The way you learn is about to change",
    description: "A complete AI-powered learning ecosystem. Project-led, not video-soup.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0b1424]">{children}</body>
    </html>
  );
}
