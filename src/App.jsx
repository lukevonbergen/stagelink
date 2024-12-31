import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PerformerSignUp from './pages/performer/SignUp';
import VenueSignUp from './pages/venue/SignUp';
import Login from './pages/auth/Login';
import PerformerDashboard from './pages/performer/Dashboard';
import VenueDashboard from './pages/venue/Dashboard';
import PasswordReset from './pages/auth/PasswordReset';
import UpdatePassword from './pages/auth/UpdatePassword';
import Availability from './pages/performer/Availability';
import Profile from './pages/performer/Profile';
import Performances from './pages/performer/Performances';
import Analytics from './pages/performer/Analytics';
import BookPerformers from './pages/venue/Book'; // Add BookPerformers
import Spending from './pages/venue/Spending'; // Add Spending
import Reports from './pages/venue/Reports'; // Add Reports
import VenueProfile from './pages/venue/Profile'; // Add VenueProfile
import VenueSubscription from './pages/venue/Subscription'; // Default import
import PublicLayout from './components/layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/performer/signup" element={<PerformerSignUp />} />
          <Route path="/venue/signup" element={<VenueSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        {/* Performer Routes */}
        <Route path="/performer/*" element={
          <ProtectedRoute userType="performer">
            <Routes>
              <Route path="/dashboard" element={<PerformerDashboard />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/performances" element={<Performances />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </ProtectedRoute>
        } />

        {/* Venue Routes */}
        <Route path="/venue/*" element={
          <ProtectedRoute userType="venue">
            <Routes>
              <Route path="/dashboard" element={<VenueDashboard />} />
              <Route path="/book" element={<BookPerformers />} /> {/* Updated to /book */}
              <Route path="/spending" element={<Spending />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/Subscription" element={<VenueSubscription />} />
              <Route path="/profile" element={<VenueProfile />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;