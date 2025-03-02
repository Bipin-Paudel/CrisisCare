import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-100">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">CrisisCare: Relief Management Solution</h1>
        <p className="mt-4 text-xl text-gray-600">Empowering communities in times of need</p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">About CrisisCare</h2>
        <p className="text-lg text-gray-700 mb-6">
          CrisisCare is an innovative relief management platform designed to provide real-time support and resources
          to communities during natural and humanitarian crises. Our goal is to reduce the impact of emergencies by connecting
          people with timely information, assistance, and relief services.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to ensure that no one faces a crisis alone. CrisisCare leverages advanced technology to provide
          a seamless and efficient response to emergencies. We aim to bridge the gap between affected individuals and
          humanitarian organizations through our intuitive platform.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Features</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Real-Time Relief Alerts:</strong> Stay informed with up-to-date information about ongoing relief efforts.</li>
          <li><strong>Emergency Resources:</strong> Access critical resources like shelter, food, water, and medical aid.</li>
          <li><strong>Location-Based Assistance:</strong> Find help near you with GPS-enabled mapping and relief data integration.</li>
          <li><strong>Community Support:</strong> Connect with local volunteers and organizations offering assistance.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Why CrisisCare?</h3>
        <p className="text-lg text-gray-700">
          We believe that efficient relief management begins with the people affected. CrisisCare’s user-friendly
          interface and powerful features allow individuals, families, and organizations to quickly find support and
          information when they need it most. Our platform is designed with the needs of relief-affected communities
          at its core, offering real-time updates, resource management, and a network of aid providers.
        </p>
      </section>
    </div>
  );
};

export default About;
