import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUp from '../pages/SignUp';
import OTPVerify from '../pages/OTPVerify';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/welcome" replace /> : <Navigate to="/signup" replace />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/welcome" replace /> : <SignUp />}
        />
        <Route
          path="/otp"
          element={token ? <Navigate to="/welcome" replace /> : <OTPVerify />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/welcome" replace /> : <Login />}
        />
        <Route
          path="/welcome"
          element={token ? <Welcome /> : <Navigate to="/signup" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}