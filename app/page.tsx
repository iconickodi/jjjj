"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("");
  const [showLanguages, setShowLanguages] = useState(false);
  const [error, setError] = useState("");

  const languages = ["English", "Spanish", "French", "Portuguese", "Dutch"];

  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9]{10,}$/;
    if (emailRegex.test(value) || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return true;
    }
    return false;
  };

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email or phone number");
      return;
    }
    if (!validateInput(email)) {
      setError("Please enter a valid email or phone number");
      return;
    }
    localStorage.setItem("kinnectPreEmail", email);
    router.push("/login?mode=signup");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="landing-page">
      <div className="landing-bg"></div>
      <div className="landing-overlay"></div>

      {/* WHITE HEADER - FIXED */}
      <header className="landing-header-white">
        <div className="landing-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>

        <nav className="landing-top-nav">
          <Link href="/kinnectx">📱 KinnectX</Link>
          <Link href="/partner">🤝 Partner With Us</Link>
          <Link href="/help-centre">❓ Help Centre</Link>
        </nav>

        <div className="landing-header-actions">
          <div className="language-selector">
            <button 
              className="language-btn-white"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              🌐 {language} ▾
            </button>
            {showLanguages && (
              <div className="language-dropdown">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguages(false);
                    }}
                    className={lang === language ? 'active' : ''}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/login?mode=login" className="landing-signin-btn-orange">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="landing-content">
        <div className="landing-text-overlay">
          <h1 className="landing-hero-title-overlay">
            Everything You Need,<br />
            One Tap Away
          </h1>
          <p className="landing-hero-subtitle-overlay">
            Food delivery, taxi rides, groceries, and local services.<br />
            All in one app, built for Guyana.
          </p>

          <form onSubmit={handleGetStarted} className="landing-get-started">
            <div className="landing-input-box">
              <input
                type="text"
                placeholder="Enter your email or phone number"
                value={email}
                onChange={handleInputChange}
                className={`landing-input-overlay ${error ? 'error' : ''}`}
              />
              <button 
                type="submit" 
                className="landing-submit-btn-overlay"
                disabled={!email}
              >
                Get Started →
              </button>
            </div>
            {error && <p className="landing-error-message">{error}</p>}
          </form>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="landing-qr-section">
        <div className="landing-qr-content">
          <div className="landing-qr-left">
            <h2>Download the Kinnect App</h2>
            <p>From essential services to earning opportunities. We're an all-in-one platform connecting you to what matters most.</p>
            <div className="landing-app-features">
              <div className="landing-app-feature">✓ Order food from 200+ restaurants</div>
              <div className="landing-app-feature">✓ Book reliable taxi rides</div>
              <div className="landing-app-feature">✓ Get groceries delivered</div>
              <div className="landing-app-feature">✓ Access local services</div>
            </div>
          </div>
          <div className="landing-qr-right">
            <div className="landing-qr-code">
              <div className="qr-placeholder">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="#fff" rx="10"/>
                  <rect x="20" y="20" width="60" height="60" fill="#F26B1D"/>
                  <rect x="120" y="20" width="60" height="60" fill="#F26B1D"/>
                  <rect x="20" y="120" width="60" height="60" fill="#F26B1D"/>
                  <rect x="100" y="100" width="80" height="80" fill="#F26B1D"/>
                </svg>
              </div>
              <p>Scan to download</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="landing-features">
        <div className="landing-feature">
          <div className="landing-feature-icon">🍔</div>
          <h3>Food Delivery</h3>
          <p>200+ restaurants at your fingertips</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon">🚗</div>
          <h3>Taxi Rides</h3>
          <p>Safe, reliable transportation</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon">🛒</div>
          <h3>Groceries</h3>
          <p>Fresh items delivered fast</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon">🔧</div>
          <h3>Local Services</h3>
          <p>Trusted professionals, on-demand</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 Kinnect. Made with ❤️ in Guyana.</p>
        <div className="landing-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
