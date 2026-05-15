import express from 'express';
import * as templateController from '../controllers/templateController.js';

const router = express.Router();

router.get('/', templateController.getAllTemplates);
router.get('/:id', templateController.getTemplate);

export default router;
