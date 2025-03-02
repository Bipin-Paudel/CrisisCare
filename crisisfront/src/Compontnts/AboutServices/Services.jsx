import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Emergency Response",
      description: "Get quick access to emergency responders like medical teams, fire brigades, and police, ensuring timely intervention in relief situations.",
      icon: "🚑",
    },
    {
      title: "Crisis Communication",
      description: "Our platform helps individuals and families stay connected and informed during relief efforts, allowing you to send distress signals and share updates in real-time.",
      icon: "📡",
    },
    {
      title: "Resource Mapping",
      description: "We map out essential resources like shelters, food distribution centers, medical supplies, and more, ensuring the efficient distribution of resources during a relief effort.",
      icon: "🗺️",
    },
    {
      title: "Relief Preparedness",
      description: "We provide relief preparedness plans, local alerts, and educational content to help communities stay ready for any kind of emergency situation.",
      icon: "📚",
    },
    {
      title: "Mental Health Support",
      description: "CrisisCare offers mental health support services, including access to counselors and resources to help individuals and families cope with the psychological effects of relief efforts.",
      icon: "🧠",
    },
    {
      title: "Volunteer Coordination",
      description: "Connect with local and global volunteers who can assist during a relief effort, whether in evacuation, rescue, or distribution of resources.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center"
            >
              <div className="text-5xl text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
