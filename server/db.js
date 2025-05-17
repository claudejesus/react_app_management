// server/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your XAMPP password
  database: 'maize_weevil'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

module.exports = connection;
