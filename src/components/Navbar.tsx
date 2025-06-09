import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 bg-nude-50 border-b border-nude-200 sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif font-medium">
          SOAR
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex space-x-8">
            <li>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/academy" className="nav-link">
                Academy
              </Link>
            </li>
          </ul>
        </div>

        {/* Empty div for centering */}
        <div className="hidden md:block w-20"></div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-nude-50 py-4 animate-fade-in">
          <div className="container-custom">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/about"
                  className="nav-link block py-2"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className="nav-link block py-2"
                  onClick={toggleMenu}
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="nav-link block py-2"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/academy"
                  className="nav-link block py-2"
                  onClick={toggleMenu}
                >
                  Academy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
