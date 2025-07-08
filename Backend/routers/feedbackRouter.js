const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');
const mongoose = require('mongoose');

// Add feedback
router.post('/add', async (req, res) => {
  try {
    const { subject, message, user, userId } = req.body;
    if (!subject || !message || !(user || userId)) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const feedback = new Feedback({
      subject,
      message,
      user: user || userId
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all feedbacks
router.get('/getall', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Delete feedback
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid feedback ID.' });
    }
    await Feedback.findByIdAndDelete(id);
    res.json({ message: 'Feedback deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
