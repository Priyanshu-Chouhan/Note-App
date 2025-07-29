import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleLogin } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        setError('No credential received from Google');
        return;
      }
      const res = await googleLogin(credentialResponse.credential);
      setToken(res.token);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google login failed');
    }
  };

  const handleGoogleError = () => {
    setError('Google login was cancelled or failed');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your notes</p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <div>
          <div className="w-full text-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="100%"
              theme="filled_blue"
              size="large"
            />
          </div>
          
          <div className="divider">
            <span>Or</span>
          </div>
          
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="link-button"
              >
                Sign up with email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}