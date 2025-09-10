import React from 'react';
import './LandingPage.css';
import { Navigate, useNavigate } from "react-router-dom";

const Landings = () => {
    const navigate=useNavigate()
    return (
        <div className="landing-page">
          <header className="header">
            <div className="logo">VTS Invoice Generator</div>
            <nav>
              <ul className="nav-links">
                <li><a href="#"> </a></li>
                <li><a href="#"> </a></li>
                <li><a href="#"> </a></li>
                <li><a href="#"> </a></li>
                <li><a href="#"> &nbsp;</a></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <button className="login-btn" onClick={()=>navigate('/login')} >Log In</button>
              <button className="signup-btn" onClick={()=>navigate('/register')}>Sign Up Free</button>
            </div>
          </header>
    
          <section className="hero-section">
            <h1 className="hero-title">Powerful Invoicing Platform</h1>
            <p className="hero-subtitle">Your Business 💼 Your Clients</p>
            <p className="hero-description">
            Experience hassle-free invoice management with our platform, designed to simplify the generation and organization of professional client invoices.
            </p>
            <ul className="features-list">
              <li>Generate and deliver invoices through the client portal for seamless access.</li>
              <li>Organize and manage all client invoices efficiently within the platform.</li>
              <li>Access a centralized dashboard to review and manage your invoices with ease.</li>
            </ul>
          </section>
    
          <section className="statistics">
            <p className="stat-title">28,378+ Satisfied Users</p>
            <div className="user-photos">
              {/* Placeholder for user images */}
            </div>
          </section>
    
          <section className="testimonials">
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <p>"This platform has streamlined our invoicing process!"</p>
                <p className="client-name">- Jane Doe, CEO of Acme Corp</p>
              </div>
              <div className="testimonial-card">
                <p>"We love the simplicity and efficiency."</p>
                <p className="client-name">- John Smith, Freelancer</p>
              </div>
              <div className="testimonial-card">
                <p>"Outstanding support and fantastic features!"</p>
                <p className="client-name">- Emily Johnson, Small Business Owner</p>
              </div>
            </div>
          </section>
    
          <section className="features">
            <h2 className="section-title">Why Choose Us</h2>
            <div className="features-grid">
                <div className="feature-item">
                <div className="icon-container">
                    <i className="fas fa-bolt"></i>
                </div>
                <h3>Fast & Secure Payments</h3>
                <p>Ensure your transactions are swift and protected with our advanced payment gateway.</p>
                </div>
                <div className="feature-item">
                <div className="icon-container">
                    <i className="fas fa-chart-line"></i>
                </div>
                <h3>Real-time Analytics</h3>
                <p>Gain insights with real-time analytics and detailed reports on your finances.</p>
                </div>
                <div className="feature-item">
                <div className="icon-container">
                    <i className="fas fa-users"></i>
                </div>
                <h3>Customer Management</h3>
                <p>Manage customer relationships and track all your invoices with ease.</p>
                </div>
                <div className="feature-item">
                <div className="icon-container">
                    <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Accessibility</h3>
                <p>Access and manage your invoices on the go with our mobile-friendly platform.</p>
                </div>
            </div>
            </section>
    
          <section className="call-to-action">
            <h2>Ready to Get Started?</h2>
            <p>Sign up today and take control of your invoicing process!</p>
            <button className="cta-btn">Get Started for Free</button>
          </section>
    
          <footer className="footer">
            <p>&copy; 2024 VTS. All rights reserved.</p>
          </footer>
        </div>
      );
};

export default Landings;
