import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'animate.css'; // Ensure you have animate.css imported

const Homepage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="bg-[#1D4ED8] text-white text-center py-24 px-6"
      >
        {/* Welcome Text */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-0.5s">
          Welcome to CrisisCare
        </h1>
        
        {/* Subtext */}
        <p className="text-md sm:text-lg mb-4 animate__animated animate__fadeIn animate__delay-0.7s">
          "CrisisCare connects people seeking aid with those ready to help in real time."
        </p>
        <p className="text-md sm:text-lg mb-4 animate__animated animate__fadeIn animate__delay-0.9s">
          Bringing Relief to Those in Need
        </p>
        
        {/* Buttons */}
        <div className="space-x-4 animate__animated animate__fadeIn animate__delay-1.1s ">
          <Link
            to="/gethelp"
            className="mx-4 my-4 inline-block px-6 sm:px-8 py-3 bg-[#FBBF24] text-black rounded-full font-semibold hover:bg-[#F59E0B] transition animate__animated animate__fadeIn animate__delay-1.2s"
          >
            Request Aid
          </Link>
          <Link
            to="/donate/"
            className="mx-4 my-4 inline-block px-6 sm:px-8 py-3 bg-[#FBBF24] text-black rounded-full font-semibold hover:bg-[#F59E0B] transition animate__animated animate__fadeIn animate__delay-1.4s"
          >
            Donate Resource
          </Link>
          <Link
            to="/requestresource"
            className="mx-4 my-4 inline-block px-6 sm:px-8 py-3 bg-[#FBBF24] text-black rounded-full font-semibold hover:bg-[#F59E0B] transition animate__animated animate__fadeIn animate__delay-1.6s"
          >
            View Request & Resource
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center animate__animated animate__fadeIn animate__delay-1.8s">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-[#DBEAFE] p-8 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-0s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-Time Alerts</h3>
              <p className="text-gray-600">
                Stay updated with real-time disaster alerts for your area to take necessary actions quickly.
              </p>
            </div>
            <div className="bg-[#D1FAE5] p-8 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-2.2s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Resource Mapping</h3>
              <p className="text-gray-600">
                Find essential resources like shelters, hospitals, and emergency supplies through our interactive map.
              </p>
            </div>
            <div className="bg-[#FFEDD5] p-8 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-2.4s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Crowd Sourcing</h3>
              <p className="text-gray-600">
                Report incidents, request help, and offer assistance through a community-driven platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FBBF24] text-center py-16 text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2.6s">
          Join Us in Making a Difference
        </h2>
        <p className="mb-8 text-md sm:text-lg animate__animated animate__fadeIn animate__delay-2.8s">
          We are building a connected community to respond effectively during disasters. Become part of the solution.
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 sm:px-8 py-3 bg-black rounded-full font-semibold hover:bg-gray-800 transition animate__animated animate__fadeIn animate__delay-0s"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default Homepage;
