import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
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

    try {
      if (valid) {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, { email, password });
        console.log(res.data);
        if (res.error) {
          throw new Error(res.data.error);
        }
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard",{state:{token:token}});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Update the onClose handler to navigate to the home page
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="login-close-btn" onClick={handleClose}>
          &times;
        </button>
        <br />
        <div className="login-modal-content">
          {/* <img src={invoice} alt="Logo" className="login-modal-logo" /> */}
          <h1>login</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="login-email"><p>Email  Address *</p></label>
              <input
                type="email"
                id="login-email"
                className={emailError ? 'login-error' : ''}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="login-error-message">{emailError}</p>}
            </div>
            <div className="login-form-group">
              <label htmlFor="login-password"><p>Password *</p></label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className={passwordError ? 'login-error' : ''}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="toggle-password" onClick={toggleShowPassword}>
                  {showPassword ? <>&#128065;</> : <>&#128065;</>}
                </span>
              </div>
              {passwordError && <p className="login-error-message">{passwordError}</p>}
            </div>
            <div className="login-form-actions">
              <div className="login-remember-me">
                <input type="checkbox" id="login-remember-me" />
                <label htmlFor="login-remember-me">Remember me</label>
              </div>
              <button type="button" className="login-forgot-password" onClick={() => navigate('/forgot')}>Forgot password?</button>
            </div>
            <button type="submit" className="login-login-btn" onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
