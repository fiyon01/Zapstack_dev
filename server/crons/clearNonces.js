require('dotenv').config();
const mysql = require('mysql2/promise');
const cron = require('node-cron');

async function cleanOldNonces() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [result] = await connection.execute(
    "DELETE FROM nonces WHERE created_at < NOW() - INTERVAL 1 DAY"
  );

  console.log(`Deleted ${result.affectedRows} old nonces.`);

  await connection.end();
}

cron.schedule('0 0 * * *', () => {
  console.log('Running nonce cleanup at midnight...');
  cleanOldNonces()
    .then(() => console.log('Nonce cleanup done.'))
    .catch(console.error);
});
