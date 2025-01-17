import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';
import { Calendar, Star, Clock, CheckCircle, MapPin } from 'lucide-react';

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
          // Fetch upcoming performances with venue details
          const { data: performancesData } = await supabase
            .from('performances')
            .select('*, venues (venue_name, address_line1, city, postcode)') // Join venues table
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
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">Upcoming Performances</span>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-800">{upcomingPerformances.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">Average Rating</span>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-800">{isNaN(averageRating) ? 'N/A' : averageRating.toFixed(1)}/5</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Performances */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            Upcoming Performances
          </h2>
          {upcomingPerformances.length > 0 ? (
            <div className="space-y-3">
              {upcomingPerformances.map((performance) => {
                const startTime = new Date(`1970-01-01T${performance.start_time}`);
                const endTime = new Date(`1970-01-01T${performance.end_time}`);
                const totalHours = (endTime - startTime) / (1000 * 60 * 60);

                return (
                  <div key={performance.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <p className="text-lg font-semibold text-gray-800">{formatDate(performance.date)}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2 text-green-500" />
                      <p className="text-sm text-gray-600">
                        {formatTime(performance.start_time)} - {formatTime(performance.end_time)}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      <p className="text-sm text-gray-600">
                        {performance.venues?.venue_name || "Venue not specified"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                      <p className="text-sm text-gray-600">Total Duration: {totalHours.toFixed(1)} hours</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming performances.</p>
          )}
        </div>

        {/* Availability Slots */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            Availability Slots
          </h2>
          {availabilitySlots.length > 0 ? (
            <div className="space-y-3">
              {availabilitySlots.map((slot) => {
                const startTime = new Date(`1970-01-01T${slot.start_time}`);
                const endTime = new Date(`1970-01-01T${slot.end_time}`);
                const totalHours = (endTime - startTime) / (1000 * 60 * 60);
                const totalCost = slot.rate_per_hour * totalHours;

                return (
                  <div key={slot.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <p className="text-lg font-semibold text-gray-800">{formatDate(slot.date)}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2 text-green-500" />
                      <p className="text-sm text-gray-600">
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <p className="text-sm text-gray-600">£{slot.rate_per_hour}/hour</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                      <p className="text-sm text-gray-600">Total Cost: £{totalCost.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No availability slots.</p>
          )}
        </div>

        {/* Performance Ratings */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Performance Ratings
          </h2>
          {performanceRatings.length > 0 ? (
            <div className="space-y-3">
              {performanceRatings.map((rating) => (
                <div key={rating.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                  <p className="text-lg font-semibold text-gray-800">{rating.overall_rating}/5</p>
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
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <CheckCircle className="w-5 h-5 mr-2 text-purple-500" />
            Subscription Status
          </h2>
          <p className="text-lg font-semibold text-gray-800">{subscriptionStatus.plan_type}</p>
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