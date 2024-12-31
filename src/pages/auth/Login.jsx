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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
    </div>
  );
};

const FormField = ({ id, name, type, label, value, onChange, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={classNames(
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm transition-all duration-200',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        'hover:border-gray-400',
        'placeholder-gray-400',
        'cursor-text'
      )}
      placeholder={label}
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-red-600 text-sm">
    {message}
  </div>
);

const SubmitButton = ({ loading }) => (
  <div>
    <button
      type="submit"
      disabled={loading}
      className={classNames(
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        {
          'bg-blue-600 hover:bg-blue-700': !loading,
          'bg-blue-400 cursor-not-allowed': loading,
        }
      )}
    >
      {loading ? 'Signing in...' : 'Sign in'}
    </button>
  </div>
);

export default Login;