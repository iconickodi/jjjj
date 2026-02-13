"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
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
    setShowMobileSidebar(false);
    router.push("/");
  };

  const handleProtectedAction = (e: React.MouseEvent, href: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    } else {
      router.push(href);
    }
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
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Kinnect - Order food and request taxis in Guyana" />
        <title>Kinnect</title>
      </Head>

      {/* ══════════════════════════════════════
          DESKTOP TOP BAR
          ══════════════════════════════════════ */}
      <header className="desktop-topbar">
        <div className="topbar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>
        <nav className="topbar-nav">
          <Link href="#kinnectx">📱 KinnectX</Link>
          <Link href="#partner">🤝 Partner With Us</Link>
          <Link href="/help">❓ Help Centre</Link>
        </nav>
        <div className="topbar-right">
          <button className="topbar-icon-btn">🌟</button>
          <Link href="/activity" className="topbar-icon-btn" style={{ position: 'relative' }}>
            🔔<span className="badge">3</span>
          </Link>
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

      {/* ══════════════════════════════════════
          DESKTOP SHELL
          ══════════════════════════════════════ */}
      <div className="desktop-shell">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link href="/" className="active"><span className="s-ico">🏠</span> Home</Link>
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
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-text">
                <h1>{isLoggedIn ? `Welcome back,\n${username} 👋` : 'Welcome to\nKinnect 👋'}</h1>
                <p>Everything you need in one place.</p>
                <div className="hero-buttons">
                  <button 
                    className="btn-hero btn-food"
                    onClick={(e) => handleProtectedAction(e as any, '/restaurants')}
                  >
                    🍴 Order Food
                  </button>
                  <button 
                    className="btn-hero btn-ride"
                    onClick={(e) => handleProtectedAction(e as any, '/rides/book')}
                  >
                    🚕 Book a Ride
                  </button>
                </div>
              </div>
              <div className="hero-illustration">
                <div className="hero-img" style={{ background: 'linear-gradient(135deg,#FFE0B2,#FFAB40)' }}>🍔</div>
                <div className="hero-img" style={{ background: 'linear-gradient(135deg,#E3F2FD,#42A5F5)' }}>🚕</div>
                <div className="hero-img" style={{ background: 'linear-gradient(135deg,#E8F5E9,#66BB6A)' }}>🛒</div>
              </div>
            </div>
          </section>

          <div className="search-wrap">
            <div className="search-bar">
              <span className="s-icon-txt">🔍</span>
              <input type="text" placeholder="Search for food, rides, or services..." />
              <button style={{ background: 'none', border: 'none', fontSize: '17px', cursor: 'pointer' }}>🎙️</button>
              <button className="search-btn">›</button>
            </div>
          </div>

          <div className="section">
            <div className="quick-cats">
              <Link href="/restaurants" className="quick-cat active"><span>🍔</span> Order Food</Link>
              <Link href="/rides/book" className="quick-cat"><span>🚕</span> Book a Ride</Link>
              <Link href="/restaurants" className="quick-cat"><span>🛒</span> Groceries</Link>
              <Link href="/restaurants" className="quick-cat"><span>🔧</span> Services</Link>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Popular Near You</h2>
              <Link href="/restaurants" className="see-all">See all ›</Link>
            </div>
            <div className="cards-row">
              <Link href="/restaurant/1" className="rest-card">
                <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FFF3E8,#FFCCAA)' }}>🍔</div>
                <div className="rest-info">
                  <div className="rest-name">Burgerland</div>
                  <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.5</span></div>
                  <div className="rest-badge">⏱ 30 min · $12–$25</div>
                </div>
              </Link>
              <Link href="/restaurant/2" className="rest-card">
                <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FFF8E1,#FFD54F)' }}>🍕</div>
                <div className="rest-info">
                  <div className="rest-name">Pizzalicious</div>
                  <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.7</span></div>
                  <div className="rest-badge">⏱ 25 min · $15–$30</div>
                </div>
              </Link>
              <Link href="/restaurant/3" className="rest-card">
                <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FBE9E7,#FF8A65)' }}>🌶️</div>
                <div className="rest-info">
                  <div className="rest-name">Spice Villa</div>
                  <div className="rest-meta"><div className="stars">★★★★★</div><span>4.8</span></div>
                  <div className="rest-badge">⏱ 35 min · $18–$40</div>
                </div>
              </Link>
              <Link href="/restaurant/4" className="rest-card">
                <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FCE4EC,#F06292)' }}>🍣</div>
                <div className="rest-info">
                  <div className="rest-name">Sushi Palace</div>
                  <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.6</span></div>
                  <div className="rest-badge">⏱ 40 min · $20–$50</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="section" style={{ paddingBottom: '32px' }}>
            <div className="section-header"><h2 className="section-title">Categories</h2></div>
            <div className="cat-tiles">
              <Link href="/restaurants" className="cat-tile food">
                <div className="cat-tile-icon">🍔</div>
                <div className="cat-tile-text"><h3>Food<br />Delivery</h3><p>200+ restaurants</p></div>
              </Link>
              <Link href="/rides/book" className="cat-tile ride">
                <div className="cat-tile-icon">🚕</div>
                <div className="cat-tile-text"><h3>Taxi<br />Rides</h3><p>Book instantly</p></div>
              </Link>
              <Link href="/restaurants" className="cat-tile grocery">
                <div className="cat-tile-icon">🛒</div>
                <div className="cat-tile-text"><h3>Grocery<br />Shopping</h3><p>Delivered fast</p></div>
              </Link>
              <Link href="/restaurants" className="cat-tile services">
                <div className="cat-tile-icon">🔧</div>
                <div className="cat-tile-text"><h3>Local<br />Services</h3><p>Trusted pros</p></div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="home-footer">
            <div className="footer-grid">
              <div className="footer-col">
                <h4>About Kinnect</h4>
                <p>Your all-in-one platform for food delivery, taxi rides, and local services in Guyana.</p>
                <div className="footer-social">
                  <a href="#">📘</a>
                  <a href="#">📷</a>
                  <a href="#">🐦</a>
                </div>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <Link href="/restaurants">Order Food</Link>
                <Link href="/rides/book">Book a Ride</Link>
                <Link href="/activity">My Orders</Link>
                <Link href="/help">Help & Support</Link>
              </div>
              <div className="footer-col">
                <h4>Contact Us</h4>
                <p>📍 Georgetown, Guyana</p>
                <p>📞 +592-XXX-XXXX</p>
                <p>✉️ support@kinnect.gy</p>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <Link href="#">Terms of Service</Link>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Refund Policy</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Kinnect. Made with ❤️ in Guyana.</p>
            </div>
          </footer>
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

      {/* ══════════════════════════════════════
          MOBILE HEADER
          ══════════════════════════════════════ */}
      <header className="mobile-header">
        <Link className="nav-logo" href="/">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </Link>
        <div className="nav-right">
          <Link href="/cart" className="nav-icon-btn">
            🛒<span className="badge">3</span>
          </Link>
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

      {/* ══════════════════════════════════════
          MOBILE CONTENT
          ══════════════════════════════════════ */}
      <div className="mobile-content">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h1>{isLoggedIn ? `Welcome back,\n${username} 👋` : 'Welcome to\nKinnect 👋'}</h1>
              <p>Everything you need in one place.</p>
              <div className="hero-buttons">
                <button 
                  className="btn-hero btn-food"
                  onClick={(e) => handleProtectedAction(e as any, '/restaurants')}
                >
                  🍴 Order Food
                </button>
                <button 
                  className="btn-hero btn-ride"
                  onClick={(e) => handleProtectedAction(e as any, '/rides/book')}
                >
                  🚕 Book a Ride
                </button>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="hero-img" style={{ background: 'linear-gradient(135deg,#FFE0B2,#FFAB40)' }}>🍔</div>
              <div className="hero-img" style={{ background: 'linear-gradient(135deg,#E3F2FD,#42A5F5)' }}>🚕</div>
            </div>
          </div>
        </section>

        <div className="search-wrap">
          <div className="search-bar">
            <span className="s-icon-txt">🔍</span>
            <input type="text" placeholder="Search for food, rides, or services..." />
            <button style={{ background: 'none', border: 'none', fontSize: '17px', cursor: 'pointer' }}>🎙️</button>
            <button className="search-btn">›</button>
          </div>
        </div>

        <div className="section">
          <div className="quick-cats">
            <Link href="/restaurants" className="quick-cat active"><span>🍔</span> Order Food</Link>
            <Link href="/rides/book" className="quick-cat"><span>🚕</span> Book a Ride</Link>
            <Link href="/restaurants" className="quick-cat"><span>🛒</span> Groceries</Link>
            <Link href="/restaurants" className="quick-cat"><span>🔧</span> Services</Link>
            <Link href="/restaurants" className="quick-cat"><span>💊</span> Pharmacy</Link>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Popular Near You</h2>
            <Link href="/restaurants" className="see-all">See all ›</Link>
          </div>
          <div className="cards-row">
            <Link href="/restaurant/1" className="rest-card">
              <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FFF3E8,#FFCCAA)' }}>🍔</div>
              <div className="rest-info">
                <div className="rest-name">Burgerland</div>
                <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.5</span></div>
                <div className="rest-badge">⏱ 30 min · $12–$25</div>
              </div>
            </Link>
            <Link href="/restaurant/2" className="rest-card">
              <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FFF8E1,#FFD54F)' }}>🍕</div>
              <div className="rest-info">
                <div className="rest-name">Pizzalicious</div>
                <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.7</span></div>
                <div className="rest-badge">⏱ 25 min · $15–$30</div>
              </div>
            </Link>
            <Link href="/restaurant/3" className="rest-card">
              <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#FBE9E7,#FF8A65)' }}>🌶️</div>
              <div className="rest-info">
                <div className="rest-name">Spice Villa</div>
                <div className="rest-meta"><div className="stars">★★★★★</div><span>4.8</span></div>
                <div className="rest-badge">⏱ 35 min · $18–$40</div>
              </div>
            </Link>
            <Link href="/restaurant/4" className="rest-card">
              <div className="rest-img-ph" style={{ background: 'linear-gradient(135deg,#E8F5E9,#A5D6A7)' }}>🥗</div>
              <div className="rest-info">
                <div className="rest-name">Green Bowl</div>
                <div className="rest-meta"><div className="stars">★★★★☆</div><span>4.6</span></div>
                <div className="rest-badge">⏱ 20 min · $8–$18</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="section">
          <div className="promo-banner">
            <div className="promo-text">
              <h3>🎉 First Ride Free!</h3>
              <p>Book your first ride and get it on us. Today only.</p>
            </div>
            <button className="promo-btn">Claim</button>
          </div>
        </div>

        <div className="section">
          <div className="section-header"><h2 className="section-title">Categories</h2></div>
          <div className="cat-tiles">
            <Link href="/restaurants" className="cat-tile food">
              <div className="cat-tile-icon">🍔</div>
              <div className="cat-tile-text"><h3>Food<br />Delivery</h3><p>200+ restaurants</p></div>
            </Link>
            <Link href="/rides/book" className="cat-tile ride">
              <div className="cat-tile-icon">🚕</div>
              <div className="cat-tile-text"><h3>Taxi<br />Rides</h3><p>Book instantly</p></div>
            </Link>
            <Link href="/restaurants" className="cat-tile grocery">
              <div className="cat-tile-icon">🛒</div>
              <div className="cat-tile-text"><h3>Grocery<br />Shopping</h3><p>Delivered fast</p></div>
            </Link>
            <Link href="/restaurants" className="cat-tile services">
              <div className="cat-tile-icon">🔧</div>
              <div className="cat-tile-text"><h3>Local<br />Services</h3><p>Trusted pros</p></div>
            </Link>
          </div>
        </div>

        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/" className="active"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon" style={{ position: 'relative' }}>📦<span className="badge">2</span></span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <button onClick={() => setShowMobileSidebar(true)} className="bottom-nav-btn">
          <span className="bnav-icon">👤</span>Account
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <>
          <div className="profile-sidebar-overlay" onClick={() => setShowMobileSidebar(false)}></div>
          <div className="profile-sidebar-drawer">
            <div className="profile-sidebar-header">
              <h2>Account</h2>
              <button onClick={() => setShowMobileSidebar(false)}>✕</button>
            </div>
            <nav className="profile-sidebar-nav">
              <Link href="/profile" onClick={() => setShowMobileSidebar(false)}>
                <span>👤</span> My Profile
              </Link>
              <Link href="/activity" onClick={() => setShowMobileSidebar(false)}>
                <span>📦</span> My Orders
              </Link>
              <Link href="/delivery-address" onClick={() => setShowMobileSidebar(false)}>
                <span>📍</span> Delivery Address
              </Link>
              <Link href="/payment-methods" onClick={() => setShowMobileSidebar(false)}>
                <span>💳</span> Payment Methods
              </Link>
              <Link href="/contact" onClick={() => setShowMobileSidebar(false)}>
                <span>📞</span> Contact Us
              </Link>
              <Link href="/help" onClick={() => setShowMobileSidebar(false)}>
                <span>❓</span> Help & FAQs
              </Link>
              <Link href="/settings" onClick={() => setShowMobileSidebar(false)}>
                <span>⚙️</span> Settings
              </Link>
              {isLoggedIn && (
                <button onClick={handleLogout} style={{ color: '#D32F2F', marginTop: '20px' }}>
                  <span>🚪</span> Logout
                </button>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>✕</button>
            <div className="auth-modal-header">
              <div className="logo-icon" style={{ margin: '0 auto 12px' }}>K</div>
              <h2>Sign in to continue</h2>
              <p>Access all features by signing in to your account</p>
            </div>
            <div className="auth-modal-buttons">
              <Link href="/login" className="auth-modal-btn primary">
                Sign In
              </Link>
              <Link href="/login" className="auth-modal-btn secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
