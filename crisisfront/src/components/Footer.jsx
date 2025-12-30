import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">CrisisCare</h2>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} CrisisCare. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
          <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>

        {/* Social */}
        <div className="flex justify-center md:justify-end gap-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebook size={22} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter size={22} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaLinkedin size={22} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
