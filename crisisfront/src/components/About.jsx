import React from "react";

const About = () => {
  return (
    <div className="bg-[#f8fafc]">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            CrisisCare
          </h1>
          <p className="max-w-4xl mx-auto text-base sm:text-lg text-white/90">
            A Relief Management Solution Empowering Communities in Times of Crisis
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-12 sm:py-14">
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            grid grid-cols-1
            gap-8
            lg:grid-cols-2
          "
        >

          {/* About */}
          <Card>
            <h2 className="section-title">About CrisisCare</h2>
            <p className="section-text">
              CrisisCare is an innovative relief management platform designed to
              provide real-time support and resources to communities during
              natural and humanitarian crises. Our goal is to reduce the impact
              of emergencies by connecting people with timely information,
              assistance, and reliable relief services.
            </p>
          </Card>

          {/* Mission */}
          <Card>
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              Our mission is to ensure that no one faces a crisis alone.
              CrisisCare leverages modern technology to deliver a seamless and
              efficient emergency response. We aim to bridge the gap between
              affected individuals and humanitarian organizations through a
              trusted, user-friendly digital platform.
            </p>
          </Card>

          {/* Features (full width on large screens) */}
          <Card className="lg:col-span-2">
            <h2 className="section-title mb-6">Key Features</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <Feature
                title="Real-Time Relief Alerts"
                description="Receive up-to-date information on ongoing relief efforts and emergency situations."
              />
              <Feature
                title="Emergency Resources"
                description="Access essential resources such as shelter, food, water, and medical assistance."
              />
              <Feature
                title="Location-Based Assistance"
                description="Find nearby help using GPS-enabled mapping and real-time relief data."
              />
              <Feature
                title="Community Support"
                description="Connect with volunteers, donors, and organizations offering support."
              />
            </div>
          </Card>

          {/* Why */}
          <Card className="lg:col-span-2">
            <h2 className="section-title">Why CrisisCare?</h2>
            <p className="section-text">
              We believe effective relief management starts with the people
              affected. CrisisCare is designed around real community needs,
              offering real-time updates, structured resource coordination, and
              a strong network of aid providers. Our platform ensures that help
              reaches those who need it — quickly, reliably, and transparently.
            </p>
          </Card>

        </div>
      </section>
    </div>
  );
};

/* ================= REUSABLE CARD ================= */
const Card = ({ children, className = "" }) => (
  <div
    className={`
      bg-white
      rounded-2xl
      border border-black/5
      shadow-md
      px-6 sm:px-8
      py-6 sm:py-7
      ${className}
    `}
  >
    {children}
  </div>
);

/* ================= FEATURE ================= */
const Feature = ({ title, description }) => (
  <div>
    <h3 className="text-base font-semibold text-gray-900 mb-1">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">
      {description}
    </p>
  </div>
);

export default About;
