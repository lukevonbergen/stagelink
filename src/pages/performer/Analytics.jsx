import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerDashboard from './Dashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

const AnalyticsContent = () => {
  const [earnings, setEarnings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch earnings from performances
          const { data: earningsData, error: earningsError } = await supabase
            .from('performances')
            .select('booking_rate, date')
            .eq('performer_id', user.id)
            .eq('status', 'confirmed');

          if (earningsError) throw earningsError;

          // Calculate total earnings and monthly breakdown
          const totalEarnings = earningsData.reduce((sum, performance) => sum + performance.booking_rate, 0);
          const monthlyEarnings = earningsData.reduce((acc, performance) => {
            const month = new Date(performance.date).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + performance.booking_rate;
            return acc;
          }, {});

          setEarnings({
            total: totalEarnings,
            monthly: Object.entries(monthlyEarnings).map(([month, amount]) => ({ month, amount })),
          });

          // Fetch performance ratings
          const { data: ratingsData, error: ratingsError } = await supabase
            .from('ratings') // Use the correct table name
            .select('overall_rating, stage_presence_rating, song_selection_rating, comment')
            .eq('performance_id', user.id); // Assuming performance_id links to the performer

          if (ratingsError) throw ratingsError;

          setRatings(ratingsData);

          // Fetch booking trends
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('performances')
            .select('date')
            .eq('performer_id', user.id)
            .eq('status', 'confirmed');

          if (bookingsError) throw bookingsError;

          const monthlyBookings = bookingsData.reduce((acc, booking) => {
            const month = new Date(booking.date).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          }, {});

          setBookings(Object.entries(monthlyBookings).map(([month, count]) => ({ month, count })));

          // Fetch subscription status
          const { data: subscriptionData, error: subscriptionError } = await supabase
            .from('venue_subscriptions')
            .select('plan_type, status, current_period_end')
            .eq('venue_id', user.id);

          if (subscriptionError) throw subscriptionError;

          // Use the first subscription if multiple exist
          setSubscription(subscriptionData[0] || null);
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics</h1>

      {/* Earnings Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
        <p className="text-lg mb-4">Total Earnings: <span className="font-bold">${earnings.total}</span></p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earnings.monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" name="Earnings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Ratings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Ratings</h2>
        {ratings.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold">{ratings.reduce((sum, rating) => sum + rating.stage_presence_rating, 0) / ratings.length}</p>
                <p className="text-sm text-gray-600">Stage Presence</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{ratings.reduce((sum, rating) => sum + rating.song_selection_rating, 0) / ratings.length}</p>
                <p className="text-sm text-gray-600">Song Selection</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{ratings.reduce((sum, rating) => sum + rating.overall_rating, 0) / ratings.length}</p>
                <p className="text-sm text-gray-600">Overall Rating</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent Feedback</h3>
              {ratings.slice(0, 3).map((rating, index) => (
                <div key={index} className="border p-4 rounded-lg mb-2">
                  <p className="text-sm text-gray-600">{rating.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No ratings available.</p>
        )}
      </div>

      {/* Booking Trends */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Bookings" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          <p className="text-lg mb-2">Plan: <span className="font-bold">{subscription.plan_type}</span></p>
          <p className="text-lg mb-2">Status: <span className="font-bold">{subscription.status}</span></p>
          <p className="text-lg">Renews on: <span className="font-bold">{new Date(subscription.current_period_end).toLocaleDateString()}</span></p>
        </div>
      )}
    </div>
  );
};

// Wrap with PerformerDashboard
const Analytics = () => (
  <PerformerDashboard>
    <AnalyticsContent />
  </PerformerDashboard>
);

export default Analytics;