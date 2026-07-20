import React from "react";
import "./deleteAccount.css";
import InfoNav from "@/app/components/ui/InfoNav";

export default function DeleteAccountPage() {
  return (
    <div className="info-theme">
      <InfoNav current="deleteAccount" />
      <main className="container">
        <section className="section">
          <h1>Account Deletion</h1>
          <p>
            Brainify users can request account deletion and associated personal data removal through the
            app settings or by email.
          </p>

          <h3>Option 1: In-App Deletion</h3>
          <ul>
            <li>Open Brainify app settings</li>
            <li>Select account options</li>
            <li>Choose delete account and confirm</li>
          </ul>

          <h3>Option 2: Email Request</h3>
          <p>
            Send a deletion request to <a href="mailto:support@brainify-ai.com">support@brainify-ai.com</a>
            {" "}from your registered email account.
          </p>

          <h3>What Happens After Deletion</h3>
          <ul>
            <li>Account access will be revoked</li>
            <li>Associated personal data will be deleted within a reasonable timeframe</li>
            <li>We keep email and the mapped invite code just in case someone deleted it by mistake</li>
          </ul>

          <p className="notice">
            If you initiated deletion by mistake, contact support immediately before processing is
            completed.
          </p>
        </section>

        <footer>&copy; 2026 Brainify</footer>
      </main>
    </div>
  );
}
