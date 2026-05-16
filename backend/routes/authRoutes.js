// backend/routes/authRoutes.js

const express = require('express');

const {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  githubLogin,
  getMe
} = require('../controllers/authController');

const {
  protect
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/github', githubLogin);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, getMe);

module.exports = router;
