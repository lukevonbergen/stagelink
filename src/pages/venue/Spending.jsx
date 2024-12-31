import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import VenueDashboard from './Dashboard';

const SpendingContent = () => {
  const [spending, setSpending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpending = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('venue_id', user.id);

          if (error) throw error;
          setSpending(data || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpending();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Spending Overview</h1>
      <div className="space-y-4">
        {spending.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-lg font-bold">Booking ID: {booking.id}</p>
            <p className="text-sm text-gray-600">Amount: ${booking.amount}</p>
            <p className="text-sm text-gray-600">Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Wrap with VenueDashboard
const Spending = () => (
  <VenueDashboard>
    <SpendingContent />
  </VenueDashboard>
);

export default Spending;