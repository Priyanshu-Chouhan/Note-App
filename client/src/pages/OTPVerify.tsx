import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { verifyOtp } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface FormData {
  otp: string;
}

export default function OTPVerify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;
  const { setToken } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await verifyOtp(email, data.otp);
      setToken(res.token);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  if (!email) {
    return (
      <div className="auth-container">
        <div className="auth-card text-center">
          <h1 className="auth-title">Email Required</h1>
          <p className="auth-subtitle">Please go back to sign up first.</p>
          <button
            onClick={() => navigate('/signup')}
            className="btn btn-primary"
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center">
          <h1 className="auth-title">Verify Your Email</h1>
          <p className="auth-subtitle">We sent a 6-digit code to</p>
          <p style={{color: '#2563eb', fontWeight: '500', marginBottom: '2rem'}}>{email}</p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">
              Enter OTP Code
            </label>
            <input
              type="text"
              {...register('otp', { 
                required: 'OTP is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'OTP must be 6 digits'
                }
              })}
              className="form-input otp-input"
              placeholder="000000"
              maxLength={6}
            />
            {errors.otp && (
              <p className="error-message">{errors.otp.message}</p>
            )}
          </div>
          
          <button type="submit" className="btn btn-success w-full">
            Verify OTP
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm">
            Didn't receive the code?{' '}
            <button
              onClick={() => navigate('/signup', { state: { email } })}
              className="link-button"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}