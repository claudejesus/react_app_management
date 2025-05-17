const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: All sensor data
router.get('/', (req, res) => {
  db.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 50', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Insert sensor data (used by ESP8266)
router.post('/add', (req, res) => {
  const { temperature, humidity } = req.body;
  if (!temperature || !humidity) return res.status(400).json({ error: 'Missing fields' });

  db.query(
    'INSERT INTO sensor_data (temperature, humidity) VALUES (33, 009)',
    [temperature, humidity],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// POST: Save control command
router.post('/control', (req, res) => {
  const { action } = req.body;
  if (!action) return res.status(400).json({ error: 'Missing action' });

  db.query(
    'INSERT INTO commands (action) VALUES (?)',
    [action],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
