import React from "react";
import "./support.css";
import InfoNav from "@/app/components/ui/InfoNav";

export default function SupportPage() {
  return (
    <div className="info-theme">
      <InfoNav current="support" />
      <main className="container">
        <section className="section">
          <h1>Support</h1>
          <p>
            For account help, technical issues, policy questions, or content access problems, please
            contact Brainify Support.
          </p>
          <p>
            <strong>Support Email:</strong>{" "}
            <a href="mailto:support@brainify-ai.com">support@brainify-ai.com</a>
          </p>
          <p>
            <strong>Response Target:</strong> Within 24-48 hrs
          </p>

          <h3>What to Include in Your Request</h3>
          <ul>
            <li>Your registered email address</li>
            <li>Device type and app version (if applicable)</li>
            <li>Clear description of the issue and screenshots if available</li>
          </ul>

          <h3>Support Categories</h3>
          <ul>
            <li>Login and account recovery</li>
            <li>Activation code validation issues</li>
            <li>Course access and progress issues</li>
            <li>Privacy or data rights requests</li>
            <li>Account deletion requests</li>
          </ul>

          <h3>Company Details</h3>
          <p>brAInify</p>
          <p>
            Registered Address: Office Number (2265) Building No. (574) Road (31) Block (611), (Al
            Hamriya) Area, Kingdom of Bahrain
          </p>
          <p>Company Registration Number: 188307-1</p>
        </section>

        <footer>&copy; 2026 Brainify powered by brAInify</footer>
      </main>
    </div>
  );
}