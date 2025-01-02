import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';
import { Calendar, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';

const DashboardContent = () => {
  const [upcomingPerformances, setUpcomingPerformances] = useState([]);
  const [recentEarnings, setRecentEarnings] = useState([]);
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

          // Fetch recent earnings
          const { data: earningsData } = await supabase
            .from('earnings')
            .select('*')
            .eq('performer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);

          setRecentEarnings(earningsData || []);

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Upcoming Performances */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Upcoming Performances
        </h2>
        {upcomingPerformances.length > 0 ? (
          <div className="space-y-3">
            {upcomingPerformances.map((performance) => (
              <div key={performance.id} className="border p-4 rounded-lg">
                <p className="text-lg font-semibold">{performance.venue_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(performance.date).toLocaleDateString()} | {performance.start_time} - {performance.end_time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming performances.</p>
        )}
      </div>

      {/* Recent Earnings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Recent Earnings
        </h2>
        {recentEarnings.length > 0 ? (
          <div className="space-y-3">
            {recentEarnings.map((earning) => (
              <div key={earning.id} className="border p-4 rounded-lg">
                <p className="text-lg font-semibold">${earning.amount}</p>
                <p className="text-sm text-gray-600">
                  {new Date(earning.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent earnings.</p>
        )}
      </div>

      {/* Availability Slots */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Availability Slots
        </h2>
        {availabilitySlots.length > 0 ? (
          <div className="space-y-3">
            {availabilitySlots.map((slot) => (
              <div key={slot.id} className="border p-4 rounded-lg">
                <p className="text-lg font-semibold">
                  {new Date(slot.date).toLocaleDateString()} | {slot.start_time} - {slot.end_time}
                </p>
                <p className="text-sm text-gray-600">${slot.rate_per_hour}/hour</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No availability slots.</p>
        )}
      </div>

      {/* Performance Ratings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Performance Ratings
        </h2>
        {performanceRatings.length > 0 ? (
          <div className="space-y-3">
            {performanceRatings.map((rating) => (
              <div key={rating.id} className="border p-4 rounded-lg">
                <p className="text-lg font-semibold">{rating.overall_rating}/5</p>
                <p className="text-sm text-gray-600">{rating.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No performance ratings.</p>
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
            Renews on: {new Date(subscriptionStatus.current_period_end).toLocaleDateString()}
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