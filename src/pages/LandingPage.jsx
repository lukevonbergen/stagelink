import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/stagelink_logo.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src={logo}
              alt="StageLink Logo"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to StageLink
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with venues, book performances, and grow your career as a performer.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why Choose StageLink?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Seamlessly connect with venues and book performances with just a few clicks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Real-Time Analytics
            </h3>
            <p className="text-gray-600">
              Track your performance metrics and grow your career with actionable insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              Get paid directly through the platform with secure and reliable payment processing.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} StageLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;