import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import VenueFrame from './VenueFrame';
import QRCode from 'qrcode.react';

const ProfileContent = () => {
  const [profile, setProfile] = useState({
    venue_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    county: '',
    postcode: '',
    email: '',
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch venue profile
          const { data, error } = await supabase
            .from('venues')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data) setProfile(data);

          // Generate QR code URL
          const ratingUrl = `${window.location.origin}/rate/venue/${user.id}`;
          setQrCodeUrl(ratingUrl);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('venues')
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
          {/* Profile Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name</label>
            <input
              type="text"
              name="venue_name"
              value={profile.venue_name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter venue name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
            <input
              type="text"
              name="address_line1"
              value={profile.address_line1 || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address line 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
            <input
              type="text"
              name="address_line2"
              value={profile.address_line2 || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address line 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={profile.city || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <input
              type="text"
              name="county"
              value={profile.county || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter county"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
            <input
              type="text"
              name="postcode"
              value={profile.postcode || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter postcode"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* QR Code Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">QR Code for Customer Ratings</h2>
            {qrCodeUrl ? (
              <div className="flex flex-col items-center">
                <QRCode value={qrCodeUrl} size={256} />
                <p className="mt-4 text-sm text-gray-600">Scan this QR code to rate performances at this venue.</p>
              </div>
            ) : (
              <p className="text-gray-600">Generating QR code...</p>
            )}
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

// Wrap with VenueFrame
const Profile = () => (
  <VenueFrame>
    <ProfileContent />
  </VenueFrame>
);

export default Profile;