const express = require('express');

const router = express.Router();

const {
  generateWebsite,
  generateWebsiteTool,
  generateProject,
  analyzeProject,
  restyleWebsite,
  improveWebsite,
  applyImprovement
} = require('../controllers/aiController');
const {
  protect
} = require('../middleware/authMiddleware');

router.post(
  '/generate',
  generateWebsite
);

router.post('/generate-website', protect, generateWebsiteTool);
router.post('/generate-project', protect, generateProject);
router.post('/analyze-project', protect, analyzeProject);
router.post('/restyle-website', protect, restyleWebsite);
router.post('/improve-website', protect, improveWebsite);
router.post('/apply-improvement', protect, applyImprovement);

module.exports = router;
