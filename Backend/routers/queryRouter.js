const express = require('express');
const Query = require('../models/queryModel');
const router = express.Router();

// Add a new query
router.post('/add', async (req, res) => {
    try {
        const query = new Query(req.body);
        const savedQuery = await query.save();
        res.status(201).json(savedQuery);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// (Optional) Get all queries
router.get('/getall', async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a query
router.put('/update/:id', async (req, res) => {
  try {
    const update = {};
    if (req.body.status) update.status = req.body.status;
    // If reply is present, push to responses array
    let updatedQuery;
    if (req.body.reply) {
      updatedQuery = await Query.findByIdAndUpdate(
        req.params.id,
        {
          $set: update,
          $push: { responses: { message: req.body.reply } }
        },
        { new: true }
      );
    } else {
      updatedQuery = await Query.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true }
      );
    }
    if (!updatedQuery) return res.status(404).json({ error: 'Query not found' });
    res.status(200).json(updatedQuery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a query by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedQuery = await Query.findByIdAndDelete(req.params.id);
    if (!deletedQuery) return res.status(404).json({ error: 'Query not found' });
    res.status(200).json({ message: 'Query deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
