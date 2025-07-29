import express from 'express';
import { sendOTP, verifyOTP, googleLogin } from '../controllers/authController';

const router = express.Router();

// Send OTP to email
router.post('/send-otp', sendOTP);

// Verify OTP and issue JWT
router.post('/verify-otp', verifyOTP);

// Google OAuth login
router.post('/google-login', googleLogin);

export default router;