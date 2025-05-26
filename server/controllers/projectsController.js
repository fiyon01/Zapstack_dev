const db = require("../config/db");

const getProjects = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM projects WHERE user_id = ?", [1]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No projects found for the defined user." });
    }

    return res.json({ projects: results });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getProjects };
