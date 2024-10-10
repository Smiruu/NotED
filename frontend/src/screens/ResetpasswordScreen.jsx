import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendrequestChangePassword } from '../actions/userActions'; // Adjust based on your file structure
import './css/ResetpasswordScreen.css';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword) || {};
  const { loading = false, success, error } = resetPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendrequestChangePassword(email));
  };

  return (
    <div className="split-screen">
    <div className="reset-left-container">
          <div className="reset-image-container">
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA2L3JtNjcwLWVsZW1lbnRzZ3JvdXAtdG4tMDEyLTAxYi1samR6ajh6di5qcGc.jpg" alt="Login Illustration" />
            <div className="reset-text-container">
              <h1>Regain Access, Reignite Your Journey with NotED!</h1>
              <p>NotED!</p>
            </div>
          </div>
        </div>

    <div className="reset-right-container">
    <div className="reset-container">
      <h1 className="reset-header">Reset Password</h1>
      <p>Forgot your password? No worries, we'll help you reset it in just a few steps. Enter your email to receive a password reset link and regain access to your account.</p>
      <form onSubmit={handleSubmit} className="reset-form">
      <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="reset-input"
        />
        <button type="submit" className="reset-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="reset-login-link">
        Have you remembered your password? <a href="/login">Back to Login</a>
      </div>
      {success && <p className="reset-success">Reset link sent! Check your email.</p>}
      {error && <p className="reset-error">{error}</p>}
    </div>
    </div>
    </div>
  );
};

export default ResetPasswordScreen;
