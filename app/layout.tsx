import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/ui/CustomCursor";

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

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "brAInify — Innovative Learning",
  description:
    "brAInify isn't another course platform. It's a complete AI-powered learning ecosystem that guides you from foundation to mastery. Live in 175 countries · 11 languages.",
  keywords: ["AI learning", "online courses", "AI education", "learning ecosystem", "certification", "brAInify"],
  icons: {
    icon: [{ url: "/ios-dark.png", type: "image/png" }],
    apple: [{ url: "/ios-dark.png", type: "image/png" }],
  },
  openGraph: {
    title: "brAInify — Innovative Learning",
    description: "A complete AI-powered learning ecosystem. Project-led, not video-soup.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/ios-dark.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ios-dark.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b1424]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
