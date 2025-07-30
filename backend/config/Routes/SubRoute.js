import express from 'express';
import authMiddleware from '../middlewares/AuthMiddleware.js';
import { createSub, deleteSub, getSubById, getSubs, updateSub } from '../Controllers/SubController.js';

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes

router.post('/', createSub);
router.get('/', getSubs);
router.get('/:id', getSubById);
router.put('/:id', updateSub);
router.delete('/:id', deleteSub);

export default router;