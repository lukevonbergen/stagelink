import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const PublicLayout = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            {/* Logo */}
            <Link to="/" className="navbar-item">
              <img
                src="/logo.png" // Replace with your logo path
                alt="StageLink Logo"
                width="112"
                height="28"
              />
            </Link>

            {/* Hamburger Menu (for mobile) */}
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasic"
            >
              <FontAwesomeIcon icon={faBars} />
            </a>
          </div>

          {/* Navbar Menu */}
          <div id="navbarBasic" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/#features" className="navbar-item">
                Features
              </Link>
              <Link to="/#pricing" className="navbar-item">
                Pricing
              </Link>
              <Link to="/#case-studies" className="navbar-item">
                Case Studies
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/login" className="button is-primary is-rounded">
                    <strong>Login</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Render the child routes */}
      <Outlet />
    </>
  );
};

export default PublicLayout;