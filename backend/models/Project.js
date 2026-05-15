// backend/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    title: {
      type: String,
      required: true
    },

    prompt: {
      type: String,
      required: true
    },

    generatedCode: {
      type: String
    },

    layout: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);