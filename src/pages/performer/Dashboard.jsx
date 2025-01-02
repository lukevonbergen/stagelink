import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';
import { Calendar, Star, Clock, CheckCircle } from 'lucide-react';

const DashboardContent = () => {
  const [upcomingPerformances, setUpcomingPerformances] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [performanceRatings, setPerformanceRatings] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch upcoming performances
          const { data: performancesData } = await supabase
            .from('performances')
            .select('*')
            .eq('performer_id', user.id)
            .eq('status', 'confirmed')
            .order('date', { ascending: true });

          setUpcomingPerformances(performancesData || []);

          // Fetch availability slots
          const { data: availabilityData } = await supabase
            .from('performer_availability')
            .select('*')
            .eq('performer_id', user.id)
            .order('date', { ascending: true });

          setAvailabilitySlots(availabilityData || []);

          // Fetch performance ratings
          const { data: ratingsData } = await supabase
            .from('ratings')
            .select('*')
            .eq('performer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(3);

          setPerformanceRatings(ratingsData || []);

          // Fetch subscription status
          const { data: subscriptionData } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('performer_id', user.id)
            .single();

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

  // Calculate key metrics
  const averageRating = performanceRatings.reduce((sum, rating) => sum + rating.overall_rating, 0) / performanceRatings.length;

  // Format date as "Monday 1st Jan"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
  };

  // Format time as "6pm - 9pm"
  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Key Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-lg font-semibold">Upcoming Performances</span>
          </div>
          <p className="text-2xl font-bold mt-2">{upcomingPerformances.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            <span className="text-lg font-semibold">Average Rating</span>
          </div>
          <p className="text-2xl font-bold mt-2">{isNaN(averageRating) ? 'N/A' : averageRating.toFixed(1)}/5</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Performances */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Performances
          </h2>
          {upcomingPerformances.length > 0 ? (
            <div className="space-y-3">
              {upcomingPerformances.map((performance) => (
                <div key={performance.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <p className="text-lg font-semibold">{performance.venue_name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(performance.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })} | {formatTime(performance.start_time)} - {formatTime(performance.end_time)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming performances.</p>
          )}
        </div>

        {/* Availability Slots */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Availability Slots
          </h2>
          {availabilitySlots.length > 0 ? (
            <div className="space-y-3">
              {availabilitySlots.map((slot) => (
                <div key={slot.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <p className="text-lg font-semibold">
                    {formatDate(slot.date)} | {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                  </p>
                  <p className="text-sm text-gray-600">£{slot.rate_per_hour}/hour</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No availability slots.</p>
          )}
        </div>

        {/* Performance Ratings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Performance Ratings
          </h2>
          {performanceRatings.length > 0 ? (
            <div className="space-y-3">
              {performanceRatings.map((rating) => (
                <div key={rating.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <p className="text-lg font-semibold">{rating.overall_rating}/5</p>
                  <p className="text-sm text-gray-600">{rating.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No performance ratings.</p>
          )}
        </div>
      </div>

      {/* Subscription Status */}
      {subscriptionStatus && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
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

// Wrap with PerformerFrame
const Dashboard = () => (
  <PerformerFrame>
    <DashboardContent />
  </PerformerFrame>
);

export default Dashboard;