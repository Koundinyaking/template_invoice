import React, { useState } from 'react';
import invoice from './invoice.png';


function Forgot() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (otpError) setOtpError('');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setShowOtpInput(true);
      setEmailError('');
      // alert("Recovery email sent");
    }
  };

  const handleOtpSubmit = () => {
    if (otp.trim() === '') {
      setOtpError('OTP is required');
    } else {
      setIsOtpVerified(true);
      setOtpError('');
      alert('OTP verified successfully');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (newPassword.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      valid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid) {
      alert('Password reset successful');
      
    }
  };

  return (
    <div className="forgot-modal-overlay">
      <div className="forgot-modal">
        <div className="forgot-modal-content">
          <img src={invoice} alt="Logo" className="forgot-modal-logo" />
          <h2>Forgot password?</h2>
          <p>Enter your email to recover your password</p>
          <form onSubmit={handleSubmit}>
            <div className="forgot-form-group">
              <label htmlFor="forgot-email">Email address <span>*</span></label>
              <input
                type="email"
                id="forgot-email"
                className={emailError ? 'forgot-error' : ''}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="forgot-error-message">{emailError}</p>}
            </div>
            <button type="submit" className="forgot-recovery-btn">Get OTP</button>
          </form>
          {showOtpInput && (
            <div className="otp-section">
              <h5>Enter OTP</h5>
              <input
                type="number"
                id="otp"
                placeholder="Enter OTP"
                className="otp-input"
                value={otp}
                onChange={handleOtpChange}
                required
              />
              {otpError && <p className="otp-error-message">{otpError}</p>}
              <button type="button" className="verify-otp-btn" onClick={handleOtpSubmit}>Verify OTP</button>
            </div>
          )}
          {isOtpVerified && (
            <form onSubmit={handlePasswordSubmit} className="new-password-form">
              <div className="new-password-section">
                <h5>Reset Password</h5>
                <input
                  type="password"
                  id="new-password"
                  placeholder="New Password"
                  className={passwordError ? 'new-password-error' : ''}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
                {passwordError && <p className="password-error-message">{passwordError}</p>}
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  className={confirmPasswordError ? 'confirm-password-error' : ''}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {confirmPasswordError && <p className="confirm-password-error-message">{confirmPasswordError}</p>}
                <button type="submit" className="reset-password-btn">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;
