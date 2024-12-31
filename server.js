import express from 'express';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
app.use(bodyParser.json());

app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id; // Pass this during Checkout creation
      const subscriptionId = session.subscription;

      // Update Supabase with the subscription status
      await supabase
        .from('venue_subscriptions')
        .upsert({
          venue_id: userId,
          stripe_subscription_id: subscriptionId,
          status: 'active',
        });
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object;
      const stripeCustomerId = subscription.customer;

      // Update Supabase if the subscription is canceled or expired
      if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        await supabase
          .from('venue_subscriptions')
          .update({ status: 'inactive' })
          .eq('stripe_customer_id', stripeCustomerId);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});