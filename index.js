// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
// const matchRoutes = require('./routes/matchRoutes');
// const playerRoutes = require('./routes/playerRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/teams', teamRoutes);
// app.use('/matches', matchRoutes);
// app.use('/players', playerRoutes);

app.get('/', (req, res) => {
  res.send('Cricket Tournament Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
