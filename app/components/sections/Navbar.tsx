"use client";

import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { NAV_LINKS } from "@/app/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-white/[0.06] shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          {/* Watch button — pill with play icon, matches Figma */}
          <a
            href="#intro"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white ml-0.5" aria-hidden>
                <path d="M2 1.5l6 3.5-6 3.5V1.5z" />
              </svg>
            </span>
            Watch
          </a>
          {/* Theme toggle icon */}
          <button
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white/70" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#071022]/95 backdrop-blur-md border-t border-white/[0.06]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-white/70 hover:text-white py-3 border-b border-white/[0.06] font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="outline" size="md" href="#intro">
              Watch intro
            </Button>
            <Button variant="primary" size="md" href="#paths">
              Get started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
