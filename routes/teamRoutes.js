// routes/teamRoutes.js
const express = require('express');
const { getAllTeams, registerTeam, approveTeam } = require('../controllers/teamController');
const router = express.Router();

router.get('/', getAllTeams);
router.post('/', registerTeam);
router.patch('/:id/approve', approveTeam);

module.exports = router;
