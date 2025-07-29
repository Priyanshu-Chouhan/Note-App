import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="text-center">
        <div className="mb-8">
          <h1 style={{fontSize: '6rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem'}}>404</h1>
          <h2 style={{fontSize: '1.875rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>Page Not Found</h2>
          <p style={{color: '#6b7280', marginBottom: '2rem', maxWidth: '28rem', margin: '0 auto 2rem'}}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
