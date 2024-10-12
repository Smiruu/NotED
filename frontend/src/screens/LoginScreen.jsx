  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { login } from '../actions/userActions';  
  import { useNavigate } from 'react-router-dom';  
  import './css/LoginScreen.css';

  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
      if (userInfo) {
        navigate('/');  
      }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    };

    return (
      <div className="split-screen">
        <div className="login-left-container">
          <div className="login-image-container">
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA2L3JtNjcwLWVsZW1lbnRzZ3JvdXAtdG4tMDEyLTAxYi1samR6ajh6di5qcGc.jpg" alt="Login Illustration" />
            <div className="login-text-container">
              <h1>Your Learning, Our Community—Study with NotED.</h1>
              <p>NotED!</p>
            </div>
          </div>
        </div>

        <div className="login-right-container">
          <div className="login-container">
          <img src="https://media.tenor.com/9YGa6pkKJ5YAAAAM/muh-cat.gif" alt="Logo" className="logo-image" />
            <h2>Login</h2>

            <form onSubmit={submitHandler} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  className='login-input'
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label htmlFor="password">Password</label>
                <input
                  className='login-input'
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-container"><div className="loading-spinner"></div></div>}

            <div className="register-link">
              Don't have an account? <a href="/register">Register</a>
            </div>
            <div className="register-link">
              <a href="/reset-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LoginScreen;
