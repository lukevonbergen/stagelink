import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const { data: performerData } = await supabase
        .from('performers')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data: venueData } = await supabase
        .from('venues')
        .select('*')
        .eq('id', user.id)
        .single();

      if (performerData) {
        navigate('/performer/dashboard');
      } else if (venueData) {
        navigate('/venue/dashboard');
      } else {
        throw new Error('Account type not found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <ErrorMessage message={error} />}

          <SubmitButton loading={loading} />
        </form>
      </div>
    </div>
  );
};

const FormField = ({ id, name, type, label, value, onChange, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      placeholder={label}
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
    {message}
  </div>
);

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={classNames(
      'w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200',
      {
        'opacity-50 cursor-not-allowed': loading,
      }
    )}
  >
    {loading ? 'Signing in...' : 'Sign in'}
  </button>
);

export default Login;