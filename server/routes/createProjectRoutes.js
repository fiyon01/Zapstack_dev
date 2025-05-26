const createProjectController = require('../controllers/createProjectController');
const express = require('express');
const router = express.Router();

router.post('/project', createProjectController.createProject);

module.exports = router;
