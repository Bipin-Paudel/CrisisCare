import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="
      sticky top-0 z-50
      bg-gradient-to-r from-[#0f2a44] to-[#143a5f]
      backdrop-blur
      border-b border-white/10
    ">
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="
            text-xl md:text-2xl font-extrabold tracking-wide
            text-white transition-opacity duration-300
            hover:opacity-90
          "
        >
          Crisis<span className="text-yellow-400">Care</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="
            md:hidden p-2 rounded-lg
            hover:bg-white/10
            transition-colors duration-300
          "
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="
                text-sm font-medium text-white/80
                hover:text-yellow-400
                transition-colors duration-300
              "
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="
                ml-2 px-5 py-2 rounded-full
                bg-yellow-400 text-black
                text-sm font-semibold
                shadow-md
                hover:bg-yellow-500
                hover:scale-[1.04]
                transition-all duration-300
              "
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="
          md:hidden
          bg-gradient-to-b from-[#143a5f] to-[#0f2a44]
          border-t border-white/10
          animate-in slide-in-from-top-2 duration-300
        ">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="
                  text-left px-3 py-2 text-sm
                  text-white/80 hover:text-yellow-400
                  transition-colors duration-300
                "
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="
                  mt-2 px-4 py-2 text-center
                  rounded-full bg-yellow-400 text-black
                  font-semibold
                  hover:bg-yellow-500
                  transition-all duration-300
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

/* ================= DESKTOP NAV LINK ================= */
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="
      relative text-sm font-medium
      text-white/80 hover:text-white
      transition-colors duration-300
      after:absolute after:left-0 after:-bottom-1
      after:h-[2px] after:w-0
      after:bg-yellow-400
      after:transition-all after:duration-300
      hover:after:w-full
    "
  >
    {children}
  </Link>
);

/* ================= MOBILE NAV LINK ================= */
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      px-3 py-2 rounded-md
      text-sm font-medium
      text-white/90
      hover:bg-white/10
      transition-colors duration-300
    "
  >
    {children}
  </Link>
);

export default Navbar;
