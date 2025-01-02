import React from 'react';

const LandingPage = () => {
  return (
    <section className="hero is-fullheight is-light">
      {/* Hero Header */}
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-link"></i>
                  </span>
                  <span className="title is-4 has-text-weight-bold">Stagelink</span>
                </span>
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item" href="#features">
                  Features
                </a>
                <a className="navbar-item" href="#pricing">
                  Pricing
                </a>
                <a className="navbar-item" href="#contact">
                  Contact
                </a>
                <a className="navbar-item button is-primary" href="/signup">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Body */}
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-weight-bold">
            Streamline Your Live Performances
          </h1>
          <h2 className="subtitle is-4 has-text-grey">
            Stagelink connects venues and performers, making booking and management effortless.
          </h2>
          <div className="buttons is-centered">
            <a href="/signup" className="button is-primary is-large">
              Get Started
            </a>
            <a href="#features" className="button is-light is-large">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Hero Footer */}
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;