import express from 'express';
import { register, login, getMe, googleAuth, appleAuth, facebookAuth } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/google', googleAuth);
router.post('/apple', appleAuth);
router.post('/facebook', facebookAuth);

export default router;
