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

    folder: {
      type: String,
      default: 'Launchpad'
    },

    status: {
      type: String,
      default: 'Draft'
    },

    style: {
      type: String,
      default: 'Minimal SaaS'
    },

    projectType: {
      type: String,
      default: 'Website'
    },

    favorite: {
      type: Boolean,
      default: false
    },

    tags: {
      type: [String],
      default: []
    },

    versions: [
      {
        title: String,
        prompt: String,
        generatedCode: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    exports: [
      {
        type: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    improvementReports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImprovementReport'
      }
    ],

    styleVersions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StyleVersion'
      }
    ],

    layout: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);
