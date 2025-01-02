import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  MusicalNoteIcon,
  BanknotesIcon,
  ChartBarIcon,
  CubeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

// Import the logo
import logo from '../../assets/stagelink_logo.png';

const navigation = [
  { name: 'Dashboard', href: '/performer/dashboard', icon: CubeIcon },
  { name: 'Availability', href: '/performer/availability', icon: CalendarDaysIcon },
  { name: 'Performances', href: '/performer/performances', icon: MusicalNoteIcon },
  { name: 'Earnings', href: '/performer/earnings', icon: BanknotesIcon },
  { name: 'Analytics', href: '/performer/analytics', icon: ChartBarIcon },
];

const PerformerFrame = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stageName, setStageName] = useState('');
  const [performerId, setPerformerId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch performer data
  useEffect(() => {
    const fetchPerformerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch performer details
          const { data: performerData, error } = await supabase
            .from('performers')
            .select('stage_name, id')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          setStageName(performerData.stage_name);
          setPerformerId(performerData.id);
        }
      } catch (error) {
        console.error('Error fetching performer data:', error);
      }
    };

    fetchPerformerData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <div>
        {/* Top Strip Bar */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 py-3 px-6 text-sm text-gray-700 shadow-sm fixed top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <span>
              You are logged in as <strong>{stageName}</strong>: <strong>{performerId}</strong>
            </span>
          </div>
        </div>

        {/* Horizontal Navigation Bar */}
        <div className="w-full bg-white border-b border-gray-200 py-3 px-6 shadow-sm fixed top-12 z-40">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-auto"
                  src={logo} // Use the imported logo
                  alt="StageLink Logo"
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center space-x-2 text-sm font-medium relative ${
                      location.pathname === item.href
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                    {location.pathname === item.href && (
                      <div className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-black" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Settings Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-500 hover:text-gray-900">
                <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-1 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-1 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* Arrow */}
                  <div className="absolute -top-2 right-2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200" />
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/performer/profile"
                          className={`block px-4 py-2 text-sm ${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          Edit Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-24">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PerformerFrame;