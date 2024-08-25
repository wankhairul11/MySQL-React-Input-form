const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test12345*', // Update with your MySQL password
  database: 'student_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Routes
app.get('/students', (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const { name, email, marks, grade, city } = req.body;
  const sql = 'INSERT INTO student (name, email, marks, grade, city) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, marks, grade, city], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, email, marks, grade, city });
  });
});

app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, marks, grade, city } = req.body;
  const sql = 'UPDATE student SET name = ?, email = ?, marks = ?, grade = ?, city = ? WHERE id = ?';
  db.query(sql, [name, email, marks, grade, city, id], (err) => {
    if (err) throw err;
    res.json({ id, name, email, marks, grade, city });
  });
});

app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM student WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
