import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PerformerFrame from './PerformerFrame';

const ProfileContent = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    stage_name: '',
    email: '',
    performance_t: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('performers')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data) setProfile(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile updates
  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('performers')
          .update(profile)
          .eq('id', user.id);

        if (error) throw error;
        alert('Profile updated successfully!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          {/* Stage Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage Name</label>
            <input
              type="text"
              name="stage_name"
              value={profile.stage_name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your stage name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Performance Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Performance Type</label>
            <input
              type="text"
              name="performance_t"
              value={profile.performance_t || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your performance type"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => (
  <PerformerFrame>
    <ProfileContent />
  </PerformerFrame>
);

export default Profile;