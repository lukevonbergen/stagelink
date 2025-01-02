import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Plus, Trash2, CheckCircle } from 'lucide-react';
import { format, addWeeks, setDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PerformerFrame from './PerformerFrame';
import { supabase } from '../../lib/supabase';

const AvailabilityContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [ratePerHour, setRatePerHour] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [performerId, setPerformerId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [quickBookDay, setQuickBookDay] = useState("");
  const [quickBookWeeks, setQuickBookWeeks] = useState(4);
  const [quickBookStartTime, setQuickBookStartTime] = useState('09:00');
  const [quickBookEndTime, setQuickBookEndTime] = useState('17:00');
  const [quickBookRatePerHour, setQuickBookRatePerHour] = useState('');
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  // Fetch performer ID and existing time slots
  useEffect(() => {
    const fetchUserAndSlots = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setPerformerId(user.id);

          // Fetch existing time slots for this performer
          const { data, error } = await supabase
            .from('performer_availability')
            .select('*')
            .eq('performer_id', user.id)
            .order('date', { ascending: true });

          if (error) throw error;

          // Log the fetched data for debugging
          console.log('Fetched time slots:', data);

          // Ensure data is an array and filter out any null or undefined entries
          const validSlots = Array.isArray(data) ? data.filter((slot) => slot && slot.id) : [];

          // Set the fetched time slots in the state
          setTimeSlots(validSlots);
        }
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    fetchUserAndSlots();
  }, []);

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      timeOptions.push(time);
    }
  }

  const handleAddTimeSlot = async (isQuickBook = false) => {
    if (!performerId) {
      console.error('Performer ID is not available');
      return;
    }

    const rate = isQuickBook ? parseFloat(quickBookRatePerHour) : parseFloat(ratePerHour);
    if (isNaN(rate)) {
      console.error('Invalid rate per hour');
      return;
    }

    // Check if the selected date is in the past (for one-off slots)
    if (!isQuickBook && selectedDate < new Date()) {
      alert('Please select a future date.');
      return;
    }

    // Generate time slots based on Quick Book or one-off
    const generateTimeSlots = () => {
      const slots = [];
      let currentDate = selectedDate;

      if (isQuickBook) {
        // Quick Book logic: Add slots for the specified day of the week and number of weeks
        const dayOfWeek = Number(quickBookDay); // Convert string to number
        for (let i = 0; i < quickBookWeeks; i++) {
          const slotDate = addWeeks(setDay(new Date(), dayOfWeek), i);
          slots.push({
            date: slotDate,
            start_time: quickBookStartTime,
            end_time: quickBookEndTime,
            rate_per_hour: rate,
            performer_id: performerId,
          });
        }
      } else {
        // One-off logic
        slots.push({
          date: currentDate,
          start_time: startTime,
          end_time: endTime,
          rate_per_hour: rate,
          performer_id: performerId,
        });
      }

      return slots;
    };

    const newSlots = generateTimeSlots();

    try {
      // Insert into Supabase
      const { data, error } = await supabase
        .from('performer_availability')
        .insert(newSlots)
        .select(); // Ensure the inserted data is returned

      if (error) {
        console.error('Error inserting data:', error);
        alert('Failed to add availability slots. Please try again.');
        return;
      }

      if (!data || data.length === 0) {
        console.error('No data returned from Supabase');
        alert('Failed to add availability slots. Please try again.');
        return;
      }

      // Add the new slots to the state
      setTimeSlots([...timeSlots, ...data]);
      setRatePerHour('');
      setQuickBookRatePerHour('');
      setIsSuccessModalOpen(true); // Show success modal
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleDeleteTimeSlot = async (slotId) => {
    try {
      // Delete the slot from Supabase
      const { error } = await supabase
        .from('performer_availability')
        .delete()
        .eq('id', slotId);

      if (error) throw error;

      // Remove the slot from the state
      setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId));
    } catch (error) {
      console.error('Error deleting time slot:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manage Availability</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Book Sidebar */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Book</h2>
          <div className="space-y-4">
            {/* Day of the Week Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Day of the Week
                </span>
              </label>
              <select
                value={quickBookDay}
                onChange={(e) => setQuickBookDay(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a day</option>
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>

            {/* Number of Weeks */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Number of Weeks
                </span>
              </label>
              <input
                type="number"
                min="1"
                value={quickBookWeeks}
                onChange={(e) => setQuickBookWeeks(Number(e.target.value))}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Quick Book Time Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </span>
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={quickBookStartTime}
                  onChange={(e) => setQuickBookStartTime(e.target.value)}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <span className="text-gray-400 text-sm">to</span>
                <select
                  value={quickBookEndTime}
                  onChange={(e) => setQuickBookEndTime(e.target.value)}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Book Rate Per Hour */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Rate
                </span>
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={quickBookRatePerHour}
                  onChange={(e) => setQuickBookRatePerHour(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Hourly rate"
                />
              </div>
            </div>

            {/* Quick Book Button */}
            <button
              onClick={() => handleAddTimeSlot(true)}
              className="btn btn-primary w-full"
              disabled={!quickBookDay || !quickBookRatePerHour}
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Book
            </button>
          </div>
        </div>

        {/* Main Date/Time Picker */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:col-span-3">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Time Slot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </span>
              </label>
              <button
                onClick={() => setIsDatePickerModalOpen(true)}
                className="btn btn-outline w-full flex items-center justify-start"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
              </button>
            </div>

            {/* Time Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </span>
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <span className="text-gray-400 text-sm">to</span>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate Per Hour */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Rate
                </span>
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={ratePerHour}
                  onChange={(e) => setRatePerHour(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Hourly rate"
                />
              </div>
            </div>
          </div>

          {/* Add Time Slot Button */}
          <button
            onClick={() => handleAddTimeSlot(false)}
            className="btn btn-primary w-full mt-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Time Slot
          </button>
        </div>
      </div>

      {/* Time Slots List */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Time Slots</h2>
        <div className="space-y-3">
          {timeSlots.length === 0 ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No time slots available. Book a time slot to get started!</p>
            </div>
          ) : (
            timeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{format(new Date(slot.date), 'MMM dd, yyyy')}</span>
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{slot.start_time} to {slot.end_time}</span>
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">${slot.rate_per_hour}/hour</span>
                </div>
                <button
                  onClick={() => handleDeleteTimeSlot(slot.id)}
                  className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h2 className="text-lg font-bold mb-1">Success!</h2>
            <p className="text-gray-600 mb-4">Your availability slots have been added successfully.</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {isDatePickerModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Select Date</h2>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date < new Date()) {
                  alert('Please select a future date.');
                  return;
                }
                setSelectedDate(date);
              }}
              className="border rounded-lg p-2"
              disabled={{ before: new Date() }}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDatePickerModalOpen(false)}
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap with PerformerDashboard
const Availability = () => (
  <PerformerFrame>
    <AvailabilityContent />
  </PerformerFrame>
);

export default Availability;