// backend/routes/projectRoutes.js

const express = require('express');

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
  toggleFavorite,
  getProjectAnalytics
} = require('../controllers/projectController');

const {
  protect
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getProjects);

router.post('/', protect, createProject);

router.get('/analytics', protect, getProjectAnalytics);

router.get('/:id', protect, getProjectById);

router.put('/:id', protect, updateProject);

router.delete('/:id', protect, deleteProject);

router.post('/:id/duplicate', protect, duplicateProject);

router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;
