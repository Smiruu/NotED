import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions'; // Import the register action
import { useNavigate } from 'react-router-dom'; // For navigation
import './css/RegisterScreen.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access registration state from redux store
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // If the user is already registered and logged in, redirect to homepage
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      dispatch(register(name, email, password, password2));
    }
  };

  return (
    <div className="split-screen">

        <div className="register-left-container">
          <div className="register-image-container">
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA2L3JtNjcwLWVsZW1lbnRzZ3JvdXAtdG4tMDEyLTAxYi1samR6ajh6di5qcGc.jpg" alt="Login Illustration" />
            <div className="register-text-container">
              <h1>Unlock Knowledge, Empower Success — Join NotED.</h1>
              <p>NotED!</p>
            </div>
          </div>
        </div>

    <div className="register-right-container">
    <div className="register-container">
    <img src="https://media.tenor.com/9YGa6pkKJ5YAAAAM/muh-cat.gif" alt="Logo" className="logo-image" />
      <h2>Register</h2>

      <form onSubmit={submitHandler} className='register-form'>
        <div className="register-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="register-form-group">
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

        <div className="register-form-group">
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

        <div className="register-form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-container"><div className="loading-spinner"></div></div>}

      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
    </div>
    </div>
  );
};

export default RegisterScreen;
