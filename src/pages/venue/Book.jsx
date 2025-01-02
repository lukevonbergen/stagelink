import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import VenueFrame from './VenueFrame';

const BookContent = () => {
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch performers based on search criteria
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Query the performer_availability table for matching slots
      const { data, error } = await supabase
        .from('performer_availability')
        .select('*')
        .eq('date', searchDate) // Filter by exact date
        .eq('start_time', searchTime); // Filter by exact start time

      if (error) throw error;

      // Fetch performer details for each availability slot
      const performerDetails = await Promise.all(
        data.map(async (slot) => {
          const { data: performer } = await supabase
            .from('performers')
            .select('*')
            .eq('id', slot.performer_id)
            .single();
          return { ...slot, performer };
        })
      );

      setPerformers(performerDetails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle booking a performer
  const handleBookPerformer = async (slot) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Insert the booking into the performances table
        const { error: insertError } = await supabase
          .from('performances')
          .insert([{
            venue_id: user.id,
            performer_id: slot.performer_id,
            date: slot.date,
            start_time: slot.start_time,
            end_time: slot.end_time,
            booking_rate: slot.rate_per_hour,
            status: 'pending'
          }]);

        if (insertError) throw insertError;

        // Remove the availability slot from the performer_availability table
        const { error: deleteError } = await supabase
          .from('performer_availability')
          .delete()
          .eq('id', slot.id);

        if (deleteError) throw deleteError;

        alert('Performer booked successfully!');
        // Refresh the performers list
        handleSearch();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Performers</h1>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Search for Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={searchTime}
              onChange={(e) => setSearchTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading || !searchDate || !searchTime}
              className="btn btn-primary w-full"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* Performers List */}
      {error && (
        <div className="text-red-600 text-center mb-6">
          Error: {error}
        </div>
      )}

      {performers.length > 0 ? (
        <div className="space-y-4">
          {performers.map((slot) => (
            <div key={slot.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">{slot.performer?.stage_name}</p>
                  <p className="text-sm text-gray-600">Type: {slot.performer?.performance_type}</p>
                  <p className="text-sm text-gray-600">Price: £{slot.rate_per_hour}/hour</p>
                  <p className="text-sm text-gray-600">Date: {slot.date}</p>
                  <p className="text-sm text-gray-600">Time: {slot.start_time} - {slot.end_time}</p>
                </div>
                <button
                  onClick={() => handleBookPerformer(slot)}
                  className="btn btn-primary"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No performers found for the selected date and time.</p>
        </div>
      )}
    </div>
  );
};

// Wrap with VenueFrame
const Book = () => (
  <VenueFrame>
    <BookContent />
  </VenueFrame>
);

export default Book;