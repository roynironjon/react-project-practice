import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/global.css";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header
      ref={navbarRef}
      className={`sticky-top ${scrolled ? "header-scrolled" : ""}`}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <span className="logo-text">Roy-DRN</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            onClick={() => toggleDropdown("navbar")}
            aria-expanded={activeDropdown === "navbar"}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Main Navigation */}
          <div
            className={`collapse navbar-collapse ${activeDropdown === "navbar" ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* Mega Menu - Products */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => toggleDropdown("products")}
                  aria-expanded={activeDropdown === "products"}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  Products
                </button>
                <div
                  className={`dropdown-menu mega-menu ${activeDropdown === "products" ? "show" : ""}`}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <h5>Web Solutions</h5>
                      <Link to="/products/web" className="dropdown-item">
                        Web Development
                      </Link>
                      <Link to="/products/ecommerce" className="dropdown-item">
                        E-Commerce
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <h5>Mobile Apps</h5>
                      <Link to="/products/ios" className="dropdown-item">
                        iOS Apps
                      </Link>
                      <Link to="/products/android" className="dropdown-item">
                        Android Apps
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <h5>AI & Cloud</h5>
                      <Link to="/products/ai" className="dropdown-item">
                        AI Solutions
                      </Link>
                      <Link to="/products/cloud" className="dropdown-item">
                        Cloud Services
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Mega Menu - Services */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => toggleDropdown("services")}
                  aria-expanded={activeDropdown === "services"}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  Services
                </button>
                <div
                  className={`dropdown-menu mega-menu ${activeDropdown === "services" ? "show" : ""}`}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Development</h5>
                      <Link to="/services/frontend" className="dropdown-item">
                        Frontend Development
                      </Link>
                      <Link to="/services/backend" className="dropdown-item">
                        Backend Development
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <h5>Design & Marketing</h5>
                      <Link to="/services/ui-ux" className="dropdown-item">
                        UI/UX Design
                      </Link>
                      <Link to="/services/seo" className="dropdown-item">
                        SEO & Digital Marketing
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Search & CTA Button */}
            <div className="d-flex align-items-center">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <button className="btn btn-primary ms-3">Get Started</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;