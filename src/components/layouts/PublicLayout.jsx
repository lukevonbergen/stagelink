import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <nav className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">StageLink</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/performer/signup" className="hover:text-blue-600">Performer Signup</Link>
            <Link to="/venue/signup" className="hover:text-blue-600">Venue Signup</Link>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default PublicLayout;