import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4hzot2r",
        "template_4ymwvqg",
        e.target,
        "MBWuatzScC7_zROCA"
      )
      .then(
        () => {
          setSubmitted(true);
          setError(null);
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setError("Something went wrong. Please try again.");
          setSubmitted(false);
        }
      );
  };

  return (
    <div className="bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            We’d love to hear from you. Reach out with any questions, feedback, or support needs.
          </p>
        </header>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Thank you for reaching out!
              </h3>
              <p className="mt-3 text-gray-600">
                We’ve received your message and will get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="
                    mt-2 w-full px-4 py-3 rounded-lg
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    transition
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    mt-2 w-full px-4 py-3 rounded-lg
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    transition
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="
                    mt-2 w-full px-4 py-3 rounded-lg
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    transition
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full mt-4 py-3
                  bg-yellow-400 text-black
                  rounded-full font-semibold
                  shadow-md
                  hover:bg-yellow-500 hover:shadow-lg hover:-translate-y-0.5
                  transition-all duration-300
                "
              >
                Send Message
              </button>
            </form>
          )}

          {error && (
            <div className="mt-6 text-center text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
