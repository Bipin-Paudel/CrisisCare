import React from "react";

const TermsAndServices = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1><b>Terms and Services</b></h1>
      <p style={{ textAlign: "left" }}>Last Updated: March 01, 2025</p>

      <p style={{ textAlign: "left" }}>
        Welcome to CrisisCare. These Terms and Services outline the rules and
        regulations for the use of our website and services.
      </p>

      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>1. Acceptance of Terms</h2>
        <p style={{ textAlign: "left" }}>
          By accessing and using our services, you agree to comply with these
          terms. If you do not agree, please do not use our website.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>2. Use of Services</h2>
        <p style={{ textAlign: "left" }}>
          You agree to use CrisisCare for lawful purposes only. You must not use
          our platform for any fraudulent or illegal activity.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>3. User Accounts</h2>
        <p style={{ textAlign: "left" }}>
          When you create an account, you must provide accurate and complete
          information. You are responsible for maintaining the confidentiality of
          your account credentials.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>4. Donations and Assistance</h2>
        <p style={{ textAlign: "left" }}>
          CrisisCare facilitates donations and relief efforts. We do not
          guarantee the accuracy of requests or the availability of resources.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>5. Content and Intellectual Property</h2>
        <p style={{ textAlign: "left" }}>
          All content on CrisisCare, including text, graphics, and logos, is the
          property of CrisisCare and may not be copied without permission.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>6. Termination</h2>
        <p style={{ textAlign: "left" }}>
          We reserve the right to terminate accounts or restrict access if a user
          violates our terms.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>7. Limitation of Liability</h2>
        <p style={{ textAlign: "left" }}>
          CrisisCare is not responsible for any loss or damages arising from the
          use of our services.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>8. Changes to These Terms</h2>
        <p style={{ textAlign: "left" }}>
          We may update these Terms from time to time. Continued use of our
          services after updates constitutes acceptance of the new terms.
        </p>

        <h2 style={{ textAlign: "left", fontWeight: "bold" }}>9. Contact Information</h2>
        <p style={{ textAlign: "left" }}>
          If you have any questions about these Terms, please contact us at
          support@crisiscare.com.
        </p>
      </div>
    </div>
  );
};

export default TermsAndServices;
