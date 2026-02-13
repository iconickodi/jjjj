"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PartnerServicesPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("kinnectUsername");
    const storedIsLoggedIn = localStorage.getItem("kinnectIsLoggedIn");
    if (storedUsername && storedIsLoggedIn === "true") {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("kinnectUsername");
    localStorage.removeItem("kinnectIsLoggedIn");
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      <header className="desktop-topbar">
        <div className="topbar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>
        <nav className="topbar-nav">
          <Link href="/home">🏠 Home</Link>
          <Link href="/activity">📦 My Orders</Link>
          <Link href="/rides/book">🚗 Rides</Link>
          <Link href="/restaurants">🍴 Food</Link>
        </nav>
        <div className="topbar-right">
          <button className="topbar-icon-btn">🌟</button>
          <Link href="/activity" className="topbar-icon-btn">🔔</Link>
          <Link href="/cart" className="topbar-icon-btn">🛒</Link>
          <div className="dd-wrap" ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <button className="d-user-chip" onClick={() => setShowDropdown(!showDropdown)}>
                  <div className="d-user-avatar">👤</div>
                  {username} ▾
                </button>
                {showDropdown && (
                  <div className="dropdown open">
                    <Link href="/profile" onClick={() => setShowDropdown(false)}>👤 &nbsp;My Profile</Link>
                    <a href="#" onClick={handleLogout}>🚪 &nbsp;Logout</a>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="d-user-chip" style={{ textDecoration: 'none' }}>
                <div className="d-user-avatar">👤</div>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="desktop-shell">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link href="/home"><span className="s-ico">🏠</span> Home</Link>
            <Link href="/activity"><span className="s-ico">📦</span> My Orders</Link>
            <Link href="/profile"><span className="s-ico">👤</span> My Profile</Link>
            <Link href="/delivery-address"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="partner-detail-page">
            <div className="partner-detail-hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80)' }}>
              <div className="partner-detail-overlay"></div>
              <div className="partner-detail-hero-content">
                <div className="partner-detail-icon">🔧</div>
                <h1>Offer Your Services</h1>
                <p>Provide professional services on-demand</p>
              </div>
            </div>

            <div className="partner-detail-content">
              <div className="partner-detail-section">
                <h2>Overview</h2>
                <p>Reach thousands of consumers on Kinnect, while offering greater convenience and rewards to your existing customers. Whether you're a carpenter, plumber, electrician, cleaner, or other service professional - connect with customers who need your skills.</p>
              </div>

              <div className="partner-detail-section">
                <h2>What You'll Get</h2>
                <div className="partner-benefits-list">
                  <div className="partner-benefit-item">
                    <span className="partner-benefit-check">✓</span>
                    <div>
                      <h4>Find New Clients</h4>
                      <p>Get matched with customers needing your services</p>
                    </div>
                  </div>
                  <div className="partner-benefit-item">
                    <span className="partner-benefit-check">✓</span>
                    <div>
                      <h4>Set Your Own Rates</h4>
                      <p>Control your pricing and availability</p>
                    </div>
                  </div>
                  <div className="partner-benefit-item">
                    <span className="partner-benefit-check">✓</span>
                    <div>
                      <h4>Build Your Reputation</h4>
                      <p>Earn reviews and grow your business</p>
                    </div>
                  </div>
                  <div className="partner-benefit-item">
                    <span className="partner-benefit-check">✓</span>
                    <div>
                      <h4>Secure Payments</h4>
                      <p>Get paid directly through the app</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="partner-detail-section">
                <h2>Services We Need</h2>
                <div className="services-needed-grid">
                  <div className="service-needed-item">🔨 Carpentry</div>
                  <div className="service-needed-item">🚿 Plumbing</div>
                  <div className="service-needed-item">⚡ Electrical</div>
                  <div className="service-needed-item">🎨 Painting</div>
                  <div className="service-needed-item">🧹 Cleaning</div>
                  <div className="service-needed-item">🏗️ Construction</div>
                  <div className="service-needed-item">🌳 Gardening</div>
                  <div className="service-needed-item">📱 Tech Support</div>
                </div>
              </div>

              <div className="partner-detail-section">
                <h2>Requirements</h2>
                <ul className="partner-requirements-list">
                  <li>Professional experience in your field</li>
                  <li>Valid ID and proof of qualifications</li>
                  <li>Own tools and equipment</li>
                  <li>Smartphone for job notifications</li>
                  <li>Reliable transportation</li>
                </ul>
              </div>

              <div className="partner-cta-section">
                <h2>Ready to Get Started?</h2>
                <div className="partner-cta-buttons">
                  <button className="partner-signup-btn">Sign Up Now</button>
                  <a href="#" className="partner-download-btn">
                    <span>📱</span>
                    Download the Services App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="right-panel">
          <div className="wallet-card">
            <div className="wallet-top">
              <div className="wallet-ico">💰</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>Pay with MMG</div>
                <div className="w-amount">$12,500 <span>GYD</span></div>
              </div>
            </div>
            <button className="add-btn">Add Money <span>›</span></button>
          </div>
        </aside>
      </div>

      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Offer Services</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="mobile-content">
        <div className="partner-detail-page">
          <div className="partner-detail-hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80)' }}>
            <div className="partner-detail-overlay"></div>
            <div className="partner-detail-hero-content">
              <div className="partner-detail-icon">🔧</div>
              <h1>Offer Your Services</h1>
              <p>Professional services on-demand</p>
            </div>
          </div>

          <div className="partner-detail-content">
            <div className="partner-detail-section">
              <h2>Overview</h2>
              <p>Reach thousands of consumers on Kinnect. Connect with customers who need your professional skills.</p>
            </div>

            <div className="partner-detail-section">
              <h2>What You'll Get</h2>
              <div className="partner-benefits-list">
                <div className="partner-benefit-item">
                  <span className="partner-benefit-check">✓</span>
                  <div>
                    <h4>Find New Clients</h4>
                    <p>Get matched with customers</p>
                  </div>
                </div>
                <div className="partner-benefit-item">
                  <span className="partner-benefit-check">✓</span>
                  <div>
                    <h4>Set Your Own Rates</h4>
                    <p>Control pricing</p>
                  </div>
                </div>
                <div className="partner-benefit-item">
                  <span className="partner-benefit-check">✓</span>
                  <div>
                    <h4>Build Reputation</h4>
                    <p>Earn reviews</p>
                  </div>
                </div>
                <div className="partner-benefit-item">
                  <span className="partner-benefit-check">✓</span>
                  <div>
                    <h4>Secure Payments</h4>
                    <p>Get paid through app</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="partner-detail-section">
              <h2>Services We Need</h2>
              <div className="services-needed-grid">
                <div className="service-needed-item">🔨 Carpentry</div>
                <div className="service-needed-item">🚿 Plumbing</div>
                <div className="service-needed-item">⚡ Electrical</div>
                <div className="service-needed-item">🎨 Painting</div>
                <div className="service-needed-item">🧹 Cleaning</div>
                <div className="service-needed-item">🏗️ Construction</div>
                <div className="service-needed-item">🌳 Gardening</div>
                <div className="service-needed-item">📱 Tech Support</div>
              </div>
            </div>

            <div className="partner-detail-section">
              <h2>Requirements</h2>
              <ul className="partner-requirements-list">
                <li>Professional experience</li>
                <li>Valid ID & qualifications</li>
                <li>Own tools & equipment</li>
                <li>Smartphone</li>
                <li>Reliable transportation</li>
              </ul>
            </div>

            <div className="partner-cta-section">
              <h2>Ready to Get Started?</h2>
              <div className="partner-cta-buttons">
                <button className="partner-signup-btn">Sign Up Now</button>
                <a href="#" className="partner-download-btn">
                  <span>📱</span>
                  Download App
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

      <nav className="bottom-nav">
        <Link href="/home"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
