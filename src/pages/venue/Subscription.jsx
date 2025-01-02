import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Adjust the import path as needed
import VenueFrame from './VenueFrame';
import Payment from './Payment'; // Import the Payment component

const SubscriptionContent = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define subscription plans
  const subscriptionPlans = [
    {
      name: 'Basic Plan (Monthly)',
      priceId: 'price_1Qc27wDI7vvAgiemAtm4SLZE',
      price: '£29/month',
      interval: 'monthly',
    },
    {
      name: 'Basic Plan (Yearly)',
      priceId: 'price_1Qc28iDI7vvAgiemclumtTBa',
      price: '£276/year',
      interval: 'yearly',
    },
    {
      name: 'Pro Plan (Monthly)',
      priceId: 'price_1Qc29HDI7vvAgiem5CDXtTdw',
      price: '£69/month',
      interval: 'monthly',
    },
    {
      name: 'Pro Plan (Yearly)',
      priceId: 'price_1Qc29bDI7vvAgiemKeYVV1Mx',
      price: '£660/year',
      interval: 'yearly',
    },
  ];

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('venue_subscriptions')
            .select('*')
            .eq('venue_id', user.id)
            .maybeSingle(); // Use maybeSingle to handle zero or one row

          if (error) throw error;
          setSubscription(data || null); // Set to null if no subscription is found
        }
      } catch (error) {
        console.error('Error fetching subscription:', error); // Debugging
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handlePaymentSuccess = async (plan) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Update the subscription in the database
        const { error } = await supabase
          .from('venue_subscriptions')
          .upsert([{ 
            venue_id: user.id, 
            plan_type: plan.name, 
            interval: plan.interval, // Store the billing interval
            status: 'active' 
          }]);

        if (error) throw error;
        alert('Subscription updated successfully!');
        window.location.reload(); // Refresh the page to reflect the updated subscription
      }
    } catch (error) {
      console.error('Error updating subscription:', error); // Debugging
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Subscription Management</h1>

      {/* Current Subscription */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        {subscription ? (
          <div>
            <p className="text-lg">Plan: {subscription.plan_type}</p>
            <p className="text-lg">Status: {subscription.status}</p>
            <p className="text-lg">Renews on: {new Date(subscription.current_period_end).toLocaleDateString()}</p>
          </div>
        ) : (
          <p className="text-gray-600">No active subscription.</p>
        )}
      </div>

      {/* Subscription Plans */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="space-y-4">
          {subscriptionPlans.map((plan) => (
            <div key={plan.name} className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">{plan.name}</p>
                <p className="text-sm text-gray-600">{plan.price}</p>
              </div>
              <Payment
                plan={plan}
                onSuccess={() => handlePaymentSuccess(plan)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrap with VenueDashboard
const Subscription = () => (
  <VenueFrame>
    <SubscriptionContent />
  </VenueFrame>
);

export default Subscription;