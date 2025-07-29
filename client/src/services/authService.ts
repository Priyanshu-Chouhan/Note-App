import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export interface SendOtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface GoogleLoginResponse {
  token: string;
}

export function sendOtp(email: string): Promise<SendOtpResponse> {
  return api.post('/api/auth/send-otp', { email }).then(res => res.data);
}

export function verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
  return api.post('/api/auth/verify-otp', { email, otp }).then(res => res.data);
}

export function googleLogin(idToken: string): Promise<GoogleLoginResponse> {
  return api.post('/api/auth/google-login', { idToken }).then(res => res.data);
}