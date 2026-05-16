const mongoose = require('mongoose');

const styleVersionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    style: {
      type: String,
      required: true
    },
    generatedCode: String,
    notes: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('StyleVersion', styleVersionSchema);
