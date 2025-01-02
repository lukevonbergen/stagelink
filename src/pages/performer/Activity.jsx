import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';

const ConfirmPerformancesContent = () => {
  const [pendingPerformances, setPendingPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending performances for the performer
  useEffect(() => {
    const fetchPendingPerformances = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch performances with status 'pending' for the performer
          const { data, error } = await supabase
            .from('performances')
            .select('*')
            .eq('performer_id', user.id) // Filter by the performer's ID
            .eq('status', 'pending'); // Only include pending performances

          if (error) throw error;
          setPendingPerformances(data || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPerformances();
  }, []);

  // Handle accepting a performance
  const handleAccept = async (performanceId) => {
    try {
      const { error } = await supabase
        .from('performances')
        .update({ status: 'confirmed' })
        .eq('id', performanceId);

      if (error) throw error;

      // Refresh the list of pending performances
      setPendingPerformances((prev) => prev.filter((p) => p.id !== performanceId));
      alert('Performance confirmed successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle declining a performance
  const handleDecline = async (performanceId) => {
    try {
      const { error } = await supabase
        .from('performances')
        .update({ status: 'rejected' })
        .eq('id', performanceId);

      if (error) throw error;

      // Refresh the list of pending performances
      setPendingPerformances((prev) => prev.filter((p) => p.id !== performanceId));
      alert('Performance declined successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Confirm Performances</h1>
      <div className="space-y-4">
        {pendingPerformances.length > 0 ? (
          pendingPerformances.map((performance) => (
            <div key={performance.id} className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-lg font-bold">Performance on {new Date(performance.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <p className="text-sm text-gray-600">Time: {performance.start_time} - {performance.end_time}</p>
              <p className="text-sm text-gray-600">Venue: {performance.venue_name}</p>
              <p className="text-sm text-gray-600">Earnings: £{performance.booking_rate}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleAccept(performance.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(performance.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No pending performances to confirm.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap with PerformerFrame
const ConfirmPerformances = () => (
  <PerformerFrame>
    <ConfirmPerformancesContent />
  </PerformerFrame>
);

export default ConfirmPerformances;