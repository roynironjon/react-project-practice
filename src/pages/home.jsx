import React, { 
  useEffect, 
  useRef, 
  useState  // This was missing in your original code
} from "react";
import "../styles/home.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";


const Home = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);
  const [profession, setProfession] = useState("");
  const professions = ["Web Designer", "Developer", "Content Creator"];

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
    animateOnScroll();

    // Fireworks animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const gravity = 0.05;
    const minHeight = canvas.height * 0.2;

    class Firework {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedY = Math.random() * -4 - 3;
        this.exploded = false;
        this.particles = [];
      }

      update() {
        if (!this.exploded) {
          this.y += this.speedY;
          this.speedY += gravity;

          if (this.speedY >= 0 || this.y <= minHeight) {
            this.explode();
          }
        } else {
          this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.alpha <= 0) {
              this.particles.splice(index, 1);
            }
          });
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
        } else {
          this.particles.forEach((particle) => particle.draw());
        }
      }

      explode() {
        this.exploded = true;
        const colors = ["#ff4747", "#ffdd57", "#47ff47", "#4747ff", "#ff47ff"];
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 2;
          const dx = Math.cos(angle) * speed;
          const dy = Math.sin(angle) * speed;
          const particleColor = colors[Math.floor(Math.random() * colors.length)];
          this.particles.push(new Particle(this.x, this.y, dx, dy, particleColor));
        }
      }
    }

    class Particle {
      constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = Math.random() * 3 + 2;
        this.color = color;
        this.alpha = 1;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += gravity / 2;
        this.alpha -= 0.02;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const colors = ["#ff4747", "#ffdd57", "#47ff47", "#4747ff", "#ff47ff"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworks.push(new Firework(x, y, color));
    }

    function animateFireworks() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded && firework.particles.length === 0) {
          fireworks.splice(index, 1);
        }
      });

      requestAnimationFrame(animateFireworks);
    }

    // Custom cursor animation
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    const animateCursor = () => {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;
      
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      
      requestAnimationFrame(animateCursor);
    };
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // Interactive elements effect
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .category-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
      });
    });

    // Typewriter effect
    let currentProfessionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const typeWriter = () => {
      const currentProfession = professions[currentProfessionIndex];
      
      if (isDeleting) {
        setProfession(currentProfession.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setProfession(currentProfession.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentProfession.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
        typingSpeed = 500;
      }

      const timeoutId = setTimeout(typeWriter, typingSpeed);
      
      return () => clearTimeout(timeoutId);
    };

    typeWriter();

    // Circle animation around image
    const circle = document.querySelector('.hero-image-circle');
    if (circle) {
      let rotation = 0;
      const animateCircle = () => {
        rotation += 0.5;
        circle.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(animateCircle);
      };
      animateCircle();
    }

    const fireworkInterval = setInterval(createFirework, 1000);
    const animationId = requestAnimationFrame(animateFireworks);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(fireworkInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", animateOnScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Custom Cursor Elements */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
      
      {/* Hero Section with Fireworks */}
      <section className="hero-section">
        <canvas 
          ref={canvasRef} 
          className="fireworks-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h6 className="hero-subtitle">Hi, I'm</h6>
              <h1 className="hero-title">Roy-DRN</h1>
              <h2 className="hero-profession">
                Professional <span ref={textRef}>{profession}</span>
                <span className="type-cursor">|</span>
              </h2>
              <p className="hero-description">
                Innovative solutions for your digital transformation. 
                Creating beautiful, functional websites and applications 
                that drive results.
              </p>
              
              <div className="hero-social">
                <a href="#" className="social-icon"><FaGithub /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
              </div>
              
              <button className="hero-btn">
                Get Started
                <span className="btn-hover-effect"></span>
              </button>
            </div>
            
            <div className="hero-image">
              <div className="hero-image-circle"></div>
              <div className="hero-image-inner">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Roy-DRN" 
                  className="profile-image"
                />
              </div>
              <div className="hero-image-dots">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="dot" 
                    style={{
                      transform: `rotate(${i * 30}deg) translateY(-120px)`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
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