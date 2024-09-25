import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ConfirmChangePassword } from '../actions/userActions'; // Adjust the path based on your file structure

const ConfirmChangePasswordScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // Accessing loading state and error message from the redux store if necessary
  const resetPassword = useSelector((state) => state.confirmChangePassword); // Ensure this matches your reducer name
  const { loading, success, error } = resetPassword || {}; // Default to an empty object

  const { uid, token } = useParams(); // Now uid and token are directly accessible

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ConfirmChangePassword(uid, token, password, password2));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Confirm Change Password</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {success && <p style={styles.successMessage}>Password changed successfully!</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};



const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
  },
  successMessage: {
    color: 'green',
  },
};

export default ConfirmChangePasswordScreen;
