const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // type will be user's id
      ref: 'User', // reference to the user model
      required: true,
    },

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
