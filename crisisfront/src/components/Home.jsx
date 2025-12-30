import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        
        {/* subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 text-center py-20 md:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 animate__animated animate__fadeIn">
            Welcome to <span className="text-yellow-400">CrisisCare</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg mb-3 text-white/90 animate__animated animate__fadeIn animate__delay-1s">
            CrisisCare connects people seeking aid with those ready to help in real time.
          </p>

          <p className="max-w-xl mx-auto text-base sm:text-lg mb-10 text-white/80 animate__animated animate__fadeIn animate__delay-1s">
            Bringing relief to those in need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate__animated animate__fadeIn animate__delay-2s">
            <PrimaryButton to="/gethelp">Request Aid</PrimaryButton>
            <PrimaryButton to="/donate">Donate Resource</PrimaryButton>
            <PrimaryButton to="/requestresource">View Requests</PrimaryButton>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 animate__animated animate__fadeIn">
            Key Features
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <FeatureCard
              title="Real-Time Alerts"
              description="Stay updated with real-time disaster alerts for your area."
              bg="bg-blue-50"
            />
            <FeatureCard
              title="Resource Mapping"
              description="Find shelters, hospitals, and emergency supplies easily."
              bg="bg-green-50"
            />
            <FeatureCard
              title="Crowd Sourcing"
              description="Request help, report incidents, and offer assistance."
              bg="bg-orange-50"
            />
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate__animated animate__fadeIn">
            Join Us in Making a Difference
          </h2>

          <p className="max-w-2xl mx-auto mb-10 text-base sm:text-lg text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
            We are building a connected community to respond effectively during disasters.
          </p>

          <Link
            to="/contact"
            className="
              inline-block px-10 py-3
              bg-black text-white rounded-full
              font-semibold
              shadow-lg
              hover:bg-gray-900 hover:scale-[1.05]
              transition-all duration-300
              animate__animated animate__fadeIn animate__delay-2s
            "
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

/* ================= PRIMARY BUTTON ================= */
const PrimaryButton = ({ to, children }) => (
  <Link
    to={to}
    className="
      min-w-[190px] px-6 py-3
      bg-yellow-400 text-black
      rounded-full font-semibold
      shadow-md
      hover:bg-yellow-500 hover:shadow-lg hover:-translate-y-0.5
      transition-all duration-300
    "
  >
    {children}
  </Link>
);

/* ================= FEATURE CARD ================= */
const FeatureCard = ({ title, description, bg }) => (
  <div
    className={`
      ${bg}
      p-8 rounded-2xl
      border border-black/5
      shadow-sm
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300
      h-full flex flex-col
      animate__animated animate__fadeIn
    `}
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">
      {description}
    </p>
  </div>
);

export default Homepage;
