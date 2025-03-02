import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-12">
      <div className="container flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold">CrisisCare</h2>
          <p className="text-sm">&copy; {new Date().getFullYear()} CrisisCare. All rights reserved.</p>
        </div>
        <ul className="  flex space-x-6 mt-4 md:mt-0 ">
          <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* Social Media Links */}
          <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebook size={24} />
          </Link>
          <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter size={24} />
          </Link>
          <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
