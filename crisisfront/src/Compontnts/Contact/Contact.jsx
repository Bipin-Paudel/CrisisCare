import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4hzot2r',
        'template_4ymwvqg',
        e.target,
        'MBWuatzScC7_zROCA'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
          setError(null);
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        },
        (error) => {
          console.log(error.text);
          setError('Something went wrong. Please try again.');
          setSubmitted(false);
        }
      );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-50">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-600">We'd love to hear from you. Reach out with any inquiries!</p>
      </header>

      <section>
        {submitted ? (
          <div className="text-center bg-green-100 text-green-700 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Thank you for reaching out!</h3>
            <p className="mt-4">We have received your message and will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"  // Corrected name attribute here
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </form>
        )}

        {error && (
          <div className="text-center text-red-600 mt-6">
            <p>{error}</p>
          </div>
        )}
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; 2025 CrisisCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
