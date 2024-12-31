import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Payment = ({ plan, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Stripe.js
      const stripe = await loadStripe('pk_test_51QaahiDI7vvAgiemayuZTrf2OiNgJTe8l9NexhsZr80oFnDGNJs0D9Rke0EK5JLHrgjqHQ3wekJhaExZDBFC7yJ400B2ko62HY');

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: plan.priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/subscription-success`,
        cancelUrl: `${window.location.origin}/subscription-cancel`,
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