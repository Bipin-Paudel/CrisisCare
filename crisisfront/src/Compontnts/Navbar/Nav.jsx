import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in dynamically
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center" style={{ height: "50px" }}>
        {/* CrisisCare Text */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide ml-4">
          CrisisCare
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop and Mobile Menu */}
        <ul
          className={`md:flex space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-700 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          {[
            { path: "", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/services", label: "Services" },
            { path: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block px-6 py-3 text-lg hover:text-yellow-300 md:hover:text-yellow-500 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Login / Logout Button */}
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block px-6 py-3 text-lg hover:text-red-400 md:hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-6 py-3 text-lg hover:text-yellow-300 md:hover:text-yellow-500 transition-colors"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
