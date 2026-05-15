import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['landing', 'blog', 'portfolio', 'ecommerce', 'business'],
  },
  preview: {
    type: String, // URL to template preview
  },
  structure: {
    type: Object, // Template structure and components
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Template', templateSchema);
