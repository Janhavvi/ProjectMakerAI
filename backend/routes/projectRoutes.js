// backend/routes/projectRoutes.js

const express = require('express');

const {
  getProjects,
  createProject
} = require('../controllers/projectController');

const {
  protect
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getProjects);

router.post('/', protect, createProject);

module.exports = router;