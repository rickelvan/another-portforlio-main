import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Invalid Reset Link</h2>
          <button 
            onClick={() => navigate('/login')} 
            className="login-button"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await resetPassword(token, newPassword);
    
    if (result.success) {
      alert('Password reset successful');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 