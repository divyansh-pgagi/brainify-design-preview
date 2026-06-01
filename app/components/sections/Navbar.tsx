"use client";

import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { NAV_LINKS } from "@/app/lib/constants";

const YT_VIDEO_ID = "0VDBMXkM6r0";

function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 860, aspectRatio: "16/9", boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          aria-label="Close video"
        >
          <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0`}
          title="brAInify Launch"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{ border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
          {/* Watch button */}
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white ml-0.5" aria-hidden>
                <path d="M2 1.5l6 3.5-6 3.5V1.5z" />
              </svg>
            </span>
            Watch
          </button>
          <a
            href="https://app.brainify.world"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium text-white backdrop-blur-sm"
          >
            Login
          </a>
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
            <button
              onClick={() => { setVideoOpen(true); setMobileOpen(false); }}
              className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white text-center transition-colors hover:bg-white/10"
            >
              Watch intro
            </button>
            <a
              href="https://app.brainify.world"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white text-center transition-colors"
            >
              Login
            </a>
          </div>
        </nav>
      </div>
    </header>

    {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </>
  );
}
