import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  },
  stripeCustomerId: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
