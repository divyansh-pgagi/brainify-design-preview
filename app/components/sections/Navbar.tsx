"use client";

import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import Magnetic from "../ui/Magnetic";
import { NAV_LINKS, WHATSAPP_CHANNEL_URL } from "@/app/lib/constants";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const VIDEO_URL = "https://share.synthesia.io/embeds/videos/3d140381-ded2-45c3-973f-5a20da398bfb";

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
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(3,8,20,0.88)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col"
        style={{ maxWidth: 900 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 rounded-t-2xl"
          style={{ background: "rgba(7,28,70,0.98)", border: "1.5px solid rgba(74,158,255,0.3)", borderBottom: "none" }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc" }}>
            brAInify App Demo
          </p>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}
            aria-label="Close video"
          >
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Video */}
        <div
          className="relative w-full rounded-b-2xl overflow-hidden"
          style={{ aspectRatio: "16/9", border: "1.5px solid rgba(74,158,255,0.3)", borderTop: "none", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}
        >
          <iframe
            src={VIDEO_URL}
            title="brAInify App Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none", display: "block" }}
          />
        </div>

        <p className="text-center mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(199,210,220,0.3)" }}>
          Press ESC or click outside to close
        </p>
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
          {/* WhatsApp channel */}
          <Magnetic strength={12}>
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our WhatsApp channel"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium text-white backdrop-blur-sm"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          </Magnetic>
          {/* Watch button */}
          <Magnetic strength={12}>
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
          </Magnetic>
          <Magnetic strength={12}>
          <a
            href="https://app.brainify.world"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium text-white backdrop-blur-sm"
          >
            Login
          </a>
          </Magnetic>
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
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white text-center transition-colors hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Channel
            </a>
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
