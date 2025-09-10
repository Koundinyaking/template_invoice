import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    try {
      if (valid) {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, { email, password, confirmPassword });
        console.log(res.data);
        if (res.error) {
          throw new Error(res.data.error);
        }
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Update the onClose handler to navigate to the home page
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="registration-modal-overlay">
      <div className="registration-modal">
        <button className="registration-close-btn" onClick={handleClose}>
          &times;
        </button>
        <br />
        <div className="registration-modal-content">
          {/* <img src={invoice} alt="Logo" className="registration-modal-logo" /> */}
          <h1>Register</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="registration-form-group">
              <label htmlFor="register-email"><p>Email Address *</p></label>
              <input
                type="email"
                id="register-email"
                className={emailError ? 'registration-error' : ''}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="registration-error-message">{emailError}</p>}
            </div>
            <div className="registration-form-group">
              <label htmlFor="register-password"><p>Password *</p></label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="register-password"
                  className={passwordError ? 'registration-error' : ''}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="toggle-password" onClick={toggleShowPassword}>
                  {showPassword ? <>&#128065;</> : <>&#128065;</>}
                </span>
              </div>
              {passwordError && <p className="registration-error-message">{passwordError}</p>}
            </div>
            <div className="registration-form-group">
              <label htmlFor="register-confirm-password"><p>Confirm Password *</p></label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="register-confirm-password"
                  className={confirmPasswordError ? 'registration-error' : ''}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <span className="toggle-password" onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <>&#128065;</> : <>&#128586;</>}
                </span>
              </div>
              {confirmPasswordError && <p className="registration-error-message">{confirmPasswordError}</p>}
            </div>
            <div className="registration-form-actions">
              <button type="submit" className="registration-register-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
