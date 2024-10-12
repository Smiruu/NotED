import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changePassword } from "../actions/userActions"; // Import the changePassword action
import './css/Confirmresetpassword.css';

const ConfirmChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Accessing loading state and error message from the redux store if necessary
  const resetPassword = useSelector((state) => state.confirmChangePassword); // Ensure this matches your reducer name
  const { loading, success, error } = resetPassword || {}; // Default to an empty object

  const { uid, token } = useParams(); // Now uid and token are directly accessible

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(changePassword({ uid, token, password })); // Call changePassword with the required parameters
    } else {
      alert("Passwords do not match!"); // Simple validation
    }
  };

  return (
    <div className="split-screen">
      <div className="confirm-left-container">
        <div className="confirm-image-container">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA2L3JtNjcwLWVsZW1lbnRzZ3JvdXAtdG4tMDEyLTAxYi1samR6ajh6di5qcGc.jpg"
            alt="Password Change Illustration"
          />
          <div className="confirm-text-container">
            <h1>Change Your Password, Secure Your Future!</h1>
            <p>Keep your account safe with a strong password.</p>
          </div>
        </div>
      </div>

      <div className="confirm-right-container">
        <div className="confirm-container">
          <h1 className="confirm-header">Confirm Change Password</h1>
          {error && <p className="confirm-error">{error}</p>}
          {success && (
            <p className="confirm-success">Password changed successfully!</p>
          )}
          <form onSubmit={handleSubmit} className="confirm-form">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="confirm-input"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="confirm-input"
            />
            <button type="submit" className="confirm-button" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChangePasswordScreen;
