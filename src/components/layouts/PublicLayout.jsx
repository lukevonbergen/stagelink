import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

// Import the logo
import logo from '../../assets/stagelink_logo.png';

const PublicLayout = () => {
  return (
    <>
      {/* Top Strip Bar */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 py-3 px-6 text-sm text-gray-700 shadow-sm fixed top-0 z-50 h-12">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-full">
          <span>
            Welcome to <strong>StageLink</strong> - Your gateway to seamless event management.
          </span>
        </div>
      </div>

      {/* Horizontal Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 py-3 px-6 shadow-sm fixed top-12 z-40 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
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
                to="/#features"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                to="/#pricing"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                to="/#case-studies"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Case Studies
              </Link>
            </nav>
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28"> {/* Adjusted to account for the combined height of the strip nav and main nav */}
        <main className="p-0"> {/* Removed padding here */}
          <div className="p-0"> {/* Removed padding here */}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default PublicLayout;