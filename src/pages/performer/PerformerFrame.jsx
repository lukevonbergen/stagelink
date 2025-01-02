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
} from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/performer/dashboard', icon: CubeIcon },
  { name: 'Profile', href: '/performer/profile', icon: UserCircleIcon },
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
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span>
                You are logged in as <strong>{stageName}</strong>: <strong>{performerId}</strong>
                </span>
                <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900 transition duration-200"
                >
                Logout
                </button>
            </div>
        </div>

        {/* Horizontal Navigation Bar */}
        <div className="w-full bg-white border-b border-gray-200 py-3 px-6 shadow-sm fixed top-12 z-40">
          <div className="max-w-7xl mx-auto">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center space-x-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
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