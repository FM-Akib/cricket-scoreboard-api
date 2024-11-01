// controllers/matchController.js
const { matchesCollection } = require('../models/collections');
const { ObjectId } = require('mongodb');

async function getAllMatches(req, res) {
  try {
    const result = await matchesCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch matches', error });
  }
}

async function scheduleMatch(req, res) {
  try {
    const match = req.body;
    const result = await matchesCollection.insertOne(match);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule match', error });
  }
}

async function updateMatchStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { status } };
    const result = await matchesCollection.updateOne(filter, update);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update match status', error });
  }
}

module.exports = { getAllMatches, scheduleMatch, updateMatchStatus };
