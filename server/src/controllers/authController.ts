import { Request, Response } from 'express';
import User from '../models/User';
import { sendOTPEmail } from '../utils/email';
import { generateToken } from '../utils/jwt';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function sendOTP(req: Request, res: Response) {
  try {
    console.log('Send OTP request received:', req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`Generated OTP: ${otp} for email: ${email}`);
    
    const user = await User.findOneAndUpdate(
      { email },
      { otpCode: otp, otpExpires: expires },
      { upsert: true, new: true }
    );

    console.log('User updated in database');
    await sendOTPEmail(email, otp);
    console.log('OTP email sent successfully');
    res.json({ message: 'OTP sent successfully' });
  } catch (err: any) {
    console.error('Send OTP error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}

export async function verifyOTP(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const user = await User.findOne({ email });
    if (!user || user.otpCode !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const token = generateToken(user.id);
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ token });
  } catch (err: any) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: 'Verification failed' });
  }
}

export async function googleLogin(req: Request, res: Response) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'ID token is required' });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const email = payload.email;
    const googleId = payload.sub;
    const name = payload.name;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, googleId, name });
      await user.save();
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (err: any) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Google authentication failed' });
  }
}