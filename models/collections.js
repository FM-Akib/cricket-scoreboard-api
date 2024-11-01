// models/collections.js
const { db } = require('../config/db');

const teamsCollection = db.collection('teams');
const matchesCollection = db.collection('matches');
const playersCollection = db.collection('players');

module.exports = { teamsCollection, matchesCollection, playersCollection };
