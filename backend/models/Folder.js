const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      default: '#5eead4'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Folder', folderSchema);
