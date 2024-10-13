import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const { loading, error, success } = useSelector(
    (state) => state.passwordChange
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changePassword({
        old_password: oldPassword,
        password: newPassword,
        password2: confirmPassword,
      })
    );
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };

  // Check for userInfo in local storage
  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if no userInfo
    }
  }, [navigate, userInfo]);

  return (
    <div className="split-screen">
      <div className="login-left-container">
        <div className="login-image-container">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA2L3JtNjcwLWVsZW1lbnRzZ3JvdXAtdG4tMDEyLTAxYi1samR6ajh6di5qcGc.jpg"
            alt="Change Password Illustration"
          />
          <div className="login-text-container">
            <h1>Your Learning, Our Community—Study with NotED.</h1>
            <p>NotED!</p>
          </div>
        </div>
      </div>

      <div className="login-right-container">
        <div className="login-container">
          <h2>Change Password</h2>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <>
              <p style={{ color: "green" }}>Password changed successfully!</p>
            </>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                className="login-input"
                type="password"
                id="oldPassword"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="login-input"
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                className="login-input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;
