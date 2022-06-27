const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide a goal'],
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Goal', goalSchema);
