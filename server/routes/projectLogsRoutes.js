const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.get('/:projectId/logs', async (req, res) => {
  const { projectId } = req.params;

  try {
    const [logsRows] = await db.query(
      'SELECT * FROM logs WHERE projectId = ?',
      [projectId]
    );

    if (logsRows.length === 0) {
      return res.status(404).json({ message: "No logs found for the given project ID" });
    }

    res.status(200).json({
      success: true,
      logs: logsRows,
    });
  } catch (error) {
    console.error('Error fetching project logs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
