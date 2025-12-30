import React from "react";

const TermsAndServices = () => {
  return (
    <div className="bg-slate-50">

      {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Terms & Services
          </h1>
          <p className="mt-1 text-sm text-white/80">
            Last updated: March 01, 2025
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <article className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 sm:px-10 py-8 sm:py-10 space-y-7">

            {/* Intro */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
              Welcome to CrisisCare. These Terms and Services govern your access
              to and use of our website, platform, and services. By accessing or
              using CrisisCare, you agree to be legally bound by these terms.
            </p>

            <Section
              title="1. Acceptance of Terms"
              text="By accessing and using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you must discontinue use of the platform."
            />

            <Section
              title="2. Use of Services"
              text="CrisisCare must be used only for lawful purposes. Any misuse, fraudulent activity, or violation of applicable laws or regulations is strictly prohibited."
            />

            <Section
              title="3. User Accounts"
              text="You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Information provided must be accurate and complete."
            />

            <Section
              title="4. Donations and Assistance"
              text="CrisisCare acts as a facilitator between donors and recipients. We do not guarantee the accuracy, availability, or outcome of any donation or assistance."
            />

            <Section
              title="5. Content and Intellectual Property"
              text="All content on CrisisCare, including text, graphics, logos, and software, is owned by CrisisCare or its licensors and protected by applicable intellectual property laws."
            />

            <Section
              title="6. Termination"
              text="We reserve the right to suspend or terminate access to our services if these Terms are violated or misuse of the platform is detected."
            />

            <Section
              title="7. Limitation of Liability"
              text="CrisisCare shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform."
            />

            <Section
              title="8. Changes to These Terms"
              text="We may update these Terms periodically. Continued use of the platform after changes take effect constitutes acceptance of the revised Terms."
            />

            <Section
              title="9. Contact Information"
              text="If you have any questions regarding these Terms and Services, please contact us at support@crisiscare.com."
            />

          </article>
        </div>
      </section>
    </div>
  );
};

/* ================= SECTION ================= */

const Section = ({ title, text }) => (
  <div className="space-y-2 max-w-4xl">
    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
      {title}
    </h2>
    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
      {text}
    </p>
  </div>
);

export default TermsAndServices;
