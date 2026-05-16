const mongoose = require('mongoose');

const improvementSchema = new mongoose.Schema(
  {
    issue: String,
    whyItMatters: String,
    suggestedFix: String,
    applied: {
      type: Boolean,
      default: false
    }
  },
  {
    _id: false
  }
);

const improvementReportSchema = new mongoose.Schema(
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
    designScore: Number,
    uiScore: Number,
    mobileScore: Number,
    seoScore: Number,
    conversionScore: Number,
    suggestions: [improvementSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ImprovementReport', improvementReportSchema);
