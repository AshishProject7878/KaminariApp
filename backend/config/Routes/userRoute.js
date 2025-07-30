import express from 'express';
import { getUserProfile, login, register } from '../Controllers/userController.js';
import authMiddleware from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

// Define user routes here
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile);

export default router;