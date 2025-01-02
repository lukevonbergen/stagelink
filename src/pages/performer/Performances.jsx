import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as CalendarIcon, Clock, DollarSign, X, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Set up the localizer for moment
const localizer = momentLocalizer(moment);

// Define time options for the time selector
const timeOptions = [];
for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    timeOptions.push(time);
  }
}

// Define the PerformancesContent component
const PerformancesContent = () => {
  const [performances, setPerformances] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [ratePerHour, setRatePerHour] = useState('');
  const [performerId, setPerformerId] = useState(null);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  // Fetch confirmed and past performances
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setPerformerId(user.id);

          // Fetch performances
          const { data: performancesData, error: performancesError } = await supabase
            .from('performances')
            .select(`
              id,
              venue_id,
              performer_id,
              start_time,
              end_time,
              status,
              booking_rate,
              created_at,
              date,
              venues:venue_id ( venue_name, address )
            `)
            .eq('performer_id', user.id)
            .in('status', ['confirmed', 'past'])
            .order('date', { ascending: true });

          if (performancesError) throw performancesError;

          // Fetch availability
          const { data: availabilityData, error: availabilityError } = await supabase
            .from('performer_availability')
            .select('*')
            .eq('performer_id', user.id);

          if (availabilityError) throw availabilityError;

          setPerformances(performancesData || []);
          setAvailability(availabilityData || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format performances and availability for the calendar
  const events = [
    ...performances.map((performance) => ({
      id: performance.id,
      title: `Performance at ${performance.venues?.venue_name}`,
      start: new Date(`${performance.date}T${performance.start_time}`),
      end: new Date(`${performance.date}T${performance.end_time}`),
      status: performance.status,
      booking_rate: performance.booking_rate,
      type: 'performance',
      venue: performance.venues,
    })),
    ...availability.map((slot) => ({
      id: slot.id,
      title: 'Available',
      start: new Date(`${slot.date}T${slot.start_time}`),
      end: new Date(`${slot.date}T${slot.end_time}`),
      status: 'available',
      type: 'availability',
    })),
  ];

  // Handle adding availability slot
  const handleAddAvailability = async () => {
    if (!performerId) {
      console.error('Performer ID is not available');
      return;
    }

    const rate = parseFloat(ratePerHour);
    if (isNaN(rate)) {
      console.error('Invalid rate per hour');
      return;
    }

    const newSlot = {
      date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      start_time: startTime,
      end_time: endTime,
      rate_per_hour: rate,
      performer_id: performerId,
    };

    const { data, error } = await supabase
      .from('performer_availability')
      .insert([newSlot]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      alert('Availability slot added successfully!');
      setIsModalOpen(false);
      setSelectedDate(new Date());
      setStartTime('09:00');
      setEndTime('17:00');
      setRatePerHour('');
      // Refresh availability data
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('performer_availability')
        .select('*')
        .eq('performer_id', performerId);

      if (availabilityError) {
        console.error('Error fetching availability:', availabilityError);
      } else {
        setAvailability(availabilityData || []);
      }
    }
  };

  // Handle clicking on a performance event
  const handleEventClick = (event) => {
    if (event.type === 'performance') {
      setSelectedPerformance(event);
    }
  };

  // Handle closing the performance modal
  const handleClosePerformanceModal = () => {
    setSelectedPerformance(null);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-base-100 shadow-md">
        <h1 className="text-3xl font-bold">Performances Calendar</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add Availability
        </button>
      </div>

      {/* Calendar */}
      <div className="flex-1 p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView="week"
          views={['week']}
          min={new Date(0, 0, 0, 0, 0, 0)} // Start at midnight
          max={new Date(0, 0, 0, 23, 59, 59)} // End at midnight
          step={30} // 30-minute intervals
          timeslots={2} // Two timeslots per hour
          defaultDate={new Date()}
          onSelectEvent={handleEventClick}
        />
      </div>

      {/* Add Availability Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Availability</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Date Picker */}
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Date
                </span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="input input-bordered w-full"
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                popperPlacement="bottom-start"
              />
            </div>

            {/* Time Selector */}
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </span>
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <span className="text-gray-400">to</span>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate Per Hour */}
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Rate Per Hour
                </span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={ratePerHour}
                onChange={(e) => setRatePerHour(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter hourly rate"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAddAvailability}
              className="btn btn-primary w-full"
            >
              Add Availability
            </button>
          </div>
        </div>
      )}

      {/* Performance Details Modal */}
      {selectedPerformance && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Performance Details</h2>
              <button
                onClick={handleClosePerformanceModal}
                className="btn btn-ghost"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Venue Name */}
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Venue
                </span>
              </label>
              <p className="text-lg font-semibold">{selectedPerformance.venue.venue_name}</p>
            </div>

            {/* Venue Address */}
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Address
                </span>
              </label>
              <p className="text-lg font-semibold">{selectedPerformance.venue.address}</p>
            </div>

            {/* Get Directions Button */}
            <button
              onClick={() => {
                const address = encodeURIComponent(selectedPerformance.venue.address);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
              }}
              className="btn btn-primary w-full"
            >
              Get Directions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap with PerformerFrame
const Performances = () => (
  <PerformerFrame>
    <PerformancesContent />
  </PerformerFrame>
);

export default Performances;