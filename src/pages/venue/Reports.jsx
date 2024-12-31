import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import VenueDashboard from './Dashboard';

const ReportsContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('venue_id', user.id);

          if (error) throw error;
          setBookings(data || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Wrap with VenueDashboard
const Reports = () => (
  <VenueDashboard>
    <ReportsContent />
  </VenueDashboard>
);

export default Reports;