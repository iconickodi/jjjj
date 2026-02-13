"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
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
    setShowSidebar(false);
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
            <Link href="/profile" className="active"><span className="s-ico">👤</span> My Profile</Link>
            <Link href="/delivery-address"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="profile-page">
            <div className="profile-card">
              <div className="profile-avatar-large">👤</div>
              <h1 className="profile-user-name">{username}</h1>
              <p className="profile-user-email">+592-XXX-XXXX</p>
              <button className="profile-edit-btn">Edit Profile</button>
            </div>

            <div className="profile-stats-grid">
              <div className="profile-stat-card">
                <div className="profile-stat-icon">🍽️</div>
                <div className="profile-stat-value">24</div>
                <div className="profile-stat-label">Orders</div>
              </div>
              <div className="profile-stat-card">
                <div className="profile-stat-icon">⭐</div>
                <div className="profile-stat-value">4.8</div>
                <div className="profile-stat-label">Rating</div>
              </div>
              <div className="profile-stat-card">
                <div className="profile-stat-icon">💰</div>
                <div className="profile-stat-value">$12,500</div>
                <div className="profile-stat-label">Balance</div>
              </div>
            </div>
          </div>
        </main>

        <aside className="right-panel">
          <div className="wallet-card">
            <div className="wallet-top">
              <div className="wallet-ico">💰</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>Balance</div>
                <div className="w-amount">$12,500 <span>GYD</span></div>
              </div>
            </div>
            <button className="add-btn">Add Money <span>›</span></button>
          </div>
        </aside>
      </div>

      {/* Mobile Header */}
      <header className="mobile-header">
        <Link className="nav-logo" href="/">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </Link>
        <div className="nav-right">
          <Link href="/cart" className="nav-icon-btn">🛒</Link>
          <div className="dd-wrap" ref={mobileDropdownRef}>
            {isLoggedIn ? (
              <>
                <button className="m-user-chip" onClick={() => setShowMobileDropdown(!showMobileDropdown)}>
                  <div className="m-user-avatar">👤</div>
                  {username} ▾
                </button>
                {showMobileDropdown && (
                  <div className="dropdown open">
                    <Link href="/profile" onClick={() => setShowMobileDropdown(false)}>👤 &nbsp;My Profile</Link>
                    <a href="#" onClick={handleLogout}>🚪 &nbsp;Logout</a>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="m-user-chip" style={{ textDecoration: 'none' }}>
                <div className="m-user-avatar">👤</div>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="profile-page">
          <div className="profile-card">
            <div className="profile-avatar-large">👤</div>
            <h1 className="profile-user-name">{username}</h1>
            <p className="profile-user-email">+592-XXX-XXXX</p>
            <button className="profile-edit-btn">Edit Profile</button>
          </div>

          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-icon">🍽️</div>
              <div className="profile-stat-value">24</div>
              <div className="profile-stat-label">Orders</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">⭐</div>
              <div className="profile-stat-value">4.8</div>
              <div className="profile-stat-label">Rating</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">💰</div>
              <div className="profile-stat-value">$12,500</div>
              <div className="profile-stat-label">Balance</div>
            </div>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Sidebar Drawer (opens when clicking Account in bottom nav) */}
      {showSidebar && (
        <>
          <div className="profile-sidebar-overlay" onClick={() => setShowSidebar(false)}></div>
          <div className="profile-sidebar-drawer">
            <div className="profile-sidebar-header">
              <h2>Account</h2>
              <button onClick={() => setShowSidebar(false)}>✕</button>
            </div>
            <nav className="profile-sidebar-nav">
              <Link href="/profile" onClick={() => setShowSidebar(false)}>
                <span>👤</span> My Profile
              </Link>
              <Link href="/activity" onClick={() => setShowSidebar(false)}>
                <span>📦</span> My Orders
              </Link>
              <Link href="/delivery-address" onClick={() => setShowSidebar(false)}>
                <span>📍</span> Delivery Address
              </Link>
              <Link href="/payment-methods" onClick={() => setShowSidebar(false)}>
                <span>💳</span> Payment Methods
              </Link>
              <Link href="/contact" onClick={() => setShowSidebar(false)}>
                <span>📞</span> Contact Us
              </Link>
              <Link href="/help" onClick={() => setShowSidebar(false)}>
                <span>❓</span> Help & FAQs
              </Link>
              <Link href="/settings" onClick={() => setShowSidebar(false)}>
                <span>⚙️</span> Settings
              </Link>
              <button onClick={handleLogout} style={{ color: '#D32F2F', marginTop: '20px' }}>
                <span>🚪</span> Logout
              </button>
            </nav>
          </div>
        </>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <button onClick={() => setShowSidebar(true)} className="bottom-nav-btn active">
          <span className="bnav-icon">👤</span>Account
        </button>
      </nav>
    </>
  );
}
