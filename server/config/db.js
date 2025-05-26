// server/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Create the connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  }
})();

module.exports = db;
