// Stripe Service
// Handles Stripe payment integration

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Stripe Error:', error);
    throw error;
  }
};

export const createCustomer = async (email, name) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Stripe Error:', error);
    throw error;
  }
};

export default { createPaymentIntent, createCustomer };
