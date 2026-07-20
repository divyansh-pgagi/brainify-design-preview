import React from "react";
import "./terms.css";
import InfoNav from "@/app/components/ui/InfoNav";

export default function TermsAndConditions() {
  return (
    <div className="info-theme">
      <InfoNav current="terms" />
      <main className="container">
        <section className="section">
          <h1>Brainify Terms &amp; Conditions</h1>
          <div className="meta">
            <span><strong>Company Name:</strong> Brainify powered by brAInify</span>
            <span><strong>Effective Date:</strong> March 19, 2026</span>
            <span><strong>Last Updated:</strong> March 19, 2026</span>
            <span><strong>Version:</strong> 1.0</span>
          </div>

          <h3>Introduction</h3>
          <p>
            Welcome to Brainify. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of
            the Brainify platform, including mobile applications, websites, and services.
          </p>
          <p>
            By accessing or using Brainify, you agree to be bound by these Terms. If you do not agree,
            you must not use the platform.
          </p>
          <p>
            Brainify provides AI-powered educational content, tools, and learning systems designed to
            help users build digital skills.
          </p>

          <h3>Eligibility</h3>
          <p>You must be at least 13 years old to use Brainify.</p>
          <p>
            If you are under the age required by your local laws, you may only use the platform with
            parental or guardian consent.
          </p>
          <p>
            Brainify does not knowingly collect data from users below the permitted age. If such data
            is identified, it will be deleted.
          </p>

          <h3>Services Provided</h3>
          <p>Brainify offers:</p>
          <ul>
            <li>Online courses and structured learning paths</li>
            <li>AI-powered tools and assistants</li>
            <li>Educational content and digital resources</li>
            <li>Interactive systems and project-based learning</li>
          </ul>
          <p>We may modify, update, or discontinue any part of the platform at any time without prior notice.</p>

          <h3>User Accounts</h3>
          <p>To access certain features, you may need to create an account.</p>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Be responsible for all activities under your account</li>
          </ul>
          <p>
            Brainify is not responsible for unauthorized access resulting from failure to secure your
            account.
          </p>

          <h3>Access, Activation Codes &amp; Third-Party Distribution</h3>
          <p>Brainify does not sell digital content directly within the app.</p>
          <p>
            Access to Brainify may be provided through authorized partners, resellers, or affiliated
            entities via activation codes.
          </p>
          <ul>
            <li>Access codes are distributed externally</li>
            <li>Brainify does not manage third-party billing or transactions</li>
            <li>Any payment-related disputes must be handled with the original provider</li>
          </ul>
          <p>We reserve the right to:</p>
          <ul>
            <li>Validate activation codes</li>
            <li>Suspend or revoke access for misuse, duplication, or fraud</li>
          </ul>

          <h3>Intellectual Property</h3>
          <p>
            All Brainify content, including courses, videos, systems, designs, branding, and
            AI-generated structured content, is owned by Brainify or its licensors.
          </p>
          <p>You may not copy, distribute, reproduce, or resell any content without prior written permission.</p>

          <h3>Acceptable Use</h3>
          <p>You agree NOT to:</p>
          <ul>
            <li>Use the platform for illegal or harmful activities</li>
            <li>Attempt to hack, disrupt, or reverse-engineer systems</li>
            <li>Misuse AI tools or generate harmful content</li>
            <li>Share abusive, misleading, or harmful content</li>
          </ul>
          <p>Violation may result in suspension or termination.</p>

          <h3>AI &amp; Educational Disclaimer</h3>
          <p>Brainify provides educational tools and AI-assisted systems.</p>
          <p>We do not guarantee income generation, business success, or financial outcomes.</p>
          <p>AI-generated outputs:</p>
          <ul>
            <li>May be incomplete or inaccurate</li>
            <li>Are for informational purposes only</li>
            <li>Should not be considered professional, legal, or financial advice</li>
          </ul>
          <p>Users are responsible for verifying and applying information appropriately.</p>

          <h3>Third-Party Services &amp; Integrations</h3>
          <p>Brainify may use or integrate with third-party services such as:</p>
          <ul>
            <li>AI providers (e.g., OpenAI)</li>
            <li>Cloud/hosting providers</li>
            <li>Analytics services</li>
            <li>Communication and automation tools</li>
          </ul>
          <p>
            Brainify is not responsible for third-party service availability or external policies or
            practices.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, Brainify shall not be liable for indirect or
            consequential damages, loss of data or profits, and business interruptions.
          </p>
          <p>Use of the platform is at your own risk.</p>

          <h3>Termination</h3>
          <p>
            We may suspend or terminate access for violations of these Terms, misuse of the platform,
            or security or legal reasons.
          </p>

          <h3>Account Deletion</h3>
          <p>Users can delete their account directly within app settings or request deletion via email.</p>
          <p>
            Upon deletion, access will be revoked and associated personal data will be removed within a
            reasonable timeframe unless required for legal or security purposes.
          </p>

          <h3>Changes to Terms</h3>
          <p>We may update these Terms at any time. Continued use constitutes acceptance of updated Terms.</p>

          <h3>Governing Law &amp; Jurisdiction</h3>
          <p>These Terms are governed by the laws of the Kingdom of Bahrain.</p>
          <p>Any disputes shall be subject to the courts of Bahrain.</p>

          <h3>Contact Information</h3>
          <p>Company: brAInify</p>
          <p>Email: <a href="mailto:support@brainify-ai.com">support@brainify-ai.com</a></p>
          <p>Registered Address: [Add Registered Address Here]</p>
          <p>Company Registration Number: [Add Company Registration Number Here]</p>
        </section>

        <footer>&copy; 2026 Brainify</footer>
      </main>
    </div>
  );
}