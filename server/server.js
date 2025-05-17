// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('API is working!');
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Import and use routes
const sensorRoutes = require('./routes/sensors');
app.use('/api/sensors', sensorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
