import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartLine, faComments, faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero is-fullheight is-light">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  <span className="icon-text">
                    <span className="icon">
                      <FontAwesomeIcon icon={faLink} />
                    </span>
                    <span className="title is-4 has-text-weight-bold">Stagelink</span>
                  </span>
                </a>
              </div>
              <div className="navbar-menu">
                <div className="navbar-end">
                  <Link to="features" smooth={true} duration={500} className="navbar-item">
                    Features
                  </Link>
                  <Link to="pricing" smooth={true} duration={500} className="navbar-item">
                    Pricing
                  </Link>
                  <Link to="contact" smooth={true} duration={500} className="navbar-item">
                    Contact
                  </Link>
                  <a className="navbar-item button is-primary" href="/signup">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <motion.h1
              className="title is-1 has-text-weight-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Streamline Your Live Performances
            </motion.h1>
            <motion.h2
              className="subtitle is-4 has-text-grey"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Stagelink connects venues and performers, making booking and management effortless.
            </motion.h2>
            <div className="buttons is-centered">
              <a href="/signup" className="button is-primary is-large">
                Get Started
              </a>
              <Link to="features" smooth={true} duration={500} className="button is-light is-large">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <div className="container">
            <div className="tabs is-centered">
              <ul>
                <li>
                  <Link to="features" smooth={true} duration={500}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="pricing" smooth={true} duration={500}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="contact" smooth={true} duration={500}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h2 className="title is-2 has-text-weight-bold" data-aos="fade-up">
                Features
              </h2>
              <p className="subtitle is-5 has-text-grey" data-aos="fade-up" data-aos-delay="200">
                Everything you need to manage live performances seamlessly.
              </p>
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column is-4" data-aos="fade-up" data-aos-delay="300">
              <div className="box">
                <div className="icon is-large has-text-primary">
                  <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
                </div>
                <h3 className="title is-4">Easy Booking</h3>
                <p className="subtitle is-6">
                  Venues can book performers with just a few clicks. Performers can manage their availability effortlessly.
                </p>
              </div>
            </div>
            <div className="column is-4" data-aos="fade-up" data-aos-delay="400">
              <div className="box">
                <div className="icon is-large has-text-primary">
                  <FontAwesomeIcon icon={faChartLine} size="3x" />
                </div>
                <h3 className="title is-4">Analytics</h3>
                <p className="subtitle is-6">
                  Track performance trends, earnings, and booking patterns with detailed analytics.
                </p>
              </div>
            </div>
            <div className="column is-4" data-aos="fade-up" data-aos-delay="500">
              <div className="box">
                <div className="icon is-large has-text-primary">
                  <FontAwesomeIcon icon={faComments} size="3x" />
                </div>
                <h3 className="title is-4">Communication</h3>
                <p className="subtitle is-6">
                  Built-in messaging system for seamless communication between venues and performers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section has-background-light">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h2 className="title is-2 has-text-weight-bold" data-aos="fade-up">
                Pricing
              </h2>
              <p className="subtitle is-5 has-text-grey" data-aos="fade-up" data-aos-delay="200">
                Affordable plans for venues and performers of all sizes.
              </p>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4" data-aos="fade-up" data-aos-delay="300">
              <div className="box">
                <h3 className="title is-4">Basic</h3>
                <p className="subtitle is-6">For small venues and independent performers.</p>
                <p className="title is-2">$9.99<span className="subtitle is-6">/month</span></p>
                <ul>
                  <li>Up to 10 bookings/month</li>
                  <li>Basic analytics</li>
                  <li>Email support</li>
                </ul>
                <a href="/signup" className="button is-primary is-fullwidth">
                  Get Started
                </a>
              </div>
            </div>
            <div className="column is-4" data-aos="fade-up" data-aos-delay="400">
              <div className="box">
                <h3 className="title is-4">Pro</h3>
                <p className="subtitle is-6">For growing venues and professional performers.</p>
                <p className="title is-2">$29.99<span className="subtitle is-6">/month</span></p>
                <ul>
                  <li>Unlimited bookings</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
                <a href="/signup" className="button is-primary is-fullwidth">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h2 className="title is-2 has-text-weight-bold" data-aos="fade-up">
                Contact Us
              </h2>
              <p className="subtitle is-5 has-text-grey" data-aos="fade-up" data-aos-delay="200">
                Have questions? We're here to help!
              </p>
              <form data-aos="fade-up" data-aos-delay="300">
                <div className="field">
                  <div className="control">
                    <input className="input" type="text" placeholder="Your Name" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input" type="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <textarea className="textarea" placeholder="Your Message"></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary is-fullwidth" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            &copy; {new Date().getFullYear()} Stagelink. All rights reserved.
          </p>
          <p>
            <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;