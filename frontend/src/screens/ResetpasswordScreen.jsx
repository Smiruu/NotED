import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendrequestChangePassword } from '../actions/userActions'; // Adjust the import based on your file structure
import './css/ResetPassword.css';

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const resetPassword = useSelector((state) => state.resetPassword) || {}; // Add a default empty object
    const { loading = false, success, error } = resetPassword; // Default loading to false
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(sendrequestChangePassword(email));
    };
  
    return (
      <>
          <div className="reset-password-container">
              <div className="reset-password-form-container">
                  <h1 className="header">Reset Your Password</h1>
                  <p className="subHeader">Enter your email to receive the reset link</p>
                  <form onSubmit={handleSubmit} className="reset-password-form">
                      <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="reset-password-input"
                      />
                      <button type="submit" className="reset-password-button" disabled={loading}>
                          {loading ? 'Sending...' : 'Send Reset Link'}
                      </button>
                  </form>
                  {success && <p className="successMessage">Reset link sent! Check your email.</p>}
                  {error && <p className="errorMessage">{error}</p>}
              </div>
          </div>
        
          <div className="reset-password-bottom-container"></div>
      

      </>
  );
  };

export default ResetPasswordScreen;
