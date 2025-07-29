import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendOtp } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await sendOtp(data.email);
      navigate('/otp', { state: { email: data.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to start taking notes</p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            Send OTP
          </button>
        </form>
        
        <div className="divider">
          <span>Or</span>
        </div>
        
        <div className="text-center">
          <p className="text-sm mb-4">
            Already have an OTP?{' '}
            <button
              onClick={() => navigate('/otp')}
              className="link-button"
            >
              Verify here
            </button>
          </p>
          <p className="text-sm">
            Prefer Google?{' '}
            <button
              onClick={() => navigate('/login')}
              className="link-button"
            >
              Sign in with Google
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}