const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 500
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
