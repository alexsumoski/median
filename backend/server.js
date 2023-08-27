const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'median_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server.');
});

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
  
    const insertQuery = `INSERT INTO posts (title, content) VALUES (?, ?)`;
    const insertValues = [title, content];
  
    connection.query(insertQuery, insertValues, (error, results) => {
      if (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
        return;
      }
      console.log('Post created successfully:', results);
      res.status(200).json({ message: 'Post created successfully.' });
    });
});

app.get('/api/posts', (req, res) => {
    const selectQuery = `SELECT * FROM posts`;
  
    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
        return;
      }
      console.log('Fetched posts:', results);
      res.status(200).json(results);
    });
});

app.put('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body; // Replace with your data fields
  
    const updateQuery = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
    const updateValues = [title, content, postId];
  
    connection.query(updateQuery, updateValues, (error, results) => {
      if (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'An error occurred while updating the post.' });
        return;
      }
      console.log('Post updated successfully:', results);
      res.status(200).json({ message: 'Post updated successfully.' });
    });
});

app.delete('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
  
    const deleteQuery = `DELETE FROM posts WHERE id = ?`;
    const deleteValues = [postId];
  
    connection.query(deleteQuery, deleteValues, (error, results) => {
      if (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
        return;
      }
      console.log('Post deleted successfully:', results);
      res.status(200).json({ message: 'Post deleted successfully.' });
    });
});
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
