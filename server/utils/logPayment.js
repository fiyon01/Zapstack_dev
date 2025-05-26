const db = require("../config/db")
const dotenv = require("dotenv")
dotenv.config()

async function logPayment({ projectId, event,duration, stage, endpoint }) {
  await db.query(
    `INSERT INTO logs 
     (projectId, event, duration, stage, endpoint) 
     VALUES (?, ?, ?, ?, ?`,
    [projectId, event, duration, stage, endpoint]
  );
}

module.exports = {logPayment}
