import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import VenueFrame from './VenueFrame';
import { Calendar, DollarSign, CheckCircle } from 'lucide-react';

const DashboardContent = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch upcoming bookings
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select('*')
            .eq('venue_id', user.id)
            .eq('status', 'confirmed')
            .order('date', { ascending: true });

          if (bookingsError) throw bookingsError;

          // Fetch revenue
          const { data: revenueData, error: revenueError } = await supabase
            .from('bookings')
            .select('booking_rate')
            .eq('venue_id', user.id)
            .eq('status', 'confirmed');

          if (revenueError) throw revenueError;

          const totalRevenue = revenueData.reduce((sum, booking) => sum + booking.booking_rate, 0);

          // Fetch subscription status
          const { data: subscriptionData, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('venue_id', user.id)
            .single();

          if (subscriptionError) throw subscriptionError;

          setUpcomingBookings(bookingsData || []);
          setRevenue(totalRevenue);
          setSubscriptionStatus(subscriptionData || null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Key Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-lg font-semibold">Upcoming Bookings</span>
          </div>
          <p className="text-2xl font-bold mt-2">{upcomingBookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-500" />
            <span className="text-lg font-semibold">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold mt-2">£{revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Upcoming Bookings
        </h2>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <p className="text-lg font-semibold">{booking.performer_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })} | {booking.start_time} - {booking.end_time}
                </p>
                <p className="text-sm text-gray-600">£{booking.booking_rate}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming bookings.</p>
        )}
      </div>

      {/* Subscription Status */}
      {subscriptionStatus && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Subscription Status
          </h2>
          <p className="text-lg font-semibold">{subscriptionStatus.plan_type}</p>
          <p className="text-sm text-gray-600">
            Renews on: {new Date(subscriptionStatus.current_period_end).toLocaleDateString('en-GB')}
          </p>
        </div>
      )}
    </div>
  );
};

// Wrap with VenueFrame
const Dashboard = () => (
  <VenueFrame>
    <DashboardContent />
  </VenueFrame>
);

export default Dashboard;