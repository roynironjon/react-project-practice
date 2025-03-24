import React, { useEffect } from "react";
import "../styles/home.css";

const Home = () => {
  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .category-card, .about-section, .contact-section');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Snowfall Effect */}
      <section className="hero-section">
        <div className="snowfall">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.5
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span>Roy-DRN</span></h1>
          <p className="hero-subtitle">Innovative solutions for your digital transformation</p>
          <button className="hero-btn">
            Get Started
            <span className="btn-hover-effect"></span>
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our <span>Services</span></h2>
          <p className="section-subtitle">We deliver excellence in every project</p>
        </div>
        <div className="services-container">
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3>Web Development</h3>
            <p>Custom websites built with modern technologies for optimal performance.</p>
            <div className="service-hover">
              <button className="service-btn">Learn More</button>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>SEO Optimization</h3>
            <p>Boost your visibility and rankings with our proven SEO strategies.</p>
            <div className="service-hover">
              <button className="service-btn">Learn More</button>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Digital Marketing</h3>
            <p>Comprehensive marketing solutions to grow your business online.</p>
            <div className="service-hover">
              <button className="service-btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Explore <span>Categories</span></h2>
          <p className="section-subtitle">Discover our areas of expertise</p>
        </div>
        <div className="categories-container">
          <div className="category-card" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
            <h3>Technology</h3>
            <p>Cutting-edge tech solutions</p>
          </div>
          <div className="category-card" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
            <h3>Business</h3>
            <p>Growth strategies</p>
          </div>
          <div className="category-card" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
            <h3>Education</h3>
            <p>Learning solutions</p>
          </div>
          <div className="category-card" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
            <h3>Health</h3>
            <p>Wellness technology</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <div className="section-header">
              <h2>About <span>Us</span></h2>
              <p className="section-subtitle">Who we are and what we do</p>
            </div>
            <p>
              Roy-DRN is a team of passionate professionals dedicated to delivering innovative digital solutions. 
              With years of experience in web development, marketing, and technology consulting, we help businesses 
              transform their digital presence and achieve their goals.
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <h4>200+</h4>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h4>50+</h4>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h4>10+</h4>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Our Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-header">
          <h2>Contact <span>Us</span></h2>
          <p className="section-subtitle">Get in touch for a free consultation</p>
        </div>
        <div className="contact-container">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
              <span className="input-border"></span>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
              <span className="input-border"></span>
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" required></textarea>
              <span className="input-border"></span>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
              <span className="btn-hover-effect"></span>
            </button>
          </form>
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>123 Business Ave, Suite 456, New York, NY 10001</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>info@roydrn.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;