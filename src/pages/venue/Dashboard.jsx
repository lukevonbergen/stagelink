import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import VenueFrame from './VenueFrame';
import { Calendar, Star, DollarSign } from 'lucide-react';

const DashboardContent = () => {
  const [nextPerformance, setNextPerformance] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalConfirmedCost, setTotalConfirmedCost] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch the next performance from performer_availability
          const { data: nextPerformanceData, error: nextPerformanceError } = await supabase
            .from('performer_availability')
            .select('*')
            .order('date', { ascending: true })
            .limit(1);

          if (nextPerformanceError) throw nextPerformanceError;

          // Fetch the last 15 performers' ratings (assuming ratings are stored in a separate table)
          const { data: ratingsData, error: ratingsError } = await supabase
            .from('ratings')
            .select('overall_rating')
            .order('created_at', { ascending: false })
            .limit(15);

          if (ratingsError) throw ratingsError;

          // Calculate the average rating
          const totalRating = ratingsData.reduce((sum, rating) => sum + rating.overall_rating, 0);
          const avgRating = ratingsData.length > 0 ? totalRating / ratingsData.length : 0;

          // Fetch all upcoming performances from performer_availability
          const { data: upcomingEventsData, error: upcomingEventsError } = await supabase
            .from('performer_availability')
            .select('*')
            .order('date', { ascending: true });

          if (upcomingEventsError) throw upcomingEventsError;

          // Calculate the total cost
          const totalCost = upcomingEventsData.reduce((sum, event) => sum + event.rate_per_hour, 0);

          // Filter out today's events
          const today = new Date().toISOString().split('T')[0];
          const filteredEvents = upcomingEventsData.filter((event) => event.date !== today);

          setNextPerformance(nextPerformanceData[0] || null);
          setAverageRating(avgRating);
          setTotalConfirmedCost(totalCost);
          setUpcomingEvents(filteredEvents);
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
        {/* Next Performance */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-lg font-semibold">Next Performance</span>
          </div>
          {nextPerformance ? (
            <>
              <p className="text-2xl font-bold mt-2">{nextPerformance.performer_name}</p>
              <p className="text-sm text-gray-600">
                {new Date(nextPerformance.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })} | {nextPerformance.start_time} - {nextPerformance.end_time}
              </p>
            </>
          ) : (
            <p className="text-gray-600">No upcoming performances.</p>
          )}
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            <span className="text-lg font-semibold">Average Rating</span>
          </div>
          <p className="text-2xl font-bold mt-2">{averageRating.toFixed(1)}/5</p>
        </div>

        {/* Total Confirmed Cost */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-500" />
            <span className="text-lg font-semibold">Total Confirmed Cost</span>
          </div>
          <p className="text-2xl font-bold mt-2">£{totalConfirmedCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Upcoming Events
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <p className="text-lg font-semibold">{event.performer_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })} | {event.start_time} - {event.end_time}
                </p>
                <p className="text-sm text-gray-600">£{event.rate_per_hour}/hour</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming events.</p>
        )}
      </div>
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