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

// {
//     "brandLogo": "https://logo.clearbit.com/netflix.com",
//     "brandName": "Netflix",
//     "currency": "INR",
//     "amount": 499,
//     "frequency": "Monthly",
//     "startDate": "2025-07-01T00:00:00.000Z",
//     "endDate": "2026-07-01T00:00:00.000Z",
//     "note": "OTT streaming",
//     "user": "68898ee22d1bebb26221530f",
//     "_id": "6889965facc38b00afab40c7",
//     "createdAt": "2025-07-30T03:49:51.954Z",
//     "updatedAt": "2025-07-30T03:49:51.954Z",
//     "__v": 0
// }

// 68898ee22d1bebb26221530f