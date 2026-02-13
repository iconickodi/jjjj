"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContactPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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
    setUsername("Guest");
    setIsLoggedIn(false);
    setShowDropdown(false);
    setShowMobileDropdown(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setShowMobileDropdown(false);
      }
    };
    if (showDropdown || showMobileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showMobileDropdown]);

  const contactMethods = [
    {
      icon: "💬",
      title: "Customer Service",
      description: "Chat with our support team",
      action: "Start Chat",
      link: "#"
    },
    {
      icon: "🌐",
      title: "Website",
      description: "Visit our official website",
      action: "Open Website",
      link: "https://kinnect.gy"
    },
    {
      icon: "💚",
      title: "WhatsApp",
      description: "Message us on WhatsApp",
      action: "Open WhatsApp",
      link: "https://wa.me/592XXXXXXX"
    },
    {
      icon: "📘",
      title: "Facebook",
      description: "Follow us on Facebook",
      action: "Open Facebook",
      link: "https://facebook.com/kinnect"
    }
  ];

  return (
    <>
      {/* Desktop Top Bar */}
      <header className="desktop-topbar">
        <div className="topbar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>
        <nav className="topbar-nav">
          <Link href="/">🏠 Home</Link>
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

      {/* Desktop Shell */}
      <div className="desktop-shell">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link href="/"><span className="s-ico">🏠</span> Home</Link>
            <Link href="/activity"><span className="s-ico">📦</span> My Orders</Link>
            <Link href="/profile"><span className="s-ico">👤</span> My Profile</Link>
            <Link href="/delivery-address"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact" className="active"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="settings-page">
            <div className="settings-header">
              <h1>Contact Us</h1>
              <p>How can we help you today?</p>
            </div>

            <div className="contact-grid">
              {contactMethods.map((method, idx) => (
                <a key={idx} href={method.link} className="contact-card">
                  <div className="contact-icon">{method.icon}</div>
                  <div className="contact-info">
                    <h3>{method.title}</h3>
                    <p>{method.description}</p>
                  </div>
                  <button className="contact-action-btn">{method.action} →</button>
                </a>
              ))}
            </div>

            <div className="contact-info-section">
              <h2>Other Ways to Reach Us</h2>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📍</span>
                  <div>
                    <h4>Address</h4>
                    <p>123 Main Street, Georgetown, Guyana</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📞</span>
                  <div>
                    <h4>Phone</h4>
                    <p>+592-XXX-XXXX</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>support@kinnect.gy</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">⏰</span>
                  <div>
                    <h4>Hours</h4>
                    <p>Monday - Sunday, 8:00 AM - 10:00 PM</p>
                  </div>
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

      {/* Mobile Header */}
      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Contact Us</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="settings-page">
          <div className="settings-header">
            <p>How can we help you today?</p>
          </div>

          <div className="contact-grid">
            {contactMethods.map((method, idx) => (
              <a key={idx} href={method.link} className="contact-card">
                <div className="contact-icon">{method.icon}</div>
                <div className="contact-info">
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                </div>
                <button className="contact-action-btn">{method.action} →</button>
              </a>
            ))}
          </div>

          <div className="contact-info-section">
            <h2>Other Ways to Reach Us</h2>
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>123 Main Street, Georgetown, Guyana</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+592-XXX-XXXX</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>support@kinnect.gy</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">⏰</span>
                <div>
                  <h4>Hours</h4>
                  <p>Monday - Sunday, 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
