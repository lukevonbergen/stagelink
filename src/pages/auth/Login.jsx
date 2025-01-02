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
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box">
                <h2 className="title has-text-centered">Sign in to your account</h2>
                <form onSubmit={handleSubmit}>
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
        </div>
      </div>
    </div>
  );
};

const FormField = ({ id, name, type, label, value, onChange, required }) => (
  <div className="field">
    <label htmlFor={id} className="label">
      {label}
    </label>
    <div className="control">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
        placeholder={label}
      />
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="notification is-danger is-light">
    {message}
  </div>
);

const SubmitButton = ({ loading }) => (
  <div className="field">
    <div className="control">
      <button
        type="submit"
        disabled={loading}
        className={classNames('button is-primary is-fullwidth', {
          'is-loading': loading,
        })}
      >
        Sign in
      </button>
    </div>
  </div>
);

export default Login;