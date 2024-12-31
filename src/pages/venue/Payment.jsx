import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../../lib/supabase'; // Adjust the import path as needed

const Payment = ({ plan, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Stripe.js
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: plan.priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/subscriptions`,
        cancelUrl: `${window.location.origin}/subscriptions`,
        clientReferenceId: user.id, // Pass the user ID here
      });

      if (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      } else {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading ? 'Processing...' : `Subscribe to ${plan.name}`}
    </button>
  );
};

export default Payment;