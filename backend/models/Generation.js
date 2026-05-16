const mongoose = require('mongoose');

const generationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    type: {
      type: String,
      enum: ['website', 'project', 'analysis', 'restyle', 'improvement'],
      default: 'website'
    },
    prompt: {
      type: String,
      required: true
    },
    style: String,
    projectType: String,
    output: mongoose.Schema.Types.Mixed,
    tokensUsed: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Generation', generationSchema);
