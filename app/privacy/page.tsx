"use client";

import React, { useEffect, useState } from "react";
import "./privacy.css";
import InfoNav from "@/app/components/ui/InfoNav";

export default function PrivacyPolicy() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // This replaces your <script> tag logic
  useEffect(() => {
    const handleScroll = () => {
      const d = document.documentElement;
      const height = d.scrollHeight - d.clientHeight;
      const progress = height > 0 ? (d.scrollTop / height) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Call once on mount to set initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="info-theme">
      <InfoNav current="privacy" />
      {/* The scroll progress bar controlled by React state */}
      <div
        className="read-progress"
        id="readProgress"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <main className="container">
        <div className="policy-hero">
          <span className="policy-eyebrow">Legal Document</span>
          <h1>Privacy Policy</h1>
          <div className="meta">
            <span><strong>Company:</strong> Brainify powered by brAInify</span>
            <span><strong>Effective Date:</strong> March 19, 2026</span>
            <span><strong>Last Updated:</strong> March 19, 2026</span>
            <span><strong>Version:</strong> 1.0</span>
          </div>
        </div>

        <div className="policy-grid">
          <div className="policy-card">
            <div className="policy-num">01</div>
            <div className="policy-content">
              <h3>1. Scope</h3>
              <p>
                This Privacy Policy explains how Brainify collects, uses, and protects personal information
                when users access our mobile applications, websites, and learning services.
                Brainify&apos;s AI experiences are informational only—we do not provide medical, legal, or other
                professional advice, and we do not claim perfect accuracy.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">02</div>
            <div className="policy-content">
              <h3>2. Information We Collect</h3>
              <ul>
                <li>Account details such as name, email address, and authentication metadata</li>
                <li>Learning usage data, course progress, and feature interactions</li>
                <li>Technical data including device information, logs, and approximate location by IP</li>
                <li>Support communications submitted by users</li>
                <li>User-generated content such as chat interactions and session history</li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">03</div>
            <div className="policy-content">
              <h3>3. How We Use Data</h3>
              <ul>
                <li>To provide access to courses and AI-powered educational tools</li>
                <li>To maintain account security and prevent misuse</li>
                <li>To improve content quality, app performance, and user experience</li>
                <li>To respond to support, legal, and compliance requests</li>
                <li>To maintain chat session continuity and improve AI responses</li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">04</div>
            <div className="policy-content">
              <h3>4. Legal Basis &amp; Consent</h3>
              <p>
                We process data based on user consent, contract performance, legal obligations, and
                legitimate interests where applicable under local law.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">05</div>
            <div className="policy-content">
              <h3>5. Third-Party Services</h3>
              <p>Brainify may use third-party providers for infrastructure and platform operations, including:</p>
              <ul>
                <li>AI service providers (e.g., Gemini and Synthesia for chatbot interactions and AI-generated content such as videos)</li>
                <li>Cloud and hosting providers</li>
                <li>Analytics and monitoring services</li>
                <li>Communication and automation tools</li>
              </ul>
              <p>
                These providers process data under their own terms and privacy practices. Brainify selects
                providers based on reliability and security standards.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">06</div>
            <div className="policy-content">
              <h3>6. Data Sharing</h3>
              <p>
                We do not sell personal data. Data may be shared only when required for service delivery,
                legal compliance, security, or approved business operations.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">07</div>
            <div className="policy-content">
              <h3>7. Data Retention</h3>
              <p>
                Personal data is retained only as long as needed for service operations, legal obligations,
                or fraud prevention, then securely deleted or anonymized. Chat session data is deleted when a
                user deletes their account or after a 180-day retention period, whichever comes first.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">08</div>
            <div className="policy-content">
              <h3>8. Children and Age Restrictions</h3>
              <p>
                Users must be at least 13 years old, or meet higher age limits required by local law.
                Accounts for underage users require parental or guardian consent.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">09</div>
            <div className="policy-content">
              <h3>9. User Rights</h3>
              <p>Users may have rights to access, correct, export, or delete personal data depending on applicable law.</p>
              <p>
                For requests, contact <a href="mailto:support@brainify-ai.com">support@brainify-ai.com</a>.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">10</div>
            <div className="policy-content">
              <h3>10. Security</h3>
              <p>
                Brainify applies technical and organizational safeguards to protect user data, but no system
                can guarantee absolute security.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <div className="policy-num">11</div>
            <div className="policy-content">
              <h3>11. Policy Updates</h3>
              <p>
                This policy may be updated periodically. Continued use of Brainify after updates indicates
                acceptance of the revised policy.
              </p>
            </div>
          </div>

          <div className="policy-card policy-card--contact">
            <div className="policy-num">12</div>
            <div className="policy-content">
              <h3>12. Contact</h3>
              <p>Company: brAInify</p>
              <p>Email: <a href="mailto:support@brainify-ai.com">support@brainify-ai.com</a></p>
              <p>
                Registered Address: Office Number (2265) Building No. (574) Road (31) Block (611), (Al
                Hamriya) Area, Kingdom of Bahrain
              </p>
              <p>Company Registration Number: 188307-1</p>
            </div>
          </div>

        </div>

        <footer>&copy; 2026 Brainify powered by brAInify</footer>
      </main>
    </div>
  );
}