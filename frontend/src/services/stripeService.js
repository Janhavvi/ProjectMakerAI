import api from './api';

export const stripeService = {
  createPaymentIntent: (amount) => api.post('/stripe/payment-intent', { amount }),
  confirmPayment: (paymentIntentId, paymentMethodId) =>
    api.post('/stripe/confirm-payment', { paymentIntentId, paymentMethodId }),
};

export default stripeService;
