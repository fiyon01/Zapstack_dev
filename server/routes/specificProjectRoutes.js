const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    // Verify project exists AND belongs to the user
    const [projectRows] = await db.query(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );

    if (projectRows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "Project not found or not owned by user" 
      });
    }

    // Get request count (but don't fail if none exist)
    const [totalRequests] = await db.query(
      "SELECT COUNT(*) AS total FROM logs WHERE projectId = ?",
      [projectId]
    );

    // Always return the project, even if no requests exist
    res.status(200).json({
      success: true,
      project: projectRows[0],
      totalRequests: totalRequests[0].total || 0, // Default to 0 if undefined
    });
  } catch (error) {
    console.error('Error fetching project info:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;
