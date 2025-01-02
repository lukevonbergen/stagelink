import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faChartLine,
  faComments,
  faCheckCircle,
  faUsers,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Live Performances
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stagelink connects venues and performers, making booking and management effortless.
          </p>
          <div className="space-x-4">
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <a
              href="#pricing"
              className="inline-block bg-transparent text-blue-600 px-8 py-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              View Pricing
            </a>
          </div>
          <div className="mt-16">
            <img
              src="https://via.placeholder.com/1000x500" // Replace with your hero image
              alt="Hero"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage live performances seamlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Booking
              </h3>
              <p className="text-gray-600">
                Venues can book performers with just a few clicks. Performers can manage their availability effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faChartLine} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analytics
              </h3>
              <p className="text-gray-600">
                Track performance trends, earnings, and booking patterns with detailed analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faComments} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Communication
              </h3>
              <p className="text-gray-600">
                Built-in messaging system for seamless communication between venues and performers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Stagelink?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of using Stagelink for your live performance needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faCheckCircle} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Intuitive interface designed for both venues and performers.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faUsers} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Join a growing community of venues and performers.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <FontAwesomeIcon icon={faLightbulb} size="3x" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovative Solutions
              </h3>
              <p className="text-gray-600">
                Cutting-edge tools to enhance your live performance experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from venues and performers who have transformed their booking process with Stagelink.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                "Stagelink has made booking performers so much easier. The analytics feature is a game-changer!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50" // Replace with user avatar
                  alt="User"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">Venue Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                "Managing my availability and bookings has never been this simple. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50" // Replace with user avatar
                  alt="User"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Jane Smith</p>
                  <p className="text-sm text-gray-600">Performer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Affordable plans for venues and performers of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Basic
              </h3>
              <p className="text-gray-600 mb-4">For small venues and independent performers.</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                $9.99<span className="text-lg text-gray-600">/month</span>
              </p>
              <ul className="text-gray-600 mb-8">
                <li>Up to 10 bookings/month</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </a>
            </div>

            {/* Plan 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pro
              </h3>
              <p className="text-gray-600 mb-4">For growing venues and professional performers.</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                $29.99<span className="text-lg text-gray-600">/month</span>
              </p>
              <ul className="text-gray-600 mb-8">
                <li>Unlimited bookings</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Stagelink. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            <a href="/terms" className="hover:text-gray-900">Terms of Service</a> |{' '}
            <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;