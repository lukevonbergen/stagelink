import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children, userType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
  
      if (userType === 'performer') {
        const { data } = await supabase
          .from('performers')
          .select('id')
          .eq('id', user.id)
          .single();
          
        setIsAuthenticated(!!data);
      } else if (userType === 'venue') {
        const { data } = await supabase
          .from('venues')
          .select('id')
          .eq('id', user.id)
          .single();
          
        setIsAuthenticated(!!data);
      }
      
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;