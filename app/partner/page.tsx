"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PartnerHubPage() {
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

  const partnerOptions = [
    {
      icon: "🚗",
      title: "Kinnect Drivers",
      description: "Drive with us and earn on your schedule",
      details: "Perfect for taxi drivers looking to maximize earnings",
      link: "/partner/drivers",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
    },
    {
      icon: "🛵",
      title: "Food Delivery Drivers",
      description: "Deliver food and earn with flexible hours",
      details: "Use bikes, motorcycles, or cars to deliver meals",
      link: "/partner/delivery",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80"
    },
    {
      icon: "🏪",
      title: "Merchant Partner",
      description: "Grow your business with Kinnect",
      details: "For restaurants, groceries, and retail stores",
      link: "/partner/merchant",
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80"
    },
    {
      icon: "🔧",
      title: "Offer Your Services",
      description: "Provide professional services on-demand",
      details: "Carpenters, plumbers, electricians, and more",
      link: "/partner/services",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
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

      {/* Desktop Shell */}
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
          <div className="partner-hub-page">
            {/* Hero */}
            <div className="partner-hero">
              <h1>Be Our Partner</h1>
              <p>Join thousands of partners earning with Kinnect. Choose your path below.</p>
            </div>

            {/* Partner Options Grid */}
            <div className="partner-options-grid">
              {partnerOptions.map((option, idx) => (
                <Link href={option.link} key={idx} className="partner-option-card">
                  <div className="partner-card-image" style={{ backgroundImage: `url(${option.image})` }}>
                    <div className="partner-card-overlay"></div>
                  </div>
                  <div className="partner-card-content">
                    <div className="partner-card-icon">{option.icon}</div>
                    <h3>{option.title}</h3>
                    <p className="partner-card-description">{option.description}</p>
                    <p className="partner-card-details">{option.details}</p>
                    <div className="partner-card-arrow">→</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Why Partner Section */}
            <div className="partner-why-section">
              <h2>Why Partner with Kinnect?</h2>
              <div className="partner-benefits-grid">
                <div className="partner-benefit">
                  <div className="partner-benefit-icon">💰</div>
                  <h4>Maximize Earnings</h4>
                  <p>Competitive rates and weekly payouts</p>
                </div>
                <div className="partner-benefit">
                  <div className="partner-benefit-icon">📱</div>
                  <h4>Easy to Use</h4>
                  <p>Simple app interface for managing orders</p>
                </div>
                <div className="partner-benefit">
                  <div className="partner-benefit-icon">🎯</div>
                  <h4>Flexible Schedule</h4>
                  <p>Work when you want, how you want</p>
                </div>
                <div className="partner-benefit">
                  <div className="partner-benefit-icon">📈</div>
                  <h4>Grow Your Business</h4>
                  <p>Reach thousands of new customers</p>
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
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Be Our Partner</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="partner-hub-page">
          <div className="partner-hero">
            <h1>Be Our Partner</h1>
            <p>Join thousands of partners earning with Kinnect.</p>
          </div>

          <div className="partner-options-grid">
            {partnerOptions.map((option, idx) => (
              <Link href={option.link} key={idx} className="partner-option-card">
                <div className="partner-card-image" style={{ backgroundImage: `url(${option.image})` }}>
                  <div className="partner-card-overlay"></div>
                </div>
                <div className="partner-card-content">
                  <div className="partner-card-icon">{option.icon}</div>
                  <h3>{option.title}</h3>
                  <p className="partner-card-description">{option.description}</p>
                  <p className="partner-card-details">{option.details}</p>
                  <div className="partner-card-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="partner-why-section">
            <h2>Why Partner with Kinnect?</h2>
            <div className="partner-benefits-grid">
              <div className="partner-benefit">
                <div className="partner-benefit-icon">💰</div>
                <h4>Maximize Earnings</h4>
                <p>Competitive rates and weekly payouts</p>
              </div>
              <div className="partner-benefit">
                <div className="partner-benefit-icon">📱</div>
                <h4>Easy to Use</h4>
                <p>Simple app interface</p>
              </div>
              <div className="partner-benefit">
                <div className="partner-benefit-icon">🎯</div>
                <h4>Flexible Schedule</h4>
                <p>Work when you want</p>
              </div>
              <div className="partner-benefit">
                <div className="partner-benefit-icon">📈</div>
                <h4>Grow Your Business</h4>
                <p>Reach new customers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/home"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
