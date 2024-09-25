import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendrequestChangePassword } from '../actions/userActions'; // Adjust the import based on your file structure

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
      <div style={styles.container}>
        <h1 style={styles.header}>Reset Password</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {success && <p style={styles.successMessage}>Reset link sent! Check your email.</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
      </div>
    );
  };
  

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ResetPasswordScreen;
