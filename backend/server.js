const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'alex',
  host: 'localhost',
  database: 'median_db',
  password: 'password',
  port: 5432,
});

app.get('/api/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM your_table';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
