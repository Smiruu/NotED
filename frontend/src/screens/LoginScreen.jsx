import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';  // Import the login action
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router-dom for navigation

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access login state from the redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // If the user is already logged in, redirect to homepage
  useEffect(() => {
    if (userInfo) {
      navigate('/');  // Change '/' to the appropriate dashboard/homepage route
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-spinner">Loading...</div>}
      
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </div>
      <div className="register-link">
         <a href="/reset-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default LoginScreen;
