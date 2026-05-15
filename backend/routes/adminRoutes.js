import express from 'express';
import * as adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/analytics', authMiddleware, adminMiddleware, adminController.getAnalytics);
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.put('/users/:id/role', authMiddleware, adminMiddleware, adminController.updateUserRole);

export default router;
